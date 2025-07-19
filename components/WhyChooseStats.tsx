"use client";

import { BentoCard, BentoIcon, BentoTitle, BentoDescription } from "@/components/ui/bento";
import { Award, Users, Shield, Globe, CheckCircle, HeadphonesIcon } from "lucide-react";

export default function WhyChooseStats() {
  const stats = [
    {
      number: "4000+",
      label: "Happy Clients",
      icon: <Users className="h-5 w-5" />,
      color: "from-blue-500/20 to-blue-600/20"
    },
    {
      number: "98%",
      label: "Success Rate",
      icon: <Award className="h-5 w-5" />,
      color: "from-green-500/20 to-green-600/20"
    },
    {
      number: "100%",
      label: "Transparency",
      icon: <Shield className="h-5 w-5" />,
      color: "from-purple-500/20 to-purple-600/20"
    },
    {
      number: "15+",
      label: "Years Experience",
      icon: <Globe className="h-5 w-5" />,
      color: "from-orange-500/20 to-orange-600/20"
    }
  ];

  const features = [
    {
      icon: <Users className="h-5 w-5" />,
      title: "Real People, Real Results",
      description: "Genuine success stories from actual clients"
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: "100% Transparency",
      description: "No hidden fees, clear process communication"
    },
    {
      icon: <Globe className="h-5 w-5" />,
      title: "PAN India Support",
      description: "Offices across major Indian cities"
    },
    {
      icon: <CheckCircle className="h-5 w-5" />,
      title: "Free Profile Evaluation",
      description: "Comprehensive assessment at no cost"
    },
    {
      icon: <HeadphonesIcon className="h-5 w-5" />,
      title: "Lifetime Support",
      description: "Ongoing assistance for PR & work abroad"
    }
  ];

  return (
    <BentoCard className="lg:col-span-3 p-4 md:p-6 lg:p-8 min-h-[500px] md:min-h-[550px]">
      <div className="h-full flex flex-col">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <BentoIcon>
              <Award className="h-6 w-6 text-primary" />
            </BentoIcon>
          </div>
          
          <BentoTitle className="text-xl md:text-2xl lg:text-3xl mb-2">
            Why People Choose Us
          </BentoTitle>
          
          <BentoDescription className="text-white/90">
            The numbers speak for themselves, but our commitment goes beyond statistics
          </BentoDescription>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className={`p-4 rounded-xl bg-gradient-to-br ${stat.color} border border-primary/20 hover:border-primary/40 hover:scale-[1.02] transition-all duration-300 group text-center`}
            >
              <div className="space-y-2">
                <div className="flex justify-center">
                  <div className="p-2 rounded-lg bg-primary/20 text-primary group-hover:bg-primary/30 transition-colors">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-2xl md:text-3xl font-bold text-white">
                  {stat.number}
                </div>
                <div className="text-xs md:text-sm text-white/70">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Features Grid */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white mb-6">What Sets Us Apart</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="p-4 bg-white/5 rounded-xl border border-primary/20 hover:bg-white/10 hover:border-primary/40 transition-all duration-300 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/20 text-primary group-hover:bg-primary/30 transition-colors">
                      {feature.icon}
                    </div>
                    <h4 className="font-semibold text-white text-sm">{feature.title}</h4>
                  </div>
                  <p className="text-xs text-white/70 leading-relaxed pl-11">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </BentoCard>
  );
}