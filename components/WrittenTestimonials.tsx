"use client";

import { BentoCard, BentoIcon, BentoTitle, BentoDescription } from "@/components/ui/bento";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Quote, Star, User, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import ReviewsModal from "./ReviewsModal";
import AutoScrollContainer from "./AutoScrollContainer";

export default function WrittenTestimonials() {
  const [modalOpen, setModalOpen] = useState(false);

  const allTestimonials = useQuery(api.testimonials.getAllTestimonials);
  const totalCount = allTestimonials?.length || 0;

  return (
    <>
      <BentoCard className="p-4 md:p-6 lg:p-8 h-full">
        <div className="h-full flex flex-col">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <BentoIcon>
                <Quote className="h-6 w-6 text-primary" />
              </BentoIcon>
            </div>

            <BentoTitle className="text-lg md:text-xl lg:text-2xl mb-2">
              Client Reviews
            </BentoTitle>

            <BentoDescription className="text-muted-foreground">
              Real feedback from real people who trusted us with their dreams
            </BentoDescription>
          </div>

          <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
            {!allTestimonials ? (
              <div className="columns-2 lg:columns-3 gap-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="break-inside-avoid mb-3 bg-muted/30 border border-border rounded-xl animate-pulse p-3">
                    <div className={`bg-muted/50 rounded-lg w-full mb-2 ${i % 2 === 0 ? 'h-24' : 'h-16'}`}></div>
                    <div className="space-y-1.5">
                      <div className="h-3 bg-muted/50 rounded w-full"></div>
                      <div className="h-3 bg-muted/50 rounded w-2/3"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : allTestimonials.length === 0 ? (
              <div className="text-center py-8">
                <Quote className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                <p className="text-muted-foreground text-sm">No testimonials available yet.</p>
              </div>
            ) : (
              <AutoScrollContainer className="flex-1 min-h-0" speed={20}>
                <div className="columns-2 lg:columns-3 gap-3">
                  {allTestimonials.map((testimonial) => (
                    <Card
                      key={testimonial._id}
                      className="break-inside-avoid mb-3 p-0 bg-muted/20 border-border hover:border-primary/40 hover:bg-muted/40 transition-all duration-300 cursor-pointer overflow-hidden rounded-xl group"
                      onClick={() => setModalOpen(true)}
                    >
                      {/* Document image */}
                      {testimonial.supportingDocUrls &&
                       testimonial.supportingDocUrls.length > 0 &&
                       testimonial.supportingDocType === 'image' && (
                        <div className="relative w-full overflow-hidden">
                          <img
                            src={testimonial.supportingDocUrls[0]}
                            alt="Supporting document"
                            className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                          <div className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-black/40 to-transparent" />
                          <div className="absolute bottom-2 left-2 flex gap-0.5">
                            {Array.from({ length: testimonial.rating }).map((_, i) => (
                              <Star key={i} className="h-3 w-3 text-yellow-400 fill-current drop-shadow-sm" />
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Content */}
                      <div className="p-3">
                        {/* Stars - only show here if no image above */}
                        {(!testimonial.supportingDocUrls ||
                          testimonial.supportingDocUrls.length === 0 ||
                          testimonial.supportingDocType !== 'image') && (
                          <div className="flex gap-0.5 mb-2">
                            {Array.from({ length: testimonial.rating }).map((_, i) => (
                              <Star key={i} className="h-3 w-3 text-yellow-400 fill-current" />
                            ))}
                          </div>
                        )}

                        <blockquote className="text-[11px] md:text-xs text-foreground/85 italic leading-relaxed line-clamp-3 mb-2">
                          &ldquo;{testimonial.review}&rdquo;
                        </blockquote>

                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2 min-w-0">
                            {testimonial.photoUrl ? (
                              <img
                                src={testimonial.photoUrl}
                                alt={testimonial.name}
                                className="w-6 h-6 rounded-full object-cover flex-shrink-0"
                              />
                            ) : (
                              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center flex-shrink-0">
                                <User className="h-3 w-3 text-white" />
                              </div>
                            )}
                            <div className="min-w-0">
                              <h5 className="font-semibold text-foreground text-[11px] leading-tight truncate">
                                {testimonial.name}
                              </h5>
                              <span className="text-[10px] text-muted-foreground truncate block">
                                {testimonial.service}
                              </span>
                            </div>
                          </div>
                          <Badge className="bg-primary/15 text-primary text-[10px] border-none px-1.5 py-0.5 flex-shrink-0">
                            {testimonial.flag} {testimonial.country}
                          </Badge>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </AutoScrollContainer>
            )}
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
