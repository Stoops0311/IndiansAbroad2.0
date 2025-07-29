"use client";

import { BentoCard } from "@/components/ui/bento";
import { Button } from "@/components/ui/button";
import { Target, ArrowRight, CheckCircle2 } from "lucide-react";

export default function ProfileEvaluationCTA() {
  return (
    <BentoCard className="col-span-full p-6 md:p-8 lg:p-12 bg-gradient-to-br from-primary/20 to-accent/10 dark:from-primary/30 dark:to-accent/20 min-h-[300px] md:min-h-[350px]">
      <div className="text-center max-w-3xl mx-auto space-y-6 md:space-y-8">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="p-4 rounded-full bg-primary/20 backdrop-blur">
            <Target className="h-8 w-8 text-primary" />
          </div>
        </div>
        
        {/* Main Headline */}
        <div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground leading-tight mb-4">
            Free Profile Evaluation
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground">
            Not sure which visa or country suits your profile?
          </p>
        </div>
        
        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
          <div className="flex items-center justify-center gap-2 text-sm text-foreground">
            <CheckCircle2 className="h-4 w-4 text-green-400" />
            <span>Completely Free</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-sm text-foreground">
            <CheckCircle2 className="h-4 w-4 text-green-400" />
            <span>Expert Assessment</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-sm text-foreground">
            <CheckCircle2 className="h-4 w-4 text-green-400" />
            <span>Personalized Recommendations</span>
          </div>
        </div>
        
        {/* CTA Button */}
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center">
          <Button 
            size="lg" 
            className="text-base md:text-lg px-6 md:px-8 py-4 md:py-6 shadow-lg hover:shadow-primary/20 transition-all group w-full sm:w-auto sm:min-w-[250px]"
          >
            Get Free Profile Evaluation
            <ArrowRight className="ml-2 md:ml-3 h-4 md:h-5 w-4 md:w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
        
        {/* Trust Indicator */}
        <div className="pt-6 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Join 4000+ professionals who found their perfect abroad pathway with our guidance
          </p>
        </div>
      </div>
    </BentoCard>
  );
}