"use client";

import { BentoCard, BentoIcon, BentoTitle, BentoDescription } from "@/components/ui/bento";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Play, User, MapPin, Quote, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import ReviewsModal from "./ReviewsModal";
import VideoTestimonialsModal from "./VideoTestimonialsModal";
import AutoScrollContainer from "./AutoScrollContainer";
import { allVideoTestimonials } from "@/lib/videoTestimonials";


export default function SuccessStories() {
  const [activeVideo, setActiveVideo] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  const allTestimonials = useQuery(api.testimonials.getAllTestimonials);

  return (
    <BentoCard className="lg:col-span-3 p-4 md:p-6 lg:p-8 min-h-[400px] md:min-h-[450px]">
      <div className="h-full flex flex-col">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <BentoIcon>
              <Star className="h-6 w-6 text-primary" />
            </BentoIcon>
          </div>

          <BentoTitle className="text-xl md:text-2xl lg:text-3xl mb-2">
            Success Stories
          </BentoTitle>

          <BentoDescription className="text-muted-foreground">
            Real stories from people who made their dreams come true
          </BentoDescription>
        </div>

        <div className="grid md:grid-cols-2 gap-6 flex-1">
          {/* Video Testimonials - Auto-scrolling */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <Play className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">Video Testimonials</span>
            </div>

            <AutoScrollContainer className="max-h-[350px]" speed={20}>
              <div className="space-y-3">
                {allVideoTestimonials.map((testimonial, index) => (
                  <Card
                    key={testimonial.id}
                    className={`p-3 bg-foreground/5 hover:bg-foreground/10 hover:scale-[1.02] transition-all duration-300 cursor-pointer border-primary/20 ${
                      activeVideo === index ? 'border-primary/40 bg-foreground/10' : ''
                    }`}
                    onClick={() => {
                      setActiveVideo(index);
                      window.open(testimonial.videoUrl, '_blank');
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-24 h-16 rounded overflow-hidden relative flex-shrink-0">
                          <img
                            src={testimonial.thumbnail}
                            alt={`${testimonial.name} video thumbnail`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
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
                          <span>{testimonial.profession}</span>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-1">
                          {testimonial.quote}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </AutoScrollContainer>

            <div className="mt-3">
              <Button
                onClick={() => setVideoModalOpen(true)}
                variant="outline"
                size="sm"
                className="w-full border-primary/20 hover:border-primary/40 hover:bg-primary/10 transition-all group text-xs"
              >
                View All Videos
                <ArrowRight className="ml-2 h-3 w-3 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>

          {/* Written Testimonials - Auto-scrolling masonry */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <Quote className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">Reviews</span>
            </div>

            {!allTestimonials ? (
              <div className="columns-2 gap-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="break-inside-avoid mb-2 bg-foreground/5 border-primary/20 rounded-xl animate-pulse p-2.5">
                    <div className={`bg-muted/50 rounded-lg w-full mb-2 ${i % 2 === 0 ? 'h-20' : 'h-12'}`}></div>
                    <div className="space-y-1">
                      <div className="h-2.5 bg-muted/50 rounded w-full"></div>
                      <div className="h-2.5 bg-muted/50 rounded w-2/3"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : allTestimonials.length === 0 ? (
              <div className="text-center py-8">
                <Quote className="h-8 w-8 text-muted-foreground/50 mx-auto mb-2" />
                <p className="text-muted-foreground text-sm">No reviews yet.</p>
              </div>
            ) : (
              <AutoScrollContainer className="max-h-[350px] flex-1" speed={20}>
                <div className="columns-2 gap-2">
                  {allTestimonials.map((testimonial) => (
                    <Card
                      key={testimonial._id}
                      className="break-inside-avoid mb-2 p-2.5 bg-foreground/5 border-primary/20 rounded-xl hover:bg-foreground/10 transition-all duration-300 cursor-pointer group"
                      onClick={() => setModalOpen(true)}
                    >
                      {/* Stars */}
                      <div className="flex gap-0.5 mb-1.5">
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <Star key={i} className="h-2.5 w-2.5 text-yellow-400 fill-current" />
                        ))}
                      </div>

                      {/* Review text */}
                      <blockquote className="text-[10px] md:text-[11px] text-foreground/85 italic leading-snug line-clamp-2 mb-2">
                        &ldquo;{testimonial.review}&rdquo;
                      </blockquote>

                      {/* Supporting document image - constrained */}
                      {testimonial.supportingDocUrls &&
                       testimonial.supportingDocUrls.length > 0 &&
                       testimonial.supportingDocType === 'image' && (
                        <div className="mb-2">
                          <img
                            src={testimonial.supportingDocUrls[0]}
                            alt="Supporting document"
                            className="w-full h-20 object-cover rounded-lg border border-primary/20"
                            loading="lazy"
                          />
                        </div>
                      )}

                      {/* Author */}
                      <div className="flex items-center gap-1.5">
                        {testimonial.photoUrl ? (
                          <img
                            src={testimonial.photoUrl}
                            alt={testimonial.name}
                            className="w-5 h-5 rounded-full object-cover flex-shrink-0"
                          />
                        ) : (
                          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center flex-shrink-0">
                            <User className="h-2.5 w-2.5 text-white" />
                          </div>
                        )}
                        <span className="font-medium text-foreground text-[10px] leading-tight truncate">
                          {testimonial.name}
                        </span>
                        <Badge className="bg-primary/15 text-primary text-[9px] border-none px-1 py-0 leading-none ml-auto flex-shrink-0">
                          {testimonial.flag}
                        </Badge>
                      </div>
                    </Card>
                  ))}
                </div>
              </AutoScrollContainer>
            )}

            <div className="mt-3">
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
      </div>

      <ReviewsModal open={modalOpen} onOpenChange={setModalOpen} />
      <VideoTestimonialsModal open={videoModalOpen} onOpenChange={setVideoModalOpen} />
    </BentoCard>
  );
}
