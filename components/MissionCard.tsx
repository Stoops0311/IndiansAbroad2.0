"use client";

import { BentoCard, BentoIcon, BentoTitle, BentoDescription } from "@/components/ui/bento";
import { Target } from "lucide-react";

export default function MissionCard() {
  return (
    <BentoCard className="p-4 md:p-6 min-h-[300px] md:min-h-[350px]">
      <div className="h-full flex flex-col">
        <div className="mb-4">
          <BentoIcon>
            <Target className="h-6 w-6 text-primary" />
          </BentoIcon>
        </div>
        
        <BentoTitle className="text-lg md:text-xl mb-3">
          Our Mission
        </BentoTitle>
        
        <BentoDescription className="text-sm md:text-base text-white/90 leading-relaxed flex-1">
          To simplify the global migration process so every deserving Indian can live, work, and thrive abroad.
        </BentoDescription>
        
        <div className="mt-4 p-3 rounded-lg bg-primary/10 border border-primary/20">
          <div className="text-primary text-2xl font-bold">2000+</div>
          <div className="text-white/70 text-xs">Lives Changed</div>
        </div>
      </div>
    </BentoCard>
  );
}