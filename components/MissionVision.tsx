"use client";

import { BentoCard, BentoIcon, BentoTitle } from "@/components/ui/bento";
import { CheckCircle2, Heart, Globe, Shield } from "lucide-react";

export default function MissionVision() {
  const values = [
    { icon: <Shield className="h-4 w-4" />, text: "Honesty & Transparency" },
    { icon: <Globe className="h-4 w-4" />, text: "Long-Term Client Success" },
    { icon: <Heart className="h-4 w-4" />, text: "Global Quality, Local Heart" },
    { icon: <CheckCircle2 className="h-4 w-4" />, text: "Zero Shortcuts – Only Genuine Paths" }
  ];

  return (
    <BentoCard className="p-4 md:p-6 lg:p-8 min-h-[500px] md:min-h-[550px] h-full">
      <div className="h-full flex flex-col">
        <div className="mb-4">
          <BentoIcon>
            <Heart className="h-6 w-6 text-primary" />
          </BentoIcon>
        </div>
        
        <BentoTitle className="text-xl md:text-2xl lg:text-3xl mb-6">
          Our Core Values
        </BentoTitle>
        
        <div className="space-y-4 md:space-y-5 flex-1">
          {values.map((value, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-primary/20 text-primary flex-shrink-0">
                {value.icon}
              </div>
              <span className="text-sm md:text-base text-foreground/90 leading-relaxed">
                {value.text}
              </span>
            </div>
          ))}
        </div>
        
        <div className="mt-4 p-3 rounded-lg bg-primary/10 border border-primary/20">
          <div className="text-primary text-2xl font-bold">15+</div>
          <div className="text-foreground/70 text-xs">Years Experience</div>
        </div>
      </div>
    </BentoCard>
  );
}