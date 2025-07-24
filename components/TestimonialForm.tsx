"use client";

import { useState, useRef } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { X, Upload, Star, FileText, Trash2, User } from "lucide-react";

interface TestimonialFormProps {
  testimonial?: any;
  onClose: () => void;
}

const COUNTRIES = [
  { name: "Australia", flag: "🇦🇺" },
  { name: "Canada", flag: "🇨🇦" },
  { name: "Germany", flag: "🇩🇪" },
  { name: "Netherlands", flag: "🇳🇱" },
  { name: "New Zealand", flag: "🇳🇿" },
  { name: "Singapore", flag: "🇸🇬" },
  { name: "Switzerland", flag: "🇨🇭" },
  { name: "UK", flag: "🇬🇧" },
  { name: "USA", flag: "🇺🇸" },
];

const SERVICES = [
  "Global Career Evaluator",
  "Permanent Residency Canada", 
  "Permanent Residency Australia",
  "Work Visa",
  "German Opportunity Card",
  "Study Abroad",
  "Language Training",
];

export default function TestimonialForm({ testimonial, onClose }: TestimonialFormProps) {
  const [formData, setFormData] = useState({
    name: testimonial?.name || "",
    country: testimonial?.country || "",
    rating: testimonial?.rating || 5,
    review: testimonial?.review || "",
    achievement: testimonial?.achievement || "",
    timeframe: testimonial?.timeframe || "",
    service: testimonial?.service || "",
  });

  const [selectedCountry, setSelectedCountry] = useState(
    COUNTRIES.find(c => c.name === testimonial?.country) || null
  );
  
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(testimonial?.photoUrl || null);
  const [supportingFiles, setSupportingFiles] = useState<File[]>([]);
  const [existingSupportingDocs, setExistingSupportingDocs] = useState<string[]>(testimonial?.supportingDocUrls || []);
  const [supportingDocsToRemove, setSupportingDocsToRemove] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const photoInputRef = useRef<HTMLInputElement>(null);
  const docsInputRef = useRef<HTMLInputElement>(null);

  const createTestimonial = useMutation(api.testimonials.createTestimonial);
  const updateTestimonial = useMutation(api.testimonials.updateTestimonial);
  const generateUploadUrl = useMutation(api.testimonials.generateUploadUrl);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCountryChange = (countryName: string) => {
    const country = COUNTRIES.find(c => c.name === countryName);
    setSelectedCountry(country || null);
    handleInputChange("country", countryName);
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onload = () => setPhotoPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSupportingDocsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSupportingFiles([file]); // Only allow one file
    }
  };

  const removePhotoPreview = () => {
    setPhotoFile(null);
    setPhotoPreview(null);
    if (photoInputRef.current) {
      photoInputRef.current.value = "";
    }
  };

  const removeSupportingFile = (index: number) => {
    setSupportingFiles(prev => prev.filter((_, i) => i !== index));
  };

  const removeExistingSupportingDoc = (docUrl: string) => {
    setExistingSupportingDocs(prev => prev.filter(url => url !== docUrl));
    setSupportingDocsToRemove(prev => [...prev, docUrl]);
  };

  const uploadFile = async (file: File) => {
    const uploadUrl = await generateUploadUrl();
    const response = await fetch(uploadUrl, {
      method: "POST",
      headers: { "Content-Type": file.type },
      body: file,
    });
    
    if (!response.ok) {
      throw new Error("Failed to upload file");
    }
    
    const { storageId } = await response.json();
    return storageId;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let photoStorageId = testimonial?.photo;
      let supportingDocStorageIds = testimonial?.supportingDocs || [];

      // Upload photo if new one is selected
      if (photoFile) {
        photoStorageId = await uploadFile(photoFile);
      }

      // Handle existing supporting documents removal
      if (supportingDocsToRemove.length > 0 && testimonial?.supportingDocs) {
        // Filter out removed documents by comparing URLs
        const remainingDocIds = [];
        for (let i = 0; i < (testimonial.supportingDocUrls || []).length; i++) {
          const docUrl = testimonial.supportingDocUrls[i];
          if (!supportingDocsToRemove.includes(docUrl)) {
            remainingDocIds.push(testimonial.supportingDocs[i]);
          }
        }
        supportingDocStorageIds = remainingDocIds;
      }

      // Upload supporting documents if any
      if (supportingFiles.length > 0) {
        const newDocIds = await Promise.all(
          supportingFiles.map(file => uploadFile(file))
        );
        supportingDocStorageIds = [...supportingDocStorageIds, ...newDocIds];
      }

      // Determine supporting document type
      let supportingDocType = undefined;
      if (supportingFiles.length > 0) {
        const file = supportingFiles[0];
        if (file.type.startsWith('image/')) {
          supportingDocType = 'image';
        } else if (file.type === 'application/pdf') {
          supportingDocType = 'pdf';
        }
      }

      const testimonialData = {
        ...formData,
        flag: selectedCountry?.flag || "🌍",
        photo: photoStorageId,
        supportingDocs: supportingDocStorageIds.length > 0 ? supportingDocStorageIds : undefined,
        supportingDocType,
      };

      if (testimonial) {
        await updateTestimonial({
          id: testimonial._id,
          ...testimonialData,
        });
      } else {
        await createTestimonial(testimonialData);
      }

      onClose();
    } catch (error) {
      console.error("Error saving testimonial:", error);
      alert("Failed to save testimonial. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <span className="text-2xl">📝</span>
            {testimonial ? "Edit Testimonial" : "Add New Testimonial"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Client's full name"
                className="bg-muted/30 border-primary/20 text-foreground"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">Country *</Label>
              <Select value={formData.country} onValueChange={handleCountryChange}>
                <SelectTrigger className="bg-muted/30 border-primary/20 text-foreground [&>span]:text-foreground">
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  {COUNTRIES.map((country) => (
                    <SelectItem key={country.name} value={country.name}>
                      {country.flag} {country.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Rating and Service */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="rating">Rating *</Label>
              <Select 
                value={formData.rating.toString()} 
                onValueChange={(value) => handleInputChange("rating", parseInt(value))}
              >
                <SelectTrigger className="bg-muted/30 border-primary/20 text-foreground [&>span]:text-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <SelectItem key={rating} value={rating.toString()}>
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1">
                          {Array.from({ length: rating }).map((_, i) => (
                            <Star key={i} className="h-3 w-3 text-yellow-400 fill-current" />
                          ))}
                        </div>
                        <span>{rating} Stars</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="service">Service *</Label>
              <Select value={formData.service} onValueChange={(value) => handleInputChange("service", value)}>
                <SelectTrigger className="bg-muted/30 border-primary/20 text-foreground [&>span]:text-foreground">
                  <SelectValue placeholder="Select service" />
                </SelectTrigger>
                <SelectContent>
                  {SERVICES.map((service) => (
                    <SelectItem key={service} value={service}>
                      {service}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Review */}
          <div className="space-y-2">
            <Label htmlFor="review">Review *</Label>
            <textarea
              id="review"
              value={formData.review}
              onChange={(e) => handleInputChange("review", e.target.value)}
              placeholder="Client's testimonial..."
              className="w-full h-32 px-3 py-2 bg-muted/30 border border-primary/20 rounded-md text-foreground placeholder:text-muted-foreground/50 resize-none"
              required
            />
          </div>

          {/* Achievement and Timeframe */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="achievement">Achievement *</Label>
              <Input
                id="achievement"
                value={formData.achievement}
                onChange={(e) => handleInputChange("achievement", e.target.value)}
                placeholder="e.g., PR Visa Approved, €85k Job Offer"
                className="bg-muted/30 border-primary/20 text-foreground"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="timeframe">Timeframe *</Label>
              <Input
                id="timeframe"
                value={formData.timeframe}
                onChange={(e) => handleInputChange("timeframe", e.target.value)}
                placeholder="e.g., 6 months, 1 year"
                className="bg-muted/30 border-primary/20 text-foreground"
                required
              />
            </div>
          </div>

          {/* Photo Upload */}
          <div className="space-y-2">
            <Label>Profile Photo (Optional)</Label>
            <div className="flex items-center gap-4">
              {photoPreview ? (
                <div className="relative">
                  <img
                    src={photoPreview}
                    alt="Profile preview"
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={removePhotoPreview}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs hover:bg-red-600"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ) : (
                <div className="w-16 h-16 rounded-full bg-muted/30 flex items-center justify-center">
                  <User className="h-8 w-8 text-muted-foreground/50" />
                </div>
              )}
              <Button
                type="button"
                variant="outline"
                onClick={() => photoInputRef.current?.click()}
                className="border-primary/20 text-primary hover:bg-primary/10"
              >
                <Upload className="h-4 w-4 mr-2" />
                {photoPreview ? "Change Photo" : "Upload Photo"}
              </Button>
            </div>
            <input
              ref={photoInputRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="hidden"
            />
          </div>

          {/* Supporting Document */}
          <div className="space-y-2">
            <Label>Supporting Document (Optional)</Label>
            <div className="space-y-2">
              {/* Existing supporting documents */}
              {existingSupportingDocs.map((docUrl, index) => (
                <div key={docUrl} className="flex items-center justify-between p-2 bg-muted/30 rounded border border-primary/20">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary" />
                    <span className="text-sm text-foreground">Existing Document {index + 1}</span>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeExistingSupportingDoc(docUrl)}
                    className="text-red-400 hover:bg-red-400/10"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              ))}
              
              {/* New supporting documents */}
              {supportingFiles.length > 0 && (
                <div className="flex items-center justify-between p-2 bg-muted/30 rounded border border-primary/20">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary" />
                    <span className="text-sm text-foreground">{supportingFiles[0].name}</span>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setSupportingFiles([])}
                    className="text-red-400 hover:bg-red-400/10"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              )}
              <Button
                type="button"
                variant="outline"
                onClick={() => docsInputRef.current?.click()}
                className="w-full border-primary/20 text-primary hover:bg-primary/10"
                disabled={supportingFiles.length > 0}
              >
                <Upload className="h-4 w-4 mr-2" />
                {supportingFiles.length > 0 ? "Supporting Document Added" : "Add Supporting Document (PDF or Photo)"}
              </Button>
            </div>
            <input
              ref={docsInputRef}
              type="file"
              accept=".pdf,.jpg,.jpeg,.png,.gif,.webp,.bmp,.tiff"
              onChange={handleSupportingDocsChange}
              className="hidden"
            />
          </div>

          {/* Form Actions */}
          <div className="flex gap-3 pt-4 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 border-border text-foreground hover:bg-muted/50"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-primary hover:bg-primary/90 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : testimonial ? "Update Testimonial" : "Create Testimonial"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}