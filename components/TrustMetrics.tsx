"use client";

import { BentoCard, BentoIcon, BentoTitle, BentoDescription } from "@/components/ui/bento";
import { Trophy, Users, Star, CheckCircle, Heart } from "lucide-react";

const metrics = [
  {
    id: 1,
    number: "4000+",
    label: "Success Stories",
    description: "Dreams turned into reality",
    icon: Users,
    color: "text-blue-400"
  },
  {
    id: 2,
    number: "5.0",
    label: "Google Rating",
    description: "Trusted by thousands",
    icon: Star,
    color: "text-yellow-400"
  },
  {
    id: 3,
    number: "98%",
    label: "Visa Approval Rate",
    description: "Industry-leading success",
    icon: CheckCircle,
    color: "text-green-400"
  },
  {
    id: 4,
    number: "70%",
    label: "Client Referrals",
    description: "Word-of-mouth champions",
    icon: Heart,
    color: "text-pink-400"
  }
];

export default function TrustMetrics() {
  return (
    <BentoCard className="lg:col-span-3 p-4 md:p-6 lg:p-8 min-h-[300px] md:min-h-[350px]">
      <div className="h-full flex flex-col">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <BentoIcon>
              <Trophy className="h-6 w-6 text-primary" />
            </BentoIcon>
            <span className="text-2xl">🏆</span>
          </div>
          
          <BentoTitle className="text-xl md:text-2xl lg:text-3xl mb-2">
            Proven Track Record
          </BentoTitle>
          
          <BentoDescription className="text-white/90">
            Numbers that speak louder than words - our commitment to your success
          </BentoDescription>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 flex-1">
          {metrics.map((metric) => {
            const Icon = metric.icon;
            
            return (
              <div
                key={metric.id}
                className="text-center p-4 rounded-xl bg-white/5 hover:bg-white/10 hover:scale-[1.02] transition-all duration-300 group cursor-pointer border border-transparent hover:border-primary/20"
              >
                <div className="flex justify-center mb-3">
                  <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Icon className={`h-6 w-6 ${metric.color}`} />
                  </div>
                </div>
                
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">
                  {metric.number}
                </div>
                
                <h4 className="font-semibold text-white text-sm md:text-base mb-1 leading-tight">
                  {metric.label}
                </h4>
                
                <p className="text-xs md:text-sm text-white/70 leading-relaxed">
                  {metric.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </BentoCard>
  );
}