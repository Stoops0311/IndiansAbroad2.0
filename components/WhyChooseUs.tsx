"use client";

import { BentoCard, BentoIcon, BentoTitle, BentoDescription } from "@/components/ui/bento";
import { Shield, TrendingUp, Eye, Handshake, UserCheck, Route, Languages } from "lucide-react";

const features = [
  {
    id: 1,
    title: "4000+ Job Visa Success Stories",
    icon: TrendingUp,
    color: "text-green-400"
  },
  {
    id: 2,
    title: "Transparent Process – No Hidden Charges",
    icon: Eye,
    color: "text-blue-400"
  },
  {
    id: 3,
    title: "Partnered with Global Employers",
    icon: Handshake,
    color: "text-purple-400"
  },
  {
    id: 4,
    title: "Free Profile Evaluation",
    icon: UserCheck,
    color: "text-orange-400"
  },
  {
    id: 5,
    title: "Personalized Visa Pathways",
    icon: Route,
    color: "text-pink-400"
  },
  {
    id: 6,
    title: "Hindi & English Support",
    icon: Languages,
    color: "text-cyan-400"
  }
];

export default function WhyChooseUs() {
  return (
    <BentoCard className="lg:col-span-1 p-4 md:p-6 lg:p-8 min-h-[400px] md:min-h-[600px]">
      <div className="h-full flex flex-col">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <BentoIcon>
              <Shield className="h-6 w-6 text-primary" />
            </BentoIcon>
            <div>
              <BentoTitle className="text-lg md:text-xl lg:text-2xl mb-2">
                Why Choose Us
              </BentoTitle>
              <BentoDescription className="text-sm md:text-base font-medium text-white/90 leading-relaxed">
                We're Not Just a Visa Agency. We're Your Abroad Partner.
              </BentoDescription>
            </div>
          </div>
        </div>
        
        <div className="space-y-4 flex-1">
          {features.map((feature) => {
            const Icon = feature.icon;
            
            return (
              <div
                key={feature.id}
                className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 hover:scale-[1.02] transition-all duration-300 group cursor-pointer border border-transparent hover:border-primary/20"
              >
                <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors flex-shrink-0">
                  <Icon className={`h-4 w-4 ${feature.color}`} />
                </div>
                <span className="text-sm text-white/90 font-medium leading-tight">
                  {feature.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </BentoCard>
  );
}