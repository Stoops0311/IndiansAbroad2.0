"use client";

import { BentoCard } from "@/components/ui/bento";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Phone, ArrowRight, Rocket } from "lucide-react";

export default function FinalCTA() {
  return (
    <BentoCard className="col-span-full p-6 md:p-8 lg:p-12 xl:p-16 bg-gradient-to-br from-primary/20 to-accent/10 dark:from-primary/30 dark:to-accent/20 min-h-[350px] md:min-h-[400px]">
      <div className="text-center max-w-4xl mx-auto space-y-6 md:space-y-8">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="p-4 rounded-full bg-primary/20 backdrop-blur">
            <Rocket className="h-8 w-8 text-primary" />
          </div>
        </div>
        
        {/* Main Headline */}
        <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground leading-tight">
          Your Dream Life Abroad Is Just One Call Away
        </h2>
        
        {/* Subheadline */}
        <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
          Let our experts guide your next step toward a stable, successful life overseas.
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center">
          <Button 
            size="lg" 
            className="text-base md:text-lg px-6 md:px-8 py-4 md:py-6 shadow-lg hover:shadow-primary/20 transition-all group w-full sm:w-auto sm:min-w-[200px] md:min-w-[240px]"
          >
            <CheckCircle2 className="mr-2 md:mr-3 h-4 md:h-5 w-4 md:w-5" />
            Check Your Eligibility
            <ArrowRight className="ml-2 md:ml-3 h-3 md:h-4 w-3 md:w-4 transition-transform group-hover:translate-x-1" />
          </Button>
          
          <Button 
            size="lg" 
            variant="outline" 
            className="text-base md:text-lg px-6 md:px-8 py-4 md:py-6 border-primary/20 hover:border-primary/40 hover:bg-primary/10 transition-all group w-full sm:w-auto sm:min-w-[200px] md:min-w-[240px]"
            asChild
          >
            <a href="tel:+918454073913">
              <Phone className="mr-2 md:mr-3 h-4 md:h-5 w-4 md:w-5 text-green-400" />
              Talk to an Expert Today
            </a>
          </Button>
        </div>
        
        {/* Trust Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-border">
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground mb-1">5000+</div>
            <div className="text-sm text-muted-foreground">Success Stories</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground mb-1">98%</div>
            <div className="text-sm text-muted-foreground">Success Rate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground mb-1">15+</div>
            <div className="text-sm text-muted-foreground">Years Experience</div>
          </div>
        </div>
      </div>
    </BentoCard>
  );
}