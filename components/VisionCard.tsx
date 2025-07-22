"use client";

import { BentoCard, BentoIcon, BentoTitle, BentoDescription } from "@/components/ui/bento";
import { Eye } from "lucide-react";

export default function VisionCard() {
  return (
    <BentoCard className="p-4 md:p-6 min-h-[300px] md:min-h-[350px]">
      <div className="h-full flex flex-col">
        <div className="mb-4">
          <BentoIcon>
            <Eye className="h-6 w-6 text-primary" />
          </BentoIcon>
        </div>
        
        <BentoTitle className="text-lg md:text-xl mb-3">
          Our Vision
        </BentoTitle>
        
        <BentoDescription className="text-sm md:text-base text-foreground/90 leading-relaxed flex-1">
          To be India's most trusted name for ethical, transparent, and life-changing abroad consultancy services.
        </BentoDescription>
        
        <div className="mt-4 p-3 rounded-lg bg-primary/10 border border-primary/20">
          <div className="text-primary text-2xl font-bold">98%</div>
          <div className="text-muted-foreground text-xs">Success Rate</div>
        </div>
      </div>
    </BentoCard>
  );
}