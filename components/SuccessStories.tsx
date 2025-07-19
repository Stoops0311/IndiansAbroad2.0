"use client";

import { BentoCard, BentoIcon, BentoTitle, BentoDescription } from "@/components/ui/bento";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Play, User, MapPin, Briefcase, Quote } from "lucide-react";
import { useState } from "react";

const videoTestimonials = [
  {
    id: 1,
    name: "Ravi Kumar",
    country: "Germany",
    duration: "3 months",
    role: "Software Developer",
    thumbnail: "/placeholder.jpg",
    quote: "Got my Germany Job Visa in 3 months"
  },
  {
    id: 2,
    name: "Sneha Patel",
    country: "Canada",
    duration: "4 months",
    role: "Data Analyst",
    thumbnail: "/placeholder.jpg",
    quote: "Relocated to Canada with PR & job offer"
  }
];

const writtenTestimonial = {
  name: "Manish Thakur",
  role: "Software Engineer",
  country: "Germany",
  text: "I was struggling with my Germany job search. This team helped me with my resume, job applications, visa process – everything! I'm now working in Berlin.",
  rating: 5
};

export default function SuccessStories() {
  const [activeVideo, setActiveVideo] = useState(0);

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
          
          <BentoDescription className="text-white/90">
            Real stories from people who made their dreams come true
          </BentoDescription>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 flex-1">
          {/* Video Testimonials */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-3">
              <Play className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-white/80">🎥 Video Testimonials</span>
            </div>
            
            {videoTestimonials.map((testimonial, index) => (
              <Card 
                key={testimonial.id}
                className={`p-4 bg-white/5 hover:bg-white/10 hover:scale-[1.02] transition-all duration-300 cursor-pointer border-primary/20 ${
                  activeVideo === index ? 'border-primary/40 bg-white/10' : ''
                }`}
                onClick={() => setActiveVideo(index)}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="h-4 w-4 text-white ml-0.5" />
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-white text-sm mb-1 leading-tight">
                      {testimonial.name}
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-white/70 mb-1">
                      <MapPin className="h-3 w-3 flex-shrink-0" />
                      <span>{testimonial.country}</span>
                      <span>•</span>
                      <span>{testimonial.duration}</span>
                    </div>
                    <p className="text-xs text-white/80 leading-relaxed">
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
              <span className="text-sm font-medium text-white/80">📖 Reviews</span>
            </div>
            
            <Card className="p-4 bg-white/5 border-primary/20 h-fit hover:bg-white/10 transition-colors">
              <div className="space-y-3">
                <div className="flex gap-1">
                  {Array.from({ length: writtenTestimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <blockquote className="text-sm text-white/90 italic leading-relaxed">
                  "{writtenTestimonial.text}"
                </blockquote>
                
                <div className="flex items-center gap-3 pt-3 border-t border-white/10">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center flex-shrink-0">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <div className="min-w-0">
                    <h5 className="font-semibold text-white text-sm leading-tight">
                      {writtenTestimonial.name}
                    </h5>
                    <div className="flex items-center gap-2 text-xs text-white/70">
                      <Briefcase className="h-3 w-3 flex-shrink-0" />
                      <span>{writtenTestimonial.role}</span>
                      <span>•</span>
                      <span>{writtenTestimonial.country}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </BentoCard>
  );
}