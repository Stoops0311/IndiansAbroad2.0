"use client";

import { BentoCard, BentoIcon, BentoTitle, BentoDescription } from "@/components/ui/bento";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Quote, Star, User, MapPin, Briefcase, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import ReviewsModal from "./ReviewsModal";

export default function WrittenTestimonials() {
  const [modalOpen, setModalOpen] = useState(false);
  
  // Fetch testimonials from Convex
  const allTestimonials = useQuery(api.testimonials.getAllTestimonials);
  
  // Show first 4 testimonials in the component
  const displayedTestimonials = allTestimonials?.slice(0, 4) || [];
  const totalCount = allTestimonials?.length || 0;

  return (
    <>
      <BentoCard className="lg:col-span-1 p-4 md:p-6 lg:p-8 min-h-[500px] md:min-h-[550px]">
        <div className="h-full flex flex-col">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <BentoIcon>
              <Quote className="h-6 w-6 text-primary" />
            </BentoIcon>
            <span className="text-2xl">📝</span>
          </div>
          
          <BentoTitle className="text-lg md:text-xl lg:text-2xl mb-2">
            Client Reviews
          </BentoTitle>
          
          <BentoDescription className="text-muted-foreground">
            Real feedback from real people who trusted us with their dreams
          </BentoDescription>
        </div>
        
        <div className="space-y-4 flex-1 overflow-y-auto max-h-[400px] pr-2 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
          {!allTestimonials ? (
            // Loading state
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
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
          ) : displayedTestimonials.length === 0 ? (
            // Empty state
            <div className="text-center py-8">
              <Quote className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
              <p className="text-muted-foreground text-sm">No testimonials available yet.</p>
            </div>
          ) : (
            // Testimonials list
            displayedTestimonials.map((testimonial) => (
            <Card 
              key={testimonial._id}
              className="p-4 bg-muted/30 border-border hover:border-primary/40 hover:bg-muted/50 transition-all duration-300 group"
            >
              <div className="space-y-3">
                <div className="flex gap-1 mb-2">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-3 w-3 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <blockquote className="text-sm text-foreground/90 italic leading-relaxed">
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
                      className="w-full h-24 object-cover rounded-lg border border-primary/20"
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
                        <User className="h-4 w-4 text-white" />
                      </div>
                    )}
                    <div className="min-w-0">
                      <h5 className="font-semibold text-foreground text-sm leading-tight">
                        {testimonial.name}
                      </h5>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="truncate">{testimonial.service}</span>
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
          )))}
        </div>
        
          <div className="mt-4 pt-4 border-t border-border">
            <Button 
              onClick={() => setModalOpen(true)}
              variant="outline" 
              className="w-full border-primary/20 hover:border-primary/40 hover:bg-primary/10 transition-all group text-sm"
            >
              View All Reviews
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <p className="text-xs text-muted-foreground text-center mt-2">
              {totalCount}+ written testimonials available
            </p>
          </div>
        </div>
      </BentoCard>
      
      <ReviewsModal open={modalOpen} onOpenChange={setModalOpen} />
    </>
  );
}