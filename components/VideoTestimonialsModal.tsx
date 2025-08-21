"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, MapPin, Briefcase, Clock, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const allVideoTestimonials = [
  {
    id: 1,
    name: "Kulveer Singh",
    profession: "Financial Analyst",
    country: "Germany",
    duration: "Success Story",
    thumbnail: "https://img.youtube.com/vi/4zqYn_0y78A/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=4zqYn_0y78A",
    achievement: "Moved Abroad Successfully",
    quote: "From India to Germany as Financial Analyst",
    details: "How Kulveer Singh Moved Abroad as a Financial Analyst | Real Story by Indians_Abroad"
  },
  {
    id: 2,
    name: "Yogita Lunkad", 
    profession: "Immigration Success",
    country: "Germany",
    duration: "Opportunity Card",
    thumbnail: "https://img.youtube.com/vi/IvGYk6owjUk/maxresdefault.jpg", 
    videoUrl: "https://www.youtube.com/watch?v=IvGYk6owjUk",
    achievement: "Opportunity Card Success",
    quote: "Inspiring journey to Germany",
    details: "Yogita Lunkad's Inspiring Abroad Journey | Indians_Abroad Success Story | Opportunity Card"
  },
  {
    id: 3,
    name: "Rohit Punjabi",
    profession: "Business Systems Specialist",
    country: "Abroad",
    duration: "Success Story",
    thumbnail: "https://img.youtube.com/vi/3zlQbkcYmOA/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=3zlQbkcYmOA",
    achievement: "Business Systems Specialist Success",
    quote: "Real abroad journey transformation",
    details: "Rohit Punjabi's Real Abroad Journey | Business Systems Specialist Success Story | Indians_Abroad"
  },
  {
    id: 4,
    name: "Success Story",
    profession: "Professional Journey",
    country: "International",
    duration: "Career Success",
    thumbnail: "https://img.youtube.com/vi/BGp2eZSJlvM/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=BGp2eZSJlvM",
    achievement: "International Career Success",
    quote: "Transforming dreams into reality",
    details: "Inspiring journey of professional growth and international success"
  },
  {
    id: 5,
    name: "Career Achievement",
    profession: "Global Professional",
    country: "Worldwide",
    duration: "Success Journey",
    thumbnail: "https://img.youtube.com/vi/MGPr0DcznmU/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=MGPr0DcznmU",
    achievement: "Global Career Advancement",
    quote: "Building a successful international career",
    details: "From local opportunities to global success - a transformation story"
  },
  {
    id: 6,
    name: "Immigration Success",
    profession: "Skilled Professional",
    country: "Multiple Destinations",
    duration: "Journey Story",
    thumbnail: "https://img.youtube.com/vi/DN42js9AcLg/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=DN42js9AcLg",
    achievement: "Successful Immigration Journey",
    quote: "Making the dream of living abroad a reality",
    details: "Complete guide to successful immigration and settlement abroad"
  },
  {
    id: 7,
    name: "Work Visa Success",
    profession: "Visa Specialist",
    country: "Global",
    duration: "Visa Process",
    thumbnail: "https://img.youtube.com/vi/pVeNuBWEQQs/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=pVeNuBWEQQs",
    achievement: "Work Visa Approval",
    quote: "Work visa process made simple",
    details: "Complete work visa application and approval process"
  },
  {
    id: 8,
    name: "Client Success Story",
    profession: "Immigration Success",
    country: "Abroad",
    duration: "Journey Documentary",
    thumbnail: "https://img.youtube.com/vi/e-tzXobhKoI/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=e-tzXobhKoI",
    achievement: "Successful Immigration",
    quote: "Another inspiring success story",
    details: "Complete journey documentation and success story"
  },
  {
    id: 9,
    name: "Professional Success",
    profession: "Career Transformation",
    country: "International",
    duration: "Career Change",
    thumbnail: "https://img.youtube.com/vi/BVKvCYnL7i4/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=BVKvCYnL7i4",
    achievement: "Career Transformation",
    quote: "From local to international career",
    details: "Professional transformation and career success abroad"
  },
  {
    id: 10,
    name: "Immigration Journey",
    profession: "Settlement Success",
    country: "Multiple Countries",
    duration: "Settlement Guide",
    thumbnail: "https://img.youtube.com/vi/F6WTQ6Wn9dI/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=F6WTQ6Wn9dI",
    achievement: "Successful Settlement",
    quote: "Complete settlement guidance",
    details: "Step-by-step settlement process and success tips"
  }
];

interface VideoTestimonialsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function VideoTestimonialsModal({ open, onOpenChange }: VideoTestimonialsModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[90vh] p-0 flex flex-col">
        <DialogHeader className="p-6 border-b border-border flex-shrink-0">
          <DialogTitle className="text-2xl font-bold flex items-center gap-3">
            <Play className="h-6 w-6 text-primary" />
            All Video Testimonials
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {allVideoTestimonials.map((testimonial) => (
              <Card 
                key={testimonial.id}
                className="p-4 bg-muted/30 hover:bg-muted/50 hover:scale-[1.02] transition-all duration-300 cursor-pointer border-border group"
                onClick={() => {
                  window.open(testimonial.videoUrl, '_blank');
                }}
              >
                <div className="flex flex-col gap-4">
                  <div className="relative">
                    <div className="w-full aspect-video rounded-xl overflow-hidden relative">
                      <img 
                        src={testimonial.thumbnail} 
                        alt={`${testimonial.name} testimonial`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjE4MCIgdmlld0JveD0iMCAwIDMyMCAxODAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMjAiIGhlaWdodD0iMTgwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMjAgNzJMMTkyIDEwOEwxNjAgMTQ0VjcySDEyMFoiIGZpbGw9IiM2MzY2RjEiLz4KPC9zdmc+';
                        }}
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                          <Play className="h-8 w-8 text-white group-hover:scale-110 transition-transform" />
                        </div>
                      </div>
                    </div>
                    <Badge className="absolute top-2 right-2 bg-background/80 text-foreground text-xs">
                      {testimonial.country}
                    </Badge>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <h3 className="font-semibold text-foreground text-lg leading-tight">
                        {testimonial.name}
                      </h3>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="p-1 h-auto opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(testimonial.videoUrl, '_blank');
                        }}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Briefcase className="h-3 w-3 flex-shrink-0" />
                        <span>{testimonial.profession}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3 flex-shrink-0" />
                        <span>{testimonial.duration}</span>
                      </div>
                    </div>
                    
                    <p className="text-primary font-medium text-base">
                      {testimonial.achievement}
                    </p>
                    
                    <blockquote className="text-foreground/80 italic text-sm leading-relaxed">
                      "{testimonial.quote}"
                    </blockquote>
                    
                    <p className="text-xs text-muted-foreground">
                      {testimonial.details}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
        
        <div className="p-6 border-t border-border text-center bg-muted/30 flex-shrink-0">
          <p className="text-sm text-muted-foreground">
            Click any video to watch the full story • More success stories available on our YouTube channel
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}