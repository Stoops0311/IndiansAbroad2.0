"use client";

import { Globe } from "lucide-react";

export default function ServicesHero() {
  return (
    <section className="w-full px-4 md:px-8 lg:px-12 py-6">
      <div className="text-center max-w-4xl mx-auto">
        <div className="flex items-center justify-center mb-4">
          <div className="relative p-4 rounded-full bg-primary/20 backdrop-blur border border-primary/30">
            <Globe className="h-8 w-8 text-primary" />
            {/* Orbital rings */}
            <div className="absolute inset-0 rounded-full border border-primary/20 animate-pulse"></div>
            <div className="absolute inset-[-4px] rounded-full border border-primary/10 animate-pulse" style={{animationDelay: '0.5s'}}></div>
            <div className="absolute inset-[-8px] rounded-full border border-primary/5 animate-pulse" style={{animationDelay: '1s'}}></div>
          </div>
        </div>
        
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
          Our Services – From India to International, We Handle It All
        </h1>
        
        <p className="text-base md:text-lg text-white/80 max-w-3xl mx-auto">
          Whether you want to work, settle, or secure PR abroad — we simplify the entire process from start to finish.
        </p>
      </div>
    </section>
  );
}