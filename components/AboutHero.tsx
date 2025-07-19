"use client";

import { BentoCard } from "@/components/ui/bento";
import { Button } from "@/components/ui/button";
import { ArrowRight, Globe2 } from "lucide-react";

export default function AboutHero() {
  return (
    <BentoCard className="col-span-full p-6 md:p-8 lg:p-12 xl:p-16 bg-gradient-to-br from-primary/30 to-accent/20 min-h-[400px] md:min-h-[500px] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 border border-white/20 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 border border-white/20 rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-white/20 rounded-full"></div>
      </div>
      
      <div className="relative z-10 text-center max-w-4xl mx-auto space-y-6 md:space-y-8">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="p-4 rounded-full bg-primary/20 backdrop-blur">
            <Globe2 className="h-8 w-8 text-primary" />
          </div>
        </div>
        
        {/* Main Headline */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
          About Indians Abroad
        </h1>
        
        {/* Subtitle */}
        <p className="text-lg md:text-xl lg:text-2xl text-white/80 max-w-3xl mx-auto">
          We're not just consultants — we're your abroad journey partners
        </p>
        
        {/* CTA Button */}
        <div className="flex justify-center pt-4">
          <Button 
            size="lg" 
            className="text-base md:text-lg px-6 md:px-8 py-4 md:py-6 shadow-lg hover:shadow-primary/20 transition-all group"
          >
            Start Your Journey
            <ArrowRight className="ml-2 md:ml-3 h-4 md:h-5 w-4 md:w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
        
        {/* Trust Badge */}
        <div className="pt-8 border-t border-white/10">
          <p className="text-sm text-white/60">
            Trusted by 4000+ professionals • 98% success rate • 15+ years experience
          </p>
        </div>
      </div>
    </BentoCard>
  );
}