"use client";

import { BentoCard, BentoIcon, BentoTitle, BentoDescription } from "@/components/ui/bento";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, MapPin, Briefcase, Clock, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import VideoTestimonialsModal from "./VideoTestimonialsModal";

const videoTestimonials = [
  {
    id: 1,
    name: "Kulveer",
    profession: "Financial Analyst",
    country: "Germany",
    flag: "",
    duration: "Success Story",
    thumbnail: "https://img.youtube.com/vi/4zqYn_0y78A/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=4zqYn_0y78A",
    achievement: "Moved Abroad Successfully",
    quote: "From India to Germany as Financial Analyst",
    details: "How Kulveer Moved Abroad as a Financial Analyst | Real Story by Indians_Abroad"
  },
  {
    id: 2,
    name: "Yogita",
    profession: "Immigration Success",
    country: "Germany",
    flag: "",
    duration: "Opportunity Card",
    thumbnail: "https://img.youtube.com/vi/IvGYk6owjUk/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=IvGYk6owjUk",
    achievement: "Opportunity Card Success",
    quote: "Inspiring journey to Germany",
    details: "Yogita's Inspiring Abroad Journey | Indians_Abroad Success Story | Opportunity Card"
  },
  {
    id: 3,
    name: "Rohit",
    profession: "Business Systems Specialist",
    country: "Abroad",
    flag: "",
    duration: "Success Story",
    thumbnail: "https://img.youtube.com/vi/3zlQbkcYmOA/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=3zlQbkcYmOA",
    achievement: "Business Systems Specialist Success",
    quote: "Real abroad journey transformation",
    details: "Rohit's Real Abroad Journey | Business Systems Specialist Success Story | Indians_Abroad"
  },
  {
    id: 4,
    name: "Success Story",
    profession: "Professional Journey",
    country: "International",
    flag: "",
    duration: "Career Success",
    thumbnail: "https://img.youtube.com/vi/BGp2eZSJlvM/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=BGp2eZSJlvM",
    achievement: "International Career Success",
    quote: "Transforming dreams into reality",
    details: "Inspiring journey of professional growth and international success"
  }
];

export default function VideoTestimonials() {
  const [activeVideo, setActiveVideo] = useState(0);
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  return (
    <BentoCard className="p-4 md:p-6 lg:p-8 min-h-[600px] md:min-h-[650px] h-full">
      <div className="h-full flex flex-col">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <BentoIcon>
              <Play className="h-6 w-6 text-primary" />
            </BentoIcon>
          </div>
          
          <BentoTitle className="text-xl md:text-2xl lg:text-3xl mb-2">
            Video Success Stories
          </BentoTitle>
          
          <BentoDescription className="text-muted-foreground">
            Hear directly from our clients about their transformation journeys
          </BentoDescription>
        </div>
        
        <div className="space-y-4 flex-1">
          {videoTestimonials.map((testimonial, index) => (
            <Card 
              key={testimonial.id}
              className={`p-4 bg-muted/30 hover:bg-muted/50 hover:scale-[1.02] transition-all duration-300 cursor-pointer border-border group ${
                activeVideo === index ? 'border-primary/40 bg-muted/50' : ''
              }`}
              onClick={() => {
                setActiveVideo(index);
                window.open(testimonial.videoUrl, '_blank');
              }}
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-shrink-0 mx-auto sm:mx-0">
                  <div className="w-32 h-32 md:w-36 md:h-36 rounded-xl overflow-hidden relative">
                    <img 
                      src={testimonial.thumbnail} 
                      alt={`${testimonial.name} testimonial`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback to a placeholder if thumbnail fails to load
                        const target = e.target as HTMLImageElement;
                        target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTEyIiBoZWlnaHQ9IjExMiIgdmlld0JveD0iMCAwIDExMiAxMTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMTIiIGhlaWdodD0iMTEyIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik00MCA0MEw3MiA1NkwNNCA3MlY0MEg0MFoiIGZpbGw9IiM2MzY2RjEiLz4KPC9zdmc+';
                      }}
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <Play className="h-6 w-6 md:h-8 md:w-8 text-white group-hover:scale-110 transition-transform" />
                    </div>
                  </div>
                  <Badge className="absolute -top-2 -right-2 bg-background/80 text-foreground text-xs">
                    {testimonial.flag}
                  </Badge>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-foreground text-base md:text-lg leading-tight">
                      {testimonial.name}
                    </h3>
                    <Badge variant="outline" className="border-primary/30 text-primary text-xs">
                      {testimonial.country}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-3 text-xs md:text-sm text-muted-foreground mb-2">
                    <div className="flex items-center gap-1">
                      <Briefcase className="h-3 w-3 flex-shrink-0" />
                      <span>{testimonial.profession}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3 flex-shrink-0" />
                      <span>{testimonial.duration}</span>
                    </div>
                  </div>
                  
                  <p className="text-primary font-medium text-sm md:text-base mb-2">
                    {testimonial.achievement}
                  </p>
                  
                  <blockquote className="text-foreground/80 italic text-sm leading-relaxed">
                    "{testimonial.quote}"
                  </blockquote>
                  
                  <p className="text-xs text-muted-foreground mt-2">
                    {testimonial.details}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        {/* View All Videos Button */}
        <div className="mt-6 pt-4 border-t border-border">
          <Button 
            onClick={() => setVideoModalOpen(true)}
            className="w-full bg-primary hover:bg-primary/90 transition-all group"
          >
            View All Video Testimonials
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
          
          <p className="text-xs text-muted-foreground text-center mt-3">
            Click any story to watch their journey • More videos available
          </p>
        </div>
      </div>
      
      <VideoTestimonialsModal open={videoModalOpen} onOpenChange={setVideoModalOpen} />
    </BentoCard>
  );
}