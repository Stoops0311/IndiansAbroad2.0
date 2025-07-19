"use client";

import { BentoCard, BentoIcon, BentoTitle, BentoDescription } from "@/components/ui/bento";
import { Card } from "@/components/ui/card";
import { TrendingUp, ArrowRight } from "lucide-react";

const transformations = [
  {
    id: 1,
    before: "Confused about job market",
    after: "Working in Germany",
    emoji: "💼",
    details: "From job search confusion to landing €75k tech role",
    timeline: "3 months",
    color: "from-red-500/20 to-green-500/20"
  },
  {
    id: 2,
    before: "Multiple visa rejections", 
    after: "Approved for UK visa",
    emoji: "✅",
    details: "Overcame 3 previous rejections with proper documentation",
    timeline: "4 months",
    color: "from-red-500/20 to-blue-500/20"
  },
  {
    id: 3,
    before: "Weak Resume",
    after: "5 Interviews in 2 Weeks",
    emoji: "📄",
    details: "ATS-optimized resume that got noticed by global recruiters",
    timeline: "2 weeks",
    color: "from-orange-500/20 to-purple-500/20"
  },
  {
    id: 4,
    before: "No international exposure",
    after: "€75k salary package",
    emoji: "💰",
    details: "From local market to international standards",
    timeline: "6 months",
    color: "from-gray-500/20 to-yellow-500/20"
  }
];

export default function TransformationStories() {
  return (
    <BentoCard className="lg:col-span-3 p-4 md:p-6 lg:p-8 min-h-[350px] md:min-h-[400px]">
      <div className="h-full flex flex-col">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <BentoIcon>
              <TrendingUp className="h-6 w-6 text-primary" />
            </BentoIcon>
            <span className="text-2xl">✨</span>
          </div>
          
          <BentoTitle className="text-xl md:text-2xl lg:text-3xl mb-2">
            Before → After Transformations
          </BentoTitle>
          
          <BentoDescription className="text-white/90">
            Real transformation journeys that showcase the power of proper guidance
          </BentoDescription>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 flex-1">
          {transformations.map((transformation) => (
            <Card 
              key={transformation.id}
              className={`p-4 md:p-5 bg-gradient-to-br ${transformation.color} border-primary/20 hover:border-primary/40 hover:scale-[1.02] transition-all duration-300 group cursor-pointer h-full`}
            >
              <div className="flex flex-col h-full justify-between">
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl mb-3">{transformation.emoji}</div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-500/20 mb-2">
                        <span className="text-red-400 text-xs font-bold">×</span>
                      </div>
                      <p className="text-sm text-white/80 leading-tight">
                        {transformation.before}
                      </p>
                    </div>
                    
                    <div className="flex justify-center">
                      <ArrowRight className="h-5 w-5 text-primary group-hover:translate-x-1 transition-transform" />
                    </div>
                    
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-500/20 mb-2">
                        <span className="text-green-400 text-xs font-bold">✓</span>
                      </div>
                      <p className="text-sm text-white font-medium leading-tight">
                        {transformation.after}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-white/10">
                  <p className="text-xs text-white/70 text-center leading-relaxed mb-2">
                    {transformation.details}
                  </p>
                  <div className="text-center">
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium">
                      <TrendingUp className="h-3 w-3" />
                      {transformation.timeline}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </BentoCard>
  );
}