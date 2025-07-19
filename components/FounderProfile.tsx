"use client";

import { BentoCard, BentoIcon, BentoTitle, BentoDescription } from "@/components/ui/bento";
import { Quote, User, Award, Briefcase } from "lucide-react";
import { useState } from "react";

export default function FounderProfile() {
  const [showFullStory, setShowFullStory] = useState(false);

  return (
    <BentoCard className="lg:col-span-2 p-4 md:p-6 lg:p-8 min-h-[400px] md:min-h-[450px]">
      <div className="h-full flex flex-col">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <BentoIcon>
              <User className="h-6 w-6 text-primary" />
            </BentoIcon>
          </div>
          
          <BentoTitle className="text-xl md:text-2xl lg:text-3xl mb-2">
            Meet The Founder
          </BentoTitle>
        </div>
        
        <div className="flex-1 grid md:grid-cols-2 gap-6">
          {/* Founder Image Placeholder */}
          <div className="space-y-4">
            <div className="w-full aspect-square max-w-[250px] mx-auto bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl border border-primary/20 flex items-center justify-center">
              <div className="text-center text-white/60">
                <User className="h-12 w-12 mx-auto mb-2 text-primary/60" />
                <div className="text-sm font-medium">Founder Photo</div>
                <div className="text-xs mt-1">Professional headshot</div>
              </div>
            </div>
            
            {/* Founder Details */}
            <div className="text-center space-y-2">
              <h3 className="text-lg font-bold text-white">[Founder Name]</h3>
              <p className="text-sm text-white/70">Founder & CEO</p>
              
              <div className="flex justify-center gap-4 pt-2">
                <div className="flex items-center gap-2 text-xs text-white/60">
                  <Award className="h-3 w-3 text-primary" />
                  <span>15+ Years Experience</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-white/60">
                  <Briefcase className="h-3 w-3 text-primary" />
                  <span>Immigration Expert</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Founder Quote & Story */}
          <div className="space-y-4">
            <div className="p-4 bg-white/5 rounded-xl border border-primary/20">
              <Quote className="h-6 w-6 text-primary mb-3" />
              <blockquote className="text-sm md:text-base text-white/90 italic leading-relaxed">
                "As someone who struggled through confusing visa processes myself, I know how frustrating it can be. 
                That's why I built this company — to help others avoid those same mistakes and succeed faster."
              </blockquote>
              <cite className="text-xs text-white/70 mt-3 block">— [Founder Name], Founder</cite>
            </div>
            
            {/* Expandable Story */}
            <div className="space-y-3">
              <BentoDescription className="text-sm text-white/80 leading-relaxed">
                Our founder's personal journey through the complex immigration process sparked the creation of Indians Abroad. 
                Having experienced the challenges firsthand, they understood the need for genuine, transparent guidance.
              </BentoDescription>
              
              {showFullStory && (
                <BentoDescription className="text-sm text-white/80 leading-relaxed">
                  Starting with just a vision to help fellow Indians achieve their dreams abroad, our founder has built 
                  a company that prioritizes client success over profit. Today, Indians Abroad stands as a testament to 
                  the power of ethical business practices and genuine care for each client's journey.
                </BentoDescription>
              )}
              
              <button
                onClick={() => setShowFullStory(!showFullStory)}
                className="text-primary text-sm hover:text-primary/80 transition-colors font-medium"
              >
                {showFullStory ? 'Read Less' : 'Read Full Story →'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </BentoCard>
  );
}