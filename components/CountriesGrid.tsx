"use client";

import { BentoCard, BentoIcon, BentoTitle, BentoDescription } from "@/components/ui/bento";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Globe, ArrowRight, Star } from "lucide-react";
import Link from "next/link";

const countries = [
  {
    id: 1,
    name: "Canada",
    flag: "🇨🇦",
    benefits: "PR + High Paying Jobs",
    features: ["Express Entry", "Provincial Nominee", "High Salaries", "Quality Life"],
    color: "from-red-500/60 to-red-600/60 dark:from-red-500/20 dark:to-red-600/20"
  },
  {
    id: 2,
    name: "Germany",
    flag: "🇩🇪",
    benefits: "No IELTS, High Demand",
    features: ["Tech Hub", "No Language Barrier", "EU Access", "Strong Economy"],
    color: "from-yellow-500/60 to-yellow-600/60 dark:from-yellow-500/20 dark:to-yellow-600/20"
  },
  {
    id: 3,
    name: "UK",
    flag: "🇬🇧",
    benefits: "Work Visa + Family Support",
    features: ["Skilled Worker", "Family Visa", "English Speaking", "Global Hub"],
    color: "from-blue-500/60 to-blue-600/60 dark:from-blue-500/20 dark:to-blue-600/20"
  },
  {
    id: 4,
    name: "Australia",
    flag: "🇦🇺",
    benefits: "Fast PR Processing",
    features: ["Points System", "Regional Options", "Beach Life", "Mining Jobs"],
    color: "from-green-500/60 to-green-600/60 dark:from-green-500/20 dark:to-green-600/20"
  }
];

export default function CountriesGrid() {
  return (
    <BentoCard className="lg:col-span-3 p-4 md:p-6 lg:p-8 min-h-[450px] md:min-h-[500px]">
      <div className="h-full flex flex-col">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <BentoIcon>
              <Globe className="h-6 w-6 text-primary" />
            </BentoIcon>
            <span className="text-2xl">🌍</span>
          </div>
          
          <BentoTitle className="text-xl md:text-2xl lg:text-3xl mb-2">
            Countries We Help You Settle In
          </BentoTitle>
          
          <BentoDescription>
            Choose your destination and start your journey today
          </BentoDescription>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 flex-1">
          {countries.map((country) => (
            <Card 
              key={country.id}
              className={`p-4 bg-gradient-to-br ${country.color} border-primary/20 hover:border-primary/40 hover:scale-[1.02] transition-all duration-300 group cursor-pointer h-full`}
            >
              <div className="space-y-4 h-full flex flex-col">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{country.flag}</div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-foreground text-base leading-tight">
                      {country.name}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-tight">
                      {country.benefits}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-1.5 flex-1">
                  {country.features.slice(0, 3).map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Star className="h-3 w-3 text-primary flex-shrink-0" />
                      <span className="text-xs text-muted-foreground leading-tight">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
                
                <Link href="/services" className="w-full">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="w-full text-xs border-primary/30 hover:border-primary/50 hover:bg-primary/10 transition-all"
                  >
                    Learn More
                    <ArrowRight className="ml-2 h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="mt-6 text-center">
          <Link href="/services">
            <Button className="text-sm px-6">
              View All Countries
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </BentoCard>
  );
}