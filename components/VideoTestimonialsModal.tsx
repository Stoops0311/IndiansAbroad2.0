"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Briefcase, Clock, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { allVideoTestimonials } from "@/lib/videoTestimonials";

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