"use client";

import { BentoCard, BentoIcon, BentoTitle, BentoDescription } from "@/components/ui/bento";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Play, User, MapPin, Briefcase, Quote, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import ReviewsModal from "./ReviewsModal";

const videoTestimonials = [
  {
    id: 1,
    name: "Kulveer Singh",
    country: "Germany",
    duration: "Financial Analyst Journey",
    role: "Financial Analyst",
    thumbnail: "https://img.youtube.com/vi/4zqYn_0y78A/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=4zqYn_0y78A",
    quote: "How Kulveer Singh Moved Abroad as a Financial Analyst"
  },
  {
    id: 2,
    name: "Yogita Lunkad",
    country: "Germany",
    duration: "Opportunity Card Success",
    role: "Immigration Success Story",
    thumbnail: "https://img.youtube.com/vi/IvGYk6owjUk/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=IvGYk6owjUk",
    quote: "Yogita Lunkad's Inspiring Abroad Journey | Opportunity Card"
  }
];


export default function SuccessStories() {
  const [activeVideo, setActiveVideo] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  
  // Fetch testimonials from Convex
  const allTestimonials = useQuery(api.testimonials.getAllTestimonials);
  
  // Get a featured testimonial for display
  const featuredTestimonial = allTestimonials?.[0];

  return (
    <BentoCard className="lg:col-span-3 p-4 md:p-6 lg:p-8 min-h-[400px] md:min-h-[450px]">
      <div className="h-full flex flex-col">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <BentoIcon>
              <Star className="h-6 w-6 text-primary" />
            </BentoIcon>
            <span className="text-2xl">🎯</span>
          </div>
          
          <BentoTitle className="text-xl md:text-2xl lg:text-3xl mb-2">
            Success Stories
          </BentoTitle>
          
          <BentoDescription className="text-muted-foreground">
            Real stories from people who made their dreams come true
          </BentoDescription>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 flex-1">
          {/* Video Testimonials */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-3">
              <Play className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">🎥 Video Testimonials</span>
            </div>
            
            {videoTestimonials.map((testimonial, index) => (
              <Card 
                key={testimonial.id}
                className={`p-4 bg-foreground/5 hover:bg-foreground/10 hover:scale-[1.02] transition-all duration-300 cursor-pointer border-primary/20 ${
                  activeVideo === index ? 'border-primary/40 bg-foreground/10' : ''
                }`}
                onClick={() => {
                  setActiveVideo(index);
                  window.open(testimonial.videoUrl, '_blank');
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-12 h-8 rounded overflow-hidden relative">
                      <img 
                        src={testimonial.thumbnail} 
                        alt={`${testimonial.name} video thumbnail`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback to play button if thumbnail fails
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent) {
                            parent.className = 'w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center group-hover:scale-110 transition-transform';
                            parent.innerHTML = '<svg class="h-4 w-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>';
                          }
                        }}
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <Play className="h-3 w-3 text-white" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-foreground text-sm mb-1 leading-tight">
                      {testimonial.name}
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                      <MapPin className="h-3 w-3 flex-shrink-0" />
                      <span>{testimonial.country}</span>
                      <span>•</span>
                      <span>{testimonial.duration}</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                      {testimonial.quote}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          {/* Written Testimonial */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-3">
              <Quote className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">📖 Reviews</span>
            </div>
            
            {!featuredTestimonial ? (
              // Loading state
              <Card className="p-4 bg-foreground/5 border-primary/20 h-fit animate-pulse">
                <div className="space-y-3">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="w-4 h-4 bg-muted/50 rounded"></div>
                    ))}
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 bg-muted/50 rounded w-full"></div>
                    <div className="h-4 bg-muted/50 rounded w-3/4"></div>
                  </div>
                  <div className="flex items-center gap-3 pt-3 border-t border-border/20">
                    <div className="w-8 h-8 bg-muted/50 rounded-full"></div>
                    <div className="space-y-1">
                      <div className="h-3 bg-muted/50 rounded w-20"></div>
                      <div className="h-2 bg-muted/50 rounded w-16"></div>
                    </div>
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="p-4 bg-foreground/5 border-primary/20 h-fit hover:bg-foreground/10 transition-colors cursor-pointer" onClick={() => setModalOpen(true)}>
                <div className="space-y-3">
                  <div className="flex gap-1">
                    {Array.from({ length: featuredTestimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  <blockquote className="text-sm text-foreground italic leading-relaxed line-clamp-3">
                    "{featuredTestimonial.review}"
                  </blockquote>
                  
                  <div className="flex items-center gap-3 pt-3 border-t border-border/20">
                    {featuredTestimonial.photoUrl ? (
                      <img
                        src={featuredTestimonial.photoUrl}
                        alt={featuredTestimonial.name}
                        className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center flex-shrink-0">
                        <User className="h-4 w-4 text-white" />
                      </div>
                    )}
                    <div className="min-w-0">
                      <h5 className="font-semibold text-foreground text-sm leading-tight">
                        {featuredTestimonial.name}
                      </h5>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Briefcase className="h-3 w-3 flex-shrink-0" />
                        <span>{featuredTestimonial.service}</span>
                        <span>•</span>
                        <span>{featuredTestimonial.flag} {featuredTestimonial.country}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            )}
            
            {/* View All Reviews Button */}
            <Button 
              onClick={() => setModalOpen(true)}
              variant="outline" 
              size="sm"
              className="w-full border-primary/20 hover:border-primary/40 hover:bg-primary/10 transition-all group text-xs"
            >
              View All Reviews
              <ArrowRight className="ml-2 h-3 w-3 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>
      
      <ReviewsModal open={modalOpen} onOpenChange={setModalOpen} />
    </BentoCard>
  );
}