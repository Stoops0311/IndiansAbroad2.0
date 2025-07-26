const { ConvexHttpClient } = require("convex/browser");
const B2 = require("backblaze-b2");
const sharp = require("sharp");
const https = require("https");
const fs = require("fs");
const path = require("path");

// Check for command line arguments for environment
const args = process.argv.slice(2);
const envArg = args.find(arg => arg.startsWith('--env='));
const environment = envArg ? envArg.split('=')[1] : 'dev';

// Load appropriate environment file
if (environment === 'prod') {
  console.log("🌐 Using production environment configuration");
  // For production, set the environment variables directly or load from a different file
  process.env.NEXT_PUBLIC_CONVEX_URL = process.env.NEXT_PUBLIC_CONVEX_URL || "https://calculating-pig-248.convex.cloud";
  process.env.CONVEX_DEPLOYMENT = process.env.CONVEX_DEPLOYMENT || "prod:calculating-pig-248";
  
  // Load B2 credentials from .env.local (these should be the same for both environments)
  require("dotenv").config({ path: ".env.local" });
} else {
  console.log("🧪 Using development environment configuration");
  require("dotenv").config({ path: ".env.local" });
}

// We'll use the API endpoints directly instead of importing the generated API
const testimonialEndpoints = {
  getAllTestimonialsAdmin: "testimonials:getAllTestimonialsAdmin",
  updateTestimonial: "testimonials:updateTestimonial"
};

// Initialize Convex client
console.log(`🔗 Connecting to Convex: ${process.env.NEXT_PUBLIC_CONVEX_URL}`);
const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);

// Initialize B2 client
const b2 = new B2({
  applicationKeyId: process.env.B2_APPLICATION_KEY_ID,
  applicationKey: process.env.B2_APPLICATION_KEY,
});

const TEMP_DIR = path.join(__dirname, "temp_migration");
const BUCKET_NAME = process.env.B2_BUCKET_NAME;

// Ensure temp directory exists
if (!fs.existsSync(TEMP_DIR)) {
  fs.mkdirSync(TEMP_DIR, { recursive: true });
}

// Helper function to download file from URL
function downloadFile(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    https.get(url, (response) => {
      response.pipe(file);
      file.on("finish", () => {
        file.close();
        resolve(filepath);
      });
      file.on("error", reject);
    }).on("error", reject);
  });
}

// Helper function to get file extension from URL
function getFileExtension(url) {
  const urlPath = new URL(url).pathname;
  return path.extname(urlPath).toLowerCase() || ".jpg";
}

// Helper function to detect if file is a PDF
function isPDF(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return ext === '.pdf';
}

// Helper function to detect if file is an image
function isImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.bmp', '.tiff'].includes(ext);
}

// Helper function to detect file type from content
async function getFileTypeFromContent(filePath) {
  try {
    const buffer = fs.readFileSync(filePath);
    const header = buffer.toString('hex', 0, 8).toUpperCase();
    
    // PDF signature
    if (buffer.toString('ascii', 0, 4) === '%PDF') {
      return 'pdf';
    }
    
    // Common image signatures
    if (header.startsWith('FFD8FF')) return 'jpeg'; // JPEG
    if (header.startsWith('89504E47')) return 'png'; // PNG
    if (header.startsWith('47494638')) return 'gif'; // GIF
    if (header.startsWith('52494646')) return 'webp'; // WebP (RIFF header)
    
    return 'unknown';
  } catch (error) {
    return 'unknown';
  }
}

// Helper function to optimize image with Sharp
async function optimizeImage(inputPath, outputPath, isProfile = false) {
  try {
    // First check if it's actually an image file
    const fileType = await getFileTypeFromContent(inputPath);
    
    if (fileType === 'pdf' || fileType === 'unknown') {
      console.log(`    📄 File is ${fileType}, skipping optimization`);
      return inputPath; // Return original for PDFs and unknown formats
    }
    
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    
    if (isProfile) {
      // Profile photos: resize to 300x300, convert to WebP with 50% quality
      await image
        .resize(300, 300, { fit: "cover", position: "center" })
        .webp({ quality: 50 })
        .toFile(outputPath);
    } else {
      // Supporting docs: optimize but keep reasonable size with 30% quality (70% compression)
      const maxWidth = 1200;
      const width = metadata.width > maxWidth ? maxWidth : metadata.width;
      
      await image
        .resize(width, null, { withoutEnlargement: true })
        .webp({ quality: 30 })
        .toFile(outputPath);
    }
    
    console.log(`    🎨 Optimized ${fileType} image`);
    return outputPath;
  } catch (error) {
    console.log(`    ⚠️ Optimization failed (${error.message}), using original file`);
    // If optimization fails, return original path
    return inputPath;
  }
}

// Helper function to upload file to B2
async function uploadToB2(filePath, fileName) {
  try {
    // Ensure we're authorized
    await b2.authorize();
    
    // Get upload URL
    const { data: uploadUrlData } = await b2.getUploadUrl({
      bucketId: process.env.B2_BUCKET_ID
    });
    
    const fileData = fs.readFileSync(filePath);
    
    const response = await b2.uploadFile({
      uploadUrl: uploadUrlData.uploadUrl,
      uploadAuthToken: uploadUrlData.authorizationToken,
      fileName: fileName,
      data: fileData,
      onUploadProgress: (event) => {
        console.log(`Upload progress for ${fileName}: ${Math.round((event.loaded / event.total) * 100)}%`);
      }
    });
    
    // Return the public URL
    return `https://${process.env.B2_ENDPOINT}/${BUCKET_NAME}/${fileName}`;
  } catch (error) {
    console.error(`Error uploading ${fileName} to B2:`, error);
    throw error;
  }
}

// Removed upload URL cache functions - we'll get fresh URLs for each upload

// Main migration function
async function migrateTestimonials() {
  try {
    console.log(`🚀 Starting migration from Convex to Backblaze B2 (${environment.toUpperCase()} environment)...`);
    
    // Authorize B2
    await b2.authorize();
    console.log("✅ B2 authorized successfully");
    
    // Get all testimonials from Convex
    console.log("📥 Fetching testimonials from Convex...");
    const testimonials = await convex.query(testimonialEndpoints.getAllTestimonialsAdmin);
    console.log(`Found ${testimonials.length} testimonials to migrate`);
    
    const migrationResults = [];
    
    for (let i = 0; i < testimonials.length; i++) {
      const testimonial = testimonials[i];
      console.log(`\n📝 Processing testimonial ${i + 1}/${testimonials.length}: ${testimonial.name}`);
      
      const result = {
        id: testimonial._id,
        name: testimonial.name,
        originalPhotoUrl: testimonial.photoUrl,
        originalSupportingDocs: testimonial.supportingDocUrls || [],
        newPhotoUrl: null,
        newSupportingDocUrls: [],
        errors: []
      };
      
      try {
        // Process profile photo
        if (testimonial.photoUrl) {
          // Skip if already migrated to B2
          if (testimonial.photoUrl.includes('backblazeb2.com')) {
            console.log("  📷 Photo already migrated to B2, skipping...");
            result.newPhotoUrl = testimonial.photoUrl;
          } else {
            console.log("  📷 Processing profile photo...");
            const photoExt = getFileExtension(testimonial.photoUrl);
            const originalPhotoPath = path.join(TEMP_DIR, `${testimonial._id}_photo${photoExt}`);
            const optimizedPhotoPath = path.join(TEMP_DIR, `${testimonial._id}_photo_optimized.webp`);
            
            try {
              await downloadFile(testimonial.photoUrl, originalPhotoPath);
            
              // Try to optimize the image (handles PDFs and unsupported formats gracefully)
              const finalPhotoPath = await optimizeImage(originalPhotoPath, optimizedPhotoPath, true);
              
              let photoFileName;
              if (finalPhotoPath === optimizedPhotoPath) {
                // Successfully optimized to WebP
                photoFileName = `testimonials/photos/${testimonial._id}_photo.webp`;
              } else {
                // Using original file (PDF or optimization failed)
                photoFileName = `testimonials/photos/${testimonial._id}_photo${photoExt}`;
              }
              
              result.newPhotoUrl = await uploadToB2(finalPhotoPath, photoFileName);
              
              // Clean up temp files
              fs.unlinkSync(originalPhotoPath);
              if (finalPhotoPath !== originalPhotoPath && fs.existsSync(finalPhotoPath)) {
                fs.unlinkSync(finalPhotoPath);
              }
            
              console.log(`    ✅ Photo uploaded: ${result.newPhotoUrl}`);
            } catch (error) {
              console.error(`    ❌ Error processing photo:`, error.message);
              result.errors.push(`Photo: ${error.message}`);
            }
          }
        }
        
        // Process supporting documents
        if (testimonial.supportingDocUrls && testimonial.supportingDocUrls.length > 0) {
          console.log(`  📄 Processing ${testimonial.supportingDocUrls.length} supporting document(s)...`);
          
          for (let j = 0; j < testimonial.supportingDocUrls.length; j++) {
            const docUrl = testimonial.supportingDocUrls[j];
            
            // Skip if already migrated to B2
            if (docUrl.includes('backblazeb2.com')) {
              console.log(`    📄 Document ${j + 1} already migrated to B2, skipping...`);
              result.newSupportingDocUrls.push(docUrl);
              continue;
            }
            
            const docExt = getFileExtension(docUrl);
            const originalDocPath = path.join(TEMP_DIR, `${testimonial._id}_doc_${j}${docExt}`);
            
            try {
              await downloadFile(docUrl, originalDocPath);
              
              let finalDocPath = originalDocPath;
              let fileName = `testimonials/documents/${testimonial._id}_doc_${j}${docExt}`;
              
              // Try to optimize the document (handles PDFs and unsupported formats gracefully)
              const optimizedDocPath = path.join(TEMP_DIR, `${testimonial._id}_doc_${j}_optimized.webp`);
              finalDocPath = await optimizeImage(originalDocPath, optimizedDocPath, false);
              
              if (finalDocPath === optimizedDocPath) {
                // Successfully optimized to WebP
                fileName = `testimonials/documents/${testimonial._id}_doc_${j}.webp`;
              } else {
                // Using original file (PDF or optimization failed)
                fileName = `testimonials/documents/${testimonial._id}_doc_${j}${docExt}`;
              }
              
              const uploadedDocUrl = await uploadToB2(finalDocPath, fileName);
              result.newSupportingDocUrls.push(uploadedDocUrl);
              
              // Clean up temp files
              fs.unlinkSync(originalDocPath);
              if (finalDocPath !== originalDocPath && fs.existsSync(finalDocPath)) {
                fs.unlinkSync(finalDocPath);
              }
              
              console.log(`    ✅ Document ${j + 1} uploaded: ${uploadedDocUrl}`);
            } catch (error) {
              console.error(`    ❌ Error processing document ${j + 1}:`, error.message);
              result.errors.push(`Document ${j + 1}: ${error.message}`);
            }
          }
        }
        
        // Update testimonial in Convex with new URLs
        console.log("  💾 Updating testimonial in database...");
        const updateData = {};
        
        if (result.newPhotoUrl) {
          updateData.photoUrl = result.newPhotoUrl;
          updateData.photo = undefined; // Remove old storage ID
        }
        
        if (result.newSupportingDocUrls.length > 0) {
          updateData.supportingDocUrls = result.newSupportingDocUrls;
          updateData.supportingDocs = undefined; // Remove old storage IDs
        }
        
        if (Object.keys(updateData).length > 0) {
          await convex.mutation(testimonialEndpoints.updateTestimonial, {
            id: testimonial._id,
            ...updateData
          });
          console.log("    ✅ Database updated successfully");
        }
        
      } catch (error) {
        console.error(`❌ Error processing testimonial ${testimonial.name}:`, error);
        result.errors.push(`General error: ${error.message}`);
      }
      
      migrationResults.push(result);
    }
    
    // Save migration report
    const reportPath = path.join(__dirname, `migration_report_${new Date().toISOString().split('T')[0]}.json`);
    fs.writeFileSync(reportPath, JSON.stringify(migrationResults, null, 2));
    
    // Clean up temp directory
    fs.rmSync(TEMP_DIR, { recursive: true, force: true });
    
    // Print summary
    console.log("\n🎉 Migration completed!");
    console.log(`📊 Summary:`);
    console.log(`  - Total testimonials: ${testimonials.length}`);
    console.log(`  - Photos migrated: ${migrationResults.filter(r => r.newPhotoUrl).length}`);
    console.log(`  - Documents migrated: ${migrationResults.reduce((sum, r) => sum + r.newSupportingDocUrls.length, 0)}`);
    console.log(`  - Errors: ${migrationResults.filter(r => r.errors.length > 0).length}`);
    console.log(`📋 Detailed report saved to: ${reportPath}`);
    
  } catch (error) {
    console.error("💥 Migration failed:", error);
    process.exit(1);
  }
}

// Run migration
if (require.main === module) {
  console.log(`
📋 Migration Script Usage:
  
  Development (default): node migrate-to-backblaze.js
  Production:            node migrate-to-backblaze.js --env=prod
  
  Environment: ${environment.toUpperCase()}
  Convex URL:  ${process.env.NEXT_PUBLIC_CONVEX_URL}
  `);
  
  migrateTestimonials();
}

module.exports = { migrateTestimonials };