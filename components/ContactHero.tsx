"use client";

import { Phone } from "lucide-react";

export default function ContactHero() {
  return (
    <section className="w-full px-4 md:px-8 lg:px-12 py-6">
      <div className="text-center max-w-4xl mx-auto">
        <div className="flex items-center justify-center mb-4">
          <div className="relative p-4 rounded-full bg-primary/20 backdrop-blur border border-primary/30">
            <Phone className="h-8 w-8 text-primary" />
            {/* Pulse rings */}
            <div className="absolute inset-0 rounded-full border border-primary/20 animate-pulse"></div>
            <div className="absolute inset-[-4px] rounded-full border border-primary/10 animate-pulse" style={{animationDelay: '0.5s'}}></div>
          </div>
        </div>
        
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
          Contact Us + Free Eligibility Check
        </h1>
        
        <p className="text-base md:text-lg text-white/80 max-w-3xl mx-auto">
          Ready to start your abroad journey? Get in touch with our experts or check your eligibility for free.
        </p>
      </div>
    </section>
  );
}