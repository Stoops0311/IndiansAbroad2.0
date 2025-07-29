"use client";

import { BentoCard } from "@/components/ui/bento";
import { Button } from "@/components/ui/button";
import { Rocket, ArrowRight, Phone, MessageCircle, Mail } from "lucide-react";

export default function ContactCTA() {
  return (
    <BentoCard className="col-span-full p-6 md:p-8 lg:p-12 bg-gradient-to-br from-primary/30 to-accent/20 min-h-[300px] md:min-h-[350px] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 right-10 w-24 h-24 border border-border/20 rounded-full"></div>
        <div className="absolute bottom-20 left-20 w-16 h-16 border border-border/20 rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-8 h-8 border border-border/20 rounded-full"></div>
      </div>
      
      <div className="relative z-10 text-center max-w-4xl mx-auto space-y-6 md:space-y-8">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="p-4 rounded-full bg-primary/20 backdrop-blur relative">
            <Rocket className="h-8 w-8 text-primary" />
            <div className="absolute inset-0 rounded-full border border-primary/20 animate-pulse"></div>
          </div>
        </div>
        
        {/* Main Headline */}
        <div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground leading-tight mb-4">
            Your dream job or PR abroad is one step away
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground">
            Don't wait any longer. Take the first step towards your international career today.
          </p>
        </div>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center">
          <Button 
            size="lg" 
            className="text-base md:text-lg px-6 md:px-8 py-4 md:py-6 shadow-lg hover:shadow-primary/20 transition-all group w-full sm:w-auto sm:min-w-[200px]"
          >
            Get Started Today
            <ArrowRight className="ml-2 md:ml-3 h-4 md:h-5 w-4 md:w-5 transition-transform group-hover:translate-x-1" />
          </Button>
          
          <Button 
            size="lg" 
            variant="outline" 
            className="text-base md:text-lg px-6 md:px-8 py-4 md:py-6 border-primary/20 hover:border-primary/40 hover:bg-primary/10 transition-all group w-full sm:w-auto sm:min-w-[200px]"
            asChild
          >
            <a href="https://wa.me/919825574590?text=Hi, I want to get started with my abroad journey">
              <MessageCircle className="mr-2 md:mr-3 h-4 md:h-5 w-4 md:w-5 text-green-400" />
              WhatsApp Us Now
            </a>
          </Button>
        </div>
        
        {/* Contact Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-border">
          <a 
            href="tel:+919825574590"
            className="flex items-center justify-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-all group"
          >
            <Phone className="h-4 w-4 text-primary" />
            <span className="text-sm text-foreground/90 group-hover:text-foreground">Call Now</span>
          </a>
          
          <a 
            href="https://wa.me/919825574590"
            className="flex items-center justify-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-all group"
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle className="h-4 w-4 text-green-400" />
            <span className="text-sm text-foreground/90 group-hover:text-foreground">WhatsApp</span>
          </a>
          
          <a 
            href="mailto:contact@indiansabroad.com"
            className="flex items-center justify-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-all group"
          >
            <Mail className="h-4 w-4 text-primary" />
            <span className="text-sm text-foreground/90 group-hover:text-foreground">Email Us</span>
          </a>
        </div>
        
        {/* Final Trust Message */}
        <div className="pt-4">
          <p className="text-sm text-muted-foreground">
            Join 4000+ successful professionals who achieved their abroad dreams with our guidance
          </p>
        </div>
      </div>
    </BentoCard>
  );
}