"use client";

import { BentoCard, BentoIcon, BentoTitle, BentoDescription } from "@/components/ui/bento";
import { Button } from "@/components/ui/button";
import { Target, Upload, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export default function EligibilityForm() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const countries = [
    "Canada", "Germany", "UK", "Australia", "New Zealand", "Denmark", 
    "Netherlands", "Ireland", "Austria", "Other"
  ];

  const educationLevels = [
    "High School", "Diploma", "Bachelor's Degree", "Master's Degree", 
    "PhD", "Professional Certification", "Other"
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic will be added here
    console.log("Eligibility form submitted");
  };

  return (
    <BentoCard className="p-6 md:p-8 lg:p-12 bg-gradient-to-br from-primary/10 to-accent/5 dark:from-primary/20 dark:to-accent/10 min-h-[600px]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <BentoIcon>
              <Target className="h-8 w-8 text-primary" />
            </BentoIcon>
          </div>
          
          <BentoTitle className="text-2xl md:text-3xl lg:text-4xl mb-4">
            Free Eligibility Check
          </BentoTitle>
          
          <BentoDescription className="text-lg text-muted-foreground">
            Get a personalized assessment of your abroad opportunities
          </BentoDescription>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Row 1: Name and Age */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="eligibility-name" className="block text-sm font-medium text-foreground mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="eligibility-name"
                name="name"
                required
                className="w-full px-4 py-3 bg-foreground/10 border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/50 focus:bg-foreground/15 transition-all"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label htmlFor="age" className="block text-sm font-medium text-foreground mb-2">
                Age *
              </label>
              <input
                type="number"
                id="age"
                name="age"
                required
                min="18"
                max="65"
                className="w-full px-4 py-3 bg-foreground/10 border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/50 focus:bg-foreground/15 transition-all"
                placeholder="25"
              />
            </div>
          </div>

          {/* Row 2: Country and Education */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="country" className="block text-sm font-medium text-foreground mb-2">
                Country Preference *
              </label>
              <select
                id="country"
                name="country"
                required
                className="w-full px-4 py-3 bg-foreground/10 border border-border rounded-lg text-foreground focus:outline-none focus:border-primary/50 focus:bg-foreground/15 transition-all"
              >
                <option value="" className="bg-popover text-popover-foreground">Select preferred country</option>
                {countries.map((country) => (
                  <option key={country} value={country} className="bg-popover text-popover-foreground">
                    {country}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="education" className="block text-sm font-medium text-foreground mb-2">
                Highest Education *
              </label>
              <select
                id="education"
                name="education"
                required
                className="w-full px-4 py-3 bg-foreground/10 border border-border rounded-lg text-foreground focus:outline-none focus:border-primary/50 focus:bg-foreground/15 transition-all"
              >
                <option value="" className="bg-popover text-popover-foreground">Select education level</option>
                {educationLevels.map((level) => (
                  <option key={level} value={level} className="bg-popover text-popover-foreground">
                    {level}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 3: Occupation and Experience */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="occupation" className="block text-sm font-medium text-foreground mb-2">
                Current Occupation *
              </label>
              <input
                type="text"
                id="occupation"
                name="occupation"
                required
                className="w-full px-4 py-3 bg-foreground/10 border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/50 focus:bg-foreground/15 transition-all"
                placeholder="e.g., Software Engineer, Doctor, Teacher"
              />
            </div>
            <div>
              <label htmlFor="experience" className="block text-sm font-medium text-foreground mb-2">
                Work Experience (Years) *
              </label>
              <select
                id="experience"
                name="experience"
                required
                className="w-full px-4 py-3 bg-foreground/10 border border-border rounded-lg text-foreground focus:outline-none focus:border-primary/50 focus:bg-foreground/15 transition-all"
              >
                <option value="" className="bg-popover text-popover-foreground">Select experience</option>
                <option value="0-1" className="bg-popover text-popover-foreground">0-1 years</option>
                <option value="1-3" className="bg-gray-800 text-white">1-3 years</option>
                <option value="3-5" className="bg-gray-800 text-white">3-5 years</option>
                <option value="5-10" className="bg-gray-800 text-white">5-10 years</option>
                <option value="10+" className="bg-gray-800 text-white">10+ years</option>
              </select>
            </div>
          </div>

          {/* Row 4: Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="eligibility-email" className="block text-sm font-medium text-foreground mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="eligibility-email"
                name="email"
                required
                className="w-full px-4 py-3 bg-foreground/10 border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/50 focus:bg-foreground/15 transition-all"
                placeholder="your.email@example.com"
              />
            </div>
            <div>
              <label htmlFor="eligibility-phone" className="block text-sm font-medium text-foreground mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                id="eligibility-phone"
                name="phone"
                required
                className="w-full px-4 py-3 bg-foreground/10 border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/50 focus:bg-foreground/15 transition-all"
                placeholder="+91 9876543210"
              />
            </div>
          </div>

          {/* IELTS Score */}
          <div>
            <label htmlFor="ielts" className="block text-sm font-medium text-foreground mb-2">
              IELTS Score (if any)
            </label>
            <input
              type="text"
              id="ielts"
              name="ielts"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-primary/50 focus:bg-white/15 transition-all"
              placeholder="e.g., Overall 7.0 (L: 7, R: 7, W: 6.5, S: 7)"
            />
          </div>

          {/* Resume Upload */}
          <div>
            <label htmlFor="resume" className="block text-sm font-medium text-foreground mb-2">
              Upload Resume (Optional)
            </label>
            <div className="relative">
              <input
                type="file"
                id="resume"
                name="resume"
                accept=".pdf,.doc,.docx"
                onChange={handleFileUpload}
                className="hidden"
              />
              <label
                htmlFor="resume"
                className="w-full px-4 py-6 bg-foreground/5 border-2 border-dashed border-border rounded-lg text-muted-foreground hover:bg-foreground/10 hover:border-primary/40 transition-all cursor-pointer flex flex-col items-center justify-center"
              >
                <Upload className="h-8 w-8 mb-2 text-primary" />
                {uploadedFile ? (
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                    <span className="text-sm text-foreground">{uploadedFile.name}</span>
                  </div>
                ) : (
                  <>
                    <span className="text-sm font-medium">Click to upload resume</span>
                    <span className="text-xs mt-1">PDF, DOC, or DOCX (Max 5MB)</span>
                  </>
                )}
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center pt-6">
            <Button 
              type="submit"
              size="lg" 
              className="px-8 py-4 text-lg shadow-lg hover:shadow-primary/20 transition-all group min-w-[250px]"
            >
              Check My Eligibility
              <Target className="ml-3 h-5 w-5 transition-transform group-hover:scale-110" />
            </Button>
          </div>
        </form>
      </div>
    </BentoCard>
  );
}