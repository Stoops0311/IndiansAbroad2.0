"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { CheckCircle2, ArrowRight, ImageIcon, Play, Star, User, Quote } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { type ServiceData } from "@/lib/services-data";
import { getTestimonialServiceValues } from "@/lib/service-testimonial-mapping";
import ReviewsModal from "./ReviewsModal";

interface ServiceDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: ServiceData;
}

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

export default function ServiceDetailModal({ isOpen, onClose, service }: ServiceDetailModalProps) {
  const [reviewsModalOpen, setReviewsModalOpen] = useState(false);
  const [prefilterService, setPrefilterService] = useState<string>("");
  
  // Get testimonial service values for this service
  const serviceValues = getTestimonialServiceValues(service.id);
  
  // Fetch testimonials for this service
  const testimonials = useQuery(
    api.testimonials.getTestimonialsByServiceValues,
    serviceValues.length > 0 ? { serviceValues } : "skip"
  ) as Testimonial[] | undefined;
  
  // Get first 3 testimonials for display
  const displayedTestimonials = testimonials?.slice(0, 3) || [];
  
  const handleViewAllReviews = () => {
    // Set prefilter to the first service value for this service
    setPrefilterService(serviceValues[0] || "");
    setReviewsModalOpen(true);
  };

  return (
    <>
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex-1">
              <DialogTitle className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                {service.title}
              </DialogTitle>
              {service.price && (
                <div className="flex items-center gap-4">
                  <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/40 text-lg px-3 py-1">
                    {service.price}
                  </Badge>
                </div>
              )}
            </div>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 pt-0">
          {/* Left Column - Content */}
          <div className="space-y-6">
            {/* Service GIF */}
            <div className="relative aspect-video bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl border border-primary/20 overflow-hidden">
              <img
                src={`/services/${service.id}.gif`}
                alt={service.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback to placeholder if GIF doesn't exist
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.innerHTML = `
                      <div class="flex items-center justify-center h-full">
                        <div class="text-center">
                          <div class="p-4 rounded-full bg-primary/20 mb-4 mx-auto w-fit">
                            <svg class="h-8 w-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                            </svg>
                          </div>
                          <p class="text-muted-foreground text-sm">Video Coming Soon</p>
                        </div>
                      </div>
                    `;
                  }
                }}
              />
            </div>

            {/* Description */}
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Service Overview</h3>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                {service.detailedContent?.description.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-sm md:text-base">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Offering */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-4">What's Included</h3>
              <div className="space-y-3">
                {service.detailedContent?.offering.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-foreground/90 text-sm md:text-base leading-relaxed">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing and CTA */}
            <div className="p-6 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
              {service.price && (
                <div className="text-center mb-4">
                  <p className="text-muted-foreground text-sm mb-2">Starting at</p>
                  <p className="text-3xl font-bold text-primary">{service.price}</p>
                </div>
              )}
              
              <Button 
                asChild 
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 text-base shadow-lg hover:shadow-primary/20 transition-all group"
              >
                <Link href={`/contact?service=${service.id}`}>
                  {service.ctaText}
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              
              <p className="text-muted-foreground/80 text-xs text-center mt-3">
                Free consultation • No hidden fees • Expert guidance
              </p>
            </div>

            {/* Additional Info */}
            <div className="p-4 rounded-lg bg-foreground/5 border border-foreground/10">
              <h4 className="font-semibold text-foreground mb-2">Why Choose Us?</h4>
              <ul className="text-muted-foreground text-sm space-y-1">
                <li>• 10+ years of immigration expertise</li>
                <li>• 95% success rate</li>
                <li>• End-to-end support</li>
                <li>• Transparent pricing</li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Service-Specific Testimonials - Full Width Section */}
        <div className="border-t border-border pt-8 px-6 pb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Quote className="h-6 w-6 text-primary" />
              <h3 className="text-xl font-semibold text-foreground">Success Stories</h3>
              <span className="text-sm text-muted-foreground">for {service.title}</span>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleViewAllReviews}
              className="border-primary/20 hover:border-primary/40 hover:bg-primary/10 transition-all group"
            >
              View All Reviews
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
          
          {!testimonials ? (
            // Loading state
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="p-4 bg-muted/30 border-border animate-pulse">
                  <div className="space-y-3">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((j) => (
                        <div key={j} className="w-4 h-4 bg-muted/50 rounded"></div>
                      ))}
                    </div>
                    <div className="space-y-2">
                      <div className="h-4 bg-muted/50 rounded w-full"></div>
                      <div className="h-4 bg-muted/50 rounded w-3/4"></div>
                      <div className="h-4 bg-muted/50 rounded w-1/2"></div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-muted/50 rounded-full"></div>
                      <div className="space-y-1">
                        <div className="h-3 bg-muted/50 rounded w-20"></div>
                        <div className="h-2 bg-muted/50 rounded w-16"></div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : displayedTestimonials.length > 0 ? (
            // Show testimonials in a proper grid
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedTestimonials.map((testimonial) => (
                <Card key={testimonial._id} className="p-4 bg-muted/30 border-border hover:border-primary/40 hover:bg-muted/50 transition-all duration-300 group">
                  <div className="space-y-4">
                    <div className="flex gap-1">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    
                    <blockquote className="text-sm text-foreground/90 italic leading-relaxed line-clamp-3">
                      "{testimonial.review}"
                    </blockquote>
                    
                    <div className="flex items-center justify-between pt-3 border-t border-border/20">
                      <div className="flex items-center gap-3">
                        {testimonial.photoUrl ? (
                          <img
                            src={testimonial.photoUrl}
                            alt={testimonial.name}
                            className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center flex-shrink-0">
                            <User className="h-5 w-5 text-white" />
                          </div>
                        )}
                        <div className="min-w-0">
                          <h5 className="font-semibold text-foreground text-sm leading-tight">
                            {testimonial.name}
                          </h5>
                          <div className="text-xs text-muted-foreground">
                            {testimonial.flag} {testimonial.country}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-sm text-primary font-medium">
                      {testimonial.achievement}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            // No testimonials found
            <div className="text-center py-12">
              <Quote className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
              <h4 className="text-lg font-medium text-foreground mb-2">No testimonials yet</h4>
              <p className="text-muted-foreground mb-4">Be the first to share your success story for {service.title}!</p>
              <Button 
                asChild
                variant="outline"
                className="border-primary/20 hover:border-primary/40 hover:bg-primary/10"
              >
                <Link href="/contact">
                  Share Your Story
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
    <ReviewsModal 
      open={reviewsModalOpen} 
      onOpenChange={setReviewsModalOpen}
      prefilterService={prefilterService}
    />
    </>
  );
}