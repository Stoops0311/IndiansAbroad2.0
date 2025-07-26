import { NextRequest, NextResponse } from "next/server";
const B2 = require("backblaze-b2");
import sharp from "sharp";
import { v4 as uuidv4 } from "uuid";

const b2 = new B2({
  applicationKeyId: process.env.B2_APPLICATION_KEY_ID!,
  applicationKey: process.env.B2_APPLICATION_KEY!,
});

interface UploadUrlData {
  uploadUrl: string;
  authorizationToken: string;
  expires: number;
}

let uploadUrlData: UploadUrlData | null = null;

async function getUploadUrl(): Promise<string> {
  if (!uploadUrlData || Date.now() > uploadUrlData.expires) {
    await b2.authorize();
    const bucketId = process.env.B2_BUCKET_ID!;
    const response = await b2.getUploadUrl({ bucketId });
    
    // The response contains the data directly, not in a .data property
    uploadUrlData = {
      uploadUrl: response.uploadUrl || response.data?.uploadUrl,
      authorizationToken: response.authorizationToken || response.data?.authorizationToken,
      expires: Date.now() + (23 * 60 * 60 * 1000), // 23 hours
    };
    
    if (!uploadUrlData.uploadUrl || !uploadUrlData.authorizationToken) {
      console.error('B2 getUploadUrl response:', response);
      throw new Error('Failed to get upload URL from B2');
    }
  }
  return uploadUrlData.uploadUrl;
}

async function getUploadAuthToken(): Promise<string> {
  if (!uploadUrlData || Date.now() > uploadUrlData.expires) {
    await getUploadUrl();
  }
  if (!uploadUrlData) {
    throw new Error('Failed to get upload authorization token');
  }
  return uploadUrlData.authorizationToken;
}

async function optimizeImage(
  buffer: Buffer,
  isProfile: boolean = false
): Promise<Buffer> {
  const image = sharp(buffer);
  const metadata = await image.metadata();

  if (isProfile) {
    // Profile photos: resize to 300x300, convert to WebP with 50% quality
    return await image
      .resize(300, 300, { fit: "cover", position: "center" })
      .webp({ quality: 50 })
      .toBuffer();
  } else {
    // Supporting docs: optimize but keep reasonable size with 30% quality (70% compression)
    const maxWidth = 1200;
    const width = metadata.width && metadata.width > maxWidth ? maxWidth : metadata.width;

    return await image
      .resize(width, null, { withoutEnlargement: true })
      .webp({ quality: 30 })
      .toBuffer();
  }
}

async function uploadToB2(
  buffer: Buffer,
  fileName: string,
  contentType: string = "application/octet-stream"
): Promise<string> {
  try {
    // Ensure we're authorized first
    await b2.authorize();
    
    const uploadUrl = await getUploadUrl();
    const uploadAuthToken = await getUploadAuthToken();

    const response = await b2.uploadFile({
      uploadUrl,
      uploadAuthToken,
      fileName,
      data: buffer,
      mime: contentType,
    });

    // Return the public URL
    return `https://${process.env.B2_ENDPOINT}/${process.env.B2_BUCKET_NAME}/${fileName}`;
  } catch (error) {
    console.error(`Error uploading ${fileName} to B2:`, error);
    throw error;
  }
}

function getFileExtension(filename: string): string {
  return filename.toLowerCase().split('.').pop() || '';
}

function isImageFile(filename: string): boolean {
  const imageExtensions = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'bmp', 'tiff'];
  return imageExtensions.includes(getFileExtension(filename));
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const type = formData.get("type") as string; // "profile" or "document"

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    // Validate file size (10MB max)
    const MAX_FILE_SIZE = 10 * 1024 * 1024;
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File size too large. Maximum 10MB allowed." },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = [
      "image/jpeg",
      "image/jpg", 
      "image/png",
      "image/webp",
      "image/gif",
      "application/pdf",
    ];

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Only images and PDFs are allowed." },
        { status: 400 }
      );
    }

    const isProfile = type === "profile";
    const isImage = isImageFile(file.name);
    const fileId = uuidv4();
    
    let buffer = Buffer.from(await file.arrayBuffer() as ArrayBuffer);
    let fileName: string;
    let contentType = file.type;

    if (isImage) {
      // Optimize image files
      try {
        buffer = Buffer.from(await optimizeImage(buffer, isProfile));
        fileName = isProfile 
          ? `testimonials/photos/${fileId}.webp`
          : `testimonials/documents/${fileId}.webp`;
        contentType = "image/webp";
      } catch (optimizationError) {
        console.warn("Image optimization failed, uploading original:", optimizationError);
        // Use original file if optimization fails
        const extension = getFileExtension(file.name);
        fileName = isProfile
          ? `testimonials/photos/${fileId}.${extension}`
          : `testimonials/documents/${fileId}.${extension}`;
      }
    } else {
      // For non-image files (PDFs), use original
      const extension = getFileExtension(file.name);
      fileName = isProfile
        ? `testimonials/photos/${fileId}.${extension}`
        : `testimonials/documents/${fileId}.${extension}`;
    }

    // Upload to B2
    const fileUrl = await uploadToB2(buffer, fileName, contentType);

    return NextResponse.json({
      success: true,
      url: fileUrl,
      fileName: fileName,
      originalName: file.name,
      size: buffer.length,
      type: contentType,
    });

  } catch (error) {
    console.error("Upload error:", error);
    const errorMessage = error instanceof Error ? error.message : "Upload failed";
    return NextResponse.json(
      { error: `Upload failed: ${errorMessage}` },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const fileUrl = searchParams.get("url");

    if (!fileUrl) {
      return NextResponse.json(
        { error: "No file URL provided" },
        { status: 400 }
      );
    }

    // Extract file path from full URL
    // URL format: https://endpoint/bucket-name/path/to/file.ext
    const urlParts = fileUrl.split('/');
    const bucketNameIndex = urlParts.findIndex(part => part === process.env.B2_BUCKET_NAME);
    
    let fileName: string;
    if (bucketNameIndex >= 0 && bucketNameIndex < urlParts.length - 1) {
      // Extract everything after the bucket name
      fileName = urlParts.slice(bucketNameIndex + 1).join('/');
    } else {
      // Fallback: just get the last part
      fileName = urlParts[urlParts.length - 1];
    }
    
    if (!fileName) {
      return NextResponse.json(
        { error: "Invalid file URL" },
        { status: 400 }
      );
    }

    // Delete from B2
    await b2.authorize();
    
    console.log(`Attempting to delete file: ${fileName}`);
    
    // First, get file info to get file ID
    const bucketId = process.env.B2_BUCKET_ID!;
    const fileList = await b2.listFileNames({
      bucketId,
      maxFileCount: 10, // Get more files to find exact match
      prefix: fileName,
    });
    
    console.log(`Found ${fileList.files?.length || 0} files with prefix: ${fileName}`);
    
    if (fileList.files && fileList.files.length > 0) {
      // Find exact match
      const exactMatch = fileList.files.find((file: any) => file.fileName === fileName);
      
      if (exactMatch) {
        console.log(`Deleting file: ${exactMatch.fileName} (ID: ${exactMatch.fileId})`);
        
        const deleteResponse = await b2.deleteFileVersion({
          fileId: exactMatch.fileId,
          fileName: exactMatch.fileName,
        });
        
        console.log('Delete response:', deleteResponse);
        
        return NextResponse.json({
          success: true,
          message: "File deleted successfully",
          fileName: exactMatch.fileName,
        });
      } else {
        console.log(`No exact match found for: ${fileName}`);
        console.log('Available files:', fileList.files.map((f: any) => f.fileName));
        
        return NextResponse.json(
          { error: `File not found: ${fileName}` },
          { status: 404 }
        );
      }
    } else {
      console.log(`No files found with prefix: ${fileName}`);
      
      return NextResponse.json(
        { error: `File not found: ${fileName}` },
        { status: 404 }
      );
    }

  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { error: "Delete failed. Please try again." },
      { status: 500 }
    );
  }
}