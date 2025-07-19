"use client";

import { BentoCard, BentoIcon, BentoTitle, BentoDescription } from "@/components/ui/bento";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Quote, Star, User, MapPin, Briefcase, ArrowRight } from "lucide-react";
import { useState } from "react";
import ReviewsModal from "./ReviewsModal";

const testimonials = [
  {
    id: 1,
    name: "Ritika Shah",
    profession: "HR Executive",
    country: "Australia",
    flag: "🇦🇺",
    rating: 5,
    review: "From my IELTS to visa stamping, everything was taken care of. I never felt lost. The team guided me through every step.",
    achievement: "PR Visa Approved",
    timeframe: "8 months"
  },
  {
    id: 2,
    name: "Arjun Sharma",
    profession: "Data Scientist", 
    country: "Netherlands",
    flag: "🇳🇱",
    rating: 5,
    review: "Within 2 weeks of resume optimization, I had 5 interviews lined up. The visa process was seamless with their guidance.",
    achievement: "€85k Job Offer",
    timeframe: "5 months"
  },
  {
    id: 3,
    name: "Priya Gupta",
    profession: "Marketing Manager",
    country: "Canada", 
    flag: "🇨🇦",
    rating: 5,
    review: "Got my Express Entry invitation in first draw itself. Their point calculation and document preparation was spot-on.",
    achievement: "Canada PR",
    timeframe: "7 months"
  },
  {
    id: 4,
    name: "Vikram Singh",
    profession: "Software Developer",
    country: "Germany",
    flag: "🇩🇪", 
    rating: 5,
    review: "No IELTS required for Germany was true! They connected me with employers who sponsored my visa directly.",
    achievement: "Job Visa Approved",
    timeframe: "4 months"
  }
];

export default function WrittenTestimonials() {
  const [modalOpen, setModalOpen] = useState(false);

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
          
          <BentoDescription className="text-white/90">
            Real feedback from real people who trusted us with their dreams
          </BentoDescription>
        </div>
        
        <div className="space-y-4 flex-1 overflow-y-auto max-h-[400px] pr-2 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
          {testimonials.map((testimonial) => (
            <Card 
              key={testimonial.id}
              className="p-4 bg-white/5 border-primary/20 hover:border-primary/40 hover:bg-white/10 transition-all duration-300 group"
            >
              <div className="space-y-3">
                <div className="flex gap-1 mb-2">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-3 w-3 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <blockquote className="text-sm text-white/90 italic leading-relaxed">
                  "{testimonial.review}"
                </blockquote>
                
                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center flex-shrink-0">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <div className="min-w-0">
                      <h5 className="font-semibold text-white text-sm leading-tight">
                        {testimonial.name}
                      </h5>
                      <div className="flex items-center gap-2 text-xs text-white/70">
                        <Briefcase className="h-3 w-3 flex-shrink-0" />
                        <span className="truncate">{testimonial.profession}</span>
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
                  <span className="text-white/60">
                    {testimonial.timeframe}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
        
          <div className="mt-4 pt-4 border-t border-white/10">
            <Button 
              onClick={() => setModalOpen(true)}
              variant="outline" 
              className="w-full border-primary/20 hover:border-primary/40 hover:bg-primary/10 transition-all group text-sm"
            >
              View All Reviews
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <p className="text-xs text-white/60 text-center mt-2">
              500+ written testimonials available
            </p>
          </div>
        </div>
      </BentoCard>
      
      <ReviewsModal open={modalOpen} onOpenChange={setModalOpen} />
    </>
  );
}