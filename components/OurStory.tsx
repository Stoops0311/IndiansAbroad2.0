"use client";

import { BentoCard, BentoIcon, BentoTitle, BentoDescription } from "@/components/ui/bento";
import { Card } from "@/components/ui/card";
import { Heart, Users, Award, TrendingUp } from "lucide-react";

export default function OurStory() {
  const milestones = [
    {
      year: "2008",
      title: "The Beginning",
      description: "Started in a single room with one goal",
      icon: <Heart className="h-4 w-4" />
    },
    {
      year: "2015",
      title: "First 1000",
      description: "Helped our first 1000 clients succeed",
      icon: <Users className="h-4 w-4" />
    },
    {
      year: "2020",
      title: "Recognition",
      description: "Became a trusted name across India",
      icon: <Award className="h-4 w-4" />
    },
    {
      year: "2024",
      title: "4000+ Success Stories",
      description: "Continuing to change lives daily",
      icon: <TrendingUp className="h-4 w-4" />
    }
  ];

  return (
    <BentoCard className="lg:col-span-3 p-4 md:p-6 lg:p-8 min-h-[500px] md:min-h-[550px]">
      <div className="h-full flex flex-col">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <BentoIcon>
              <Heart className="h-6 w-6 text-primary" />
            </BentoIcon>
          </div>
          
          <BentoTitle className="text-xl md:text-2xl lg:text-3xl mb-4">
            Our Story
          </BentoTitle>
          
          <BentoDescription className="text-base md:text-lg text-foreground/90 leading-relaxed mb-8">
            We started with one goal — to help ordinary Indians build extraordinary lives abroad. 
            What began as a small initiative in a single room has now become a trusted name for 
            <span className="text-primary font-semibold"> 2000+ professionals</span> who successfully 
            moved to Canada, Germany, the UK, and Australia.
          </BentoDescription>
          
          <BentoDescription className="text-base md:text-lg text-foreground/80 leading-relaxed">
            Every visa is approved. Every client settled. Every happy story — is proof that we don't 
            just process files, <span className="text-foreground font-medium">we change lives</span>.
          </BentoDescription>
        </div>
        
        {/* Timeline */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground mb-6">Our Journey So Far</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {milestones.map((milestone, index) => (
              <Card 
                key={index}
                className="p-4 bg-foreground/5 border-primary/20 hover:bg-foreground/10 hover:border-primary/40 transition-all duration-300 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/20 text-primary group-hover:bg-primary/30 transition-colors">
                      {milestone.icon}
                    </div>
                    <span className="text-primary font-bold text-lg">{milestone.year}</span>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-foreground text-sm mb-1">{milestone.title}</h4>
                    <p className="text-xs text-foreground/70 leading-relaxed">{milestone.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Story Image Placeholder */}
        <div className="mt-8">
          <div className="w-full h-32 md:h-40 bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl border border-primary/20 flex items-center justify-center">
            <div className="text-center text-foreground/60">
              <div className="text-sm font-medium">Story Image Placeholder</div>
              <div className="text-xs mt-1">Team photo or office image</div>
            </div>
          </div>
        </div>
      </div>
    </BentoCard>
  );
}