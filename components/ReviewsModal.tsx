"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Star, User, Search, Filter, FileText } from "lucide-react";

interface Testimonial {
  _id: string;
  name: string;
  country: string;
  flag: string;
  rating: number;
  review: string;
  achievement: string;
  timeframe: string;
  service: string;
  photoUrl?: string | null;
  supportingDocUrls?: string[];
  supportingDocType?: string;
}


interface ReviewsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  prefilterService?: string; // Optional prefilter for service-specific modals
  prefilterCountry?: string; // Optional prefilter for country-specific modals
}

export default function ReviewsModal({ open, onOpenChange, prefilterService, prefilterCountry }: ReviewsModalProps) {
  const [countryFilter, setCountryFilter] = useState("");
  const [serviceFilter, setServiceFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");
  const [timeframeFilter, setTimeframeFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  
  // Set prefilters when modal opens with specific service or country
  React.useEffect(() => {
    if (open) {
      if (prefilterService && prefilterService !== serviceFilter) {
        setServiceFilter(prefilterService);
      }
      if (prefilterCountry && prefilterCountry !== countryFilter) {
        setCountryFilter(prefilterCountry);
      }
    }
  }, [open, prefilterService, prefilterCountry]);
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);

  // Fetch testimonials from Convex
  const testimonials = useQuery(api.testimonials.getAllTestimonials);

  const countries = Array.from(new Set(testimonials?.map(t => t.country) || [])).sort();
  const services = Array.from(new Set(testimonials?.map(t => t.service) || [])).sort();

  const filteredTestimonials = useMemo(() => {
    if (!testimonials) return [];
    
    return testimonials.filter(testimonial => {
      const matchesCountry = !countryFilter || testimonial.country === countryFilter;
      const matchesService = !serviceFilter || testimonial.service === serviceFilter;
      const matchesRating = !ratingFilter || (
        ratingFilter === "5" ? testimonial.rating === 5 :
        ratingFilter === "4+" ? testimonial.rating >= 4 :
        ratingFilter === "3+" ? testimonial.rating >= 3 : true
      );
      const matchesTimeframe = !timeframeFilter || (
        timeframeFilter === "under-3" ? parseInt(testimonial.timeframe) < 3 :
        timeframeFilter === "3-6" ? parseInt(testimonial.timeframe) >= 3 && parseInt(testimonial.timeframe) <= 6 :
        timeframeFilter === "6-12" ? parseInt(testimonial.timeframe) >= 6 && parseInt(testimonial.timeframe) <= 12 :
        timeframeFilter === "over-12" ? parseInt(testimonial.timeframe) > 12 : true
      );
      const matchesSearch = !searchTerm || 
        testimonial.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        testimonial.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
        testimonial.review.toLowerCase().includes(searchTerm.toLowerCase()) ||
        testimonial.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
        testimonial.achievement.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesCountry && matchesService && matchesRating && matchesTimeframe && matchesSearch;
    });
  }, [countryFilter, serviceFilter, ratingFilter, timeframeFilter, searchTerm, testimonials]);

  const clearFilters = () => {
    // Keep the prefilter country if it exists, otherwise clear
    setCountryFilter(prefilterCountry || "");
    // Keep the prefilter service if it exists, otherwise clear
    setServiceFilter(prefilterService || "");
    setRatingFilter("");
    setTimeframeFilter("");
    setSearchTerm("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <span className="text-2xl">📝</span>
            {prefilterService && prefilterCountry ? `${prefilterService} Reviews - ${prefilterCountry}` : 
             prefilterService ? `${prefilterService} Reviews` : 
             "All Client Reviews"}
          </DialogTitle>
          <p className="text-muted-foreground mt-2">
            {prefilterService 
              ? `Browse through testimonials and success stories for ${prefilterService} service`
              : "Browse through all our client testimonials and success stories"
            }
          </p>
        </DialogHeader>

        <div className="flex flex-col h-[calc(90vh-120px)]">
          {/* Filters Section - Fixed at top */}
          <div className="flex-shrink-0 p-6 pb-4 space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground/50" />
              <Input
                placeholder="Search reviews, names, professions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-muted/30 border-border text-foreground placeholder:text-muted-foreground/50"
              />
            </div>

            {/* Filter Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Select value={countryFilter} onValueChange={setCountryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Countries" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Countries</SelectItem>
                  {countries.map(country => (
                    <SelectItem key={country} value={country}>{country}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={serviceFilter} onValueChange={setServiceFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Services" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Services</SelectItem>
                  {services.map(service => (
                    <SelectItem key={service} value={service}>{service}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={ratingFilter} onValueChange={setRatingFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Ratings" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Ratings</SelectItem>
                  <SelectItem value="5">5 Stars</SelectItem>
                  <SelectItem value="4+">4+ Stars</SelectItem>
                  <SelectItem value="3+">3+ Stars</SelectItem>
                </SelectContent>
              </Select>

              <Select value={timeframeFilter} onValueChange={setTimeframeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Timeframes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Timeframes</SelectItem>
                  <SelectItem value="under-3">Under 3 months</SelectItem>
                  <SelectItem value="3-6">3-6 months</SelectItem>
                  <SelectItem value="6-12">6-12 months</SelectItem>
                  <SelectItem value="over-12">12+ months</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Results Count & Clear Filters */}
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Showing {filteredTestimonials.length} of {testimonials?.length || 0} reviews</span>
              {(countryFilter || serviceFilter || ratingFilter || timeframeFilter || searchTerm) && (
                <button 
                  onClick={clearFilters}
                  className="text-primary hover:text-primary/80 transition-colors"
                >
                  Clear filters
                </button>
              )}
            </div>
          </div>

          {/* Reviews Grid - Scrollable area */}
          <div className="flex-1 overflow-y-auto px-6 pb-6">
            {!testimonials ? (
              // Loading state
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="p-4 bg-muted/30 border border-border rounded animate-pulse">
                    <div className="space-y-3">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((j) => (
                          <div key={j} className="w-3 h-3 bg-muted/50 rounded"></div>
                        ))}
                      </div>
                      <div className="space-y-2">
                        <div className="h-4 bg-muted/50 rounded w-full"></div>
                        <div className="h-4 bg-muted/50 rounded w-3/4"></div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-muted/50 rounded-full"></div>
                          <div className="space-y-1">
                            <div className="h-3 bg-muted/50 rounded w-20"></div>
                            <div className="h-2 bg-muted/50 rounded w-16"></div>
                          </div>
                        </div>
                        <div className="h-5 bg-muted/50 rounded w-16"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredTestimonials.map((testimonial) => (
                <Card 
                  key={testimonial._id}
                  className="p-4 bg-muted/30 border-border hover:border-primary/40 hover:bg-muted/50 transition-all duration-300 cursor-pointer"
                  onClick={() => setSelectedTestimonial(testimonial)}
                >
                  <div className="space-y-3">
                    <div className="flex gap-1 mb-2">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="h-3 w-3 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    
                    <blockquote className="text-sm text-foreground/90 italic leading-relaxed line-clamp-3">
                      "{testimonial.review}"
                    </blockquote>

                    {/* Supporting Document Image */}
                    {testimonial.supportingDocUrls && 
                     testimonial.supportingDocUrls.length > 0 && 
                     testimonial.supportingDocType === 'image' && (
                      <div className="mt-3">
                        <img
                          src={testimonial.supportingDocUrls[0]}
                          alt="Supporting document"
                          className="w-full h-32 object-cover rounded-lg border border-primary/20"
                          loading="lazy"
                        />
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between pt-3 border-t border-border">
                      <div className="flex items-center gap-2">
                        {testimonial.photoUrl ? (
                          <img
                            src={testimonial.photoUrl}
                            alt={testimonial.name}
                            className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center flex-shrink-0">
                            <User className="h-4 w-4 text-white dark:text-white" />
                          </div>
                        )}
                        <div className="min-w-0">
                          <h5 className="font-semibold text-foreground text-sm leading-tight">
                            {testimonial.name}
                          </h5>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span className="truncate">{testimonial.service}</span>
                            {testimonial.supportingDocUrls && testimonial.supportingDocUrls.length > 0 && (
                              <div className="flex items-center gap-1">
                                <FileText className="h-3 w-3" />
                                <span>{testimonial.supportingDocUrls.length}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <Badge className="bg-primary/20 text-primary text-xs">
                        {testimonial.flag} {testimonial.country}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-primary font-medium">
                        {testimonial.achievement}
                      </span>
                      <span className="text-muted-foreground">
                        {testimonial.timeframe}
                      </span>
                    </div>
                  </div>
                </Card>
                ))}

                {filteredTestimonials.length === 0 && (
                  <div className="text-center py-12 col-span-2">
                    <Filter className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                    <p className="text-muted-foreground">No reviews match your current filters.</p>
                    <button 
                      onClick={clearFilters}
                      className="text-primary hover:text-primary/80 transition-colors mt-2"
                    >
                      Clear all filters
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </DialogContent>

      {/* Testimonial Detail Modal */}
      {selectedTestimonial && (
        <Dialog open={true} onOpenChange={() => setSelectedTestimonial(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col p-0">
            <DialogHeader className="flex-shrink-0 p-6 pb-4">
              <DialogTitle className="flex items-center gap-3">
                <span className="text-2xl">⭐</span>
                {selectedTestimonial.name}'s Success Story
              </DialogTitle>
            </DialogHeader>

            <div className="flex-1 overflow-y-auto px-6 pb-6">
              <div className="space-y-6">
              {/* Header with photo and basic info */}
              <div className="flex items-start gap-4">
                {selectedTestimonial.photoUrl ? (
                  <img
                    src={selectedTestimonial.photoUrl}
                    alt={selectedTestimonial.name}
                    className="w-20 h-20 rounded-full object-cover flex-shrink-0"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center flex-shrink-0">
                    <User className="h-10 w-10 text-white dark:text-white" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="text-2xl font-bold text-foreground mb-2">{selectedTestimonial.name}</h3>
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <Badge className="bg-primary/20 text-primary">
                      {selectedTestimonial.flag} {selectedTestimonial.country}
                    </Badge>
                    <Badge className="bg-blue-500/20 text-blue-400">
                      {selectedTestimonial.service}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    {Array.from({ length: selectedTestimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                    <span className="text-muted-foreground ml-2">({selectedTestimonial.rating}/5)</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                    <span className="text-primary font-medium">{selectedTestimonial.achievement}</span>
                    <span>•</span>
                    <span>{selectedTestimonial.timeframe}</span>
                  </div>
                </div>
              </div>

              {/* Full testimonial */}
              <div className="bg-muted/30 border border-border rounded-lg p-4 md:p-6">
                <h4 className="text-lg font-semibold text-foreground mb-3">Full Testimonial</h4>
                <blockquote className="text-foreground/90 leading-relaxed text-base md:text-lg italic">
                  "{selectedTestimonial.review}"
                </blockquote>
              </div>

              {/* Supporting Document */}
              {selectedTestimonial.supportingDocUrls && selectedTestimonial.supportingDocUrls.length > 0 && (
                <div className="bg-muted/30 border border-border rounded-lg p-4 md:p-6">
                  <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Supporting Document
                  </h4>
                  {(() => {
                    const docUrl = selectedTestimonial.supportingDocUrls[0]; // Only show first document
                    
                    if (!docUrl) {
                      return <div className="text-muted-foreground">No document available</div>;
                    }
                    
                    // Use stored file type if available, otherwise fall back to URL detection
                    const storedType = selectedTestimonial.supportingDocType;
                    const hasExtension = docUrl.includes('.') && (docUrl.split('.').pop()?.length || 0) <= 4;
                    
                    let isImage = false;
                    let isPDF = false;
                    
                    if (storedType) {
                      // Use stored type information
                      isImage = storedType === 'image';
                      isPDF = storedType === 'pdf';
                    } else {
                      // Fall back to URL detection
                      const isConvexUrl = docUrl.includes('convex.cloud');
                      isImage = hasExtension ? Boolean(docUrl.match(/\.(jpg|jpeg|png|gif|webp|bmp|tiff|svg)$/i)) : isConvexUrl;
                      isPDF = hasExtension ? Boolean(docUrl.match(/\.pdf$/i)) : false;
                    }
                    
                    if (isImage) {
                      return (
                        <div className="space-y-3">
                          <img
                            src={docUrl}
                            alt="Supporting document"
                            className="w-full max-w-2xl mx-auto rounded-lg border border-primary/20"
                            loading="eager"
                            onError={(e) => {
                              console.error("Image failed to load:", docUrl);
                              // Hide the image and show fallback
                              e.currentTarget.style.display = 'none';
                              const parent = e.currentTarget.parentElement;
                              if (parent) {
                                const fallback = document.createElement('div');
                                fallback.className = 'text-center py-8';
                                fallback.innerHTML = `
                                  <div class="text-muted-foreground mb-2">Unable to display image</div>
                                `;
                                parent.appendChild(fallback);
                              }
                            }}
                          />
                          <div className="text-center text-muted-foreground text-sm">Supporting Photo</div>
                        </div>
                      );
                    } else if (isPDF) {
                      return (
                        <div className="space-y-3">
                          <div className="w-full h-96 rounded-lg border border-primary/20 overflow-hidden bg-white">
                            <iframe
                              src={`https://docs.google.com/viewer?url=${encodeURIComponent(docUrl)}&embedded=true&toolbar=0&navpanes=0&scrollbar=0`}
                              className="w-full h-full"
                              title="Supporting PDF Document"
                              sandbox="allow-same-origin"
                            />
                          </div>
                          <div className="text-center text-muted-foreground text-sm">PDF Document Preview (View Only)</div>
                        </div>
                      );
                    } else {
                      return (
                        <div className="text-center py-8">
                          <FileText className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                          <div className="text-muted-foreground mb-2">Supporting Document Attached</div>
                          <div className="text-sm text-muted-foreground">Document preview not available</div>
                        </div>
                      );
                    }
                  })()}
                </div>
              )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </Dialog>
  );
}