"use client";

import { Globe, TrendingUp, Users, MapPin } from "lucide-react";
import { useState, useEffect } from "react";

export default function DestinationsHero() {
  const [animatedCounts, setAnimatedCounts] = useState({
    professionals: 0,
    countries: 0,
    successRate: 0
  });

  const targetCounts = {
    professionals: 4000,
    countries: 25, 
    successRate: 94
  };

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60; // 60 steps for smooth animation
    const interval = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      
      setAnimatedCounts({
        professionals: Math.floor(targetCounts.professionals * progress),
        countries: Math.floor(targetCounts.countries * progress),
        successRate: Math.floor(targetCounts.successRate * progress)
      });

      if (step >= steps) {
        clearInterval(timer);
        setAnimatedCounts(targetCounts);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const flags = ["🇨🇦", "🇩🇪", "🇬🇧", "🇦🇺", "🇳🇿"];

  return (
    <section className="w-full px-4 md:px-8 lg:px-12 py-8 md:py-12">
      <div className="text-center max-w-6xl mx-auto">
        {/* Animated Globe Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative p-4 rounded-full bg-primary/20 backdrop-blur border border-primary/30">
            <Globe className="h-10 w-10 text-primary" />
            {/* Orbital rings with flags */}
            <div className="absolute inset-0 rounded-full border border-primary/20 animate-pulse"></div>
            <div className="absolute inset-[-8px] rounded-full border border-primary/10 animate-pulse" style={{animationDelay: '0.5s'}}></div>
            <div className="absolute inset-[-16px] rounded-full border border-primary/5 animate-pulse" style={{animationDelay: '1s'}}></div>
            
            {/* Floating Flags */}
            {flags.map((flag, index) => (
              <div
                key={index}
                className="absolute animate-pulse"
                style={{
                  top: `${25 + Math.cos((index * 72 * Math.PI) / 180) * 40}px`,
                  left: `${25 + Math.sin((index * 72 * Math.PI) / 180) * 40}px`,
                  animationDelay: `${index * 0.2}s`,
                  fontSize: '20px'
                }}
              >
                {flag}
              </div>
            ))}
          </div>
        </div>
        
        {/* Main Title */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
          🌐 Work & Settle in These Top Countries
        </h1>
        
        <p className="text-lg md:text-xl text-white/80 max-w-4xl mx-auto mb-10">
          Explore global opportunities in countries where your skills are in demand. 
          Join thousands who've built successful careers abroad.
        </p>

        {/* Success Metrics Banner */}
        <div className="bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl p-6 md:p-8 border border-primary/20 backdrop-blur-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="text-center group">
              <div className="flex justify-center mb-3">
                <div className="p-3 rounded-xl bg-primary/20 group-hover:bg-primary/30 transition-colors">
                  <Users className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                {animatedCounts.professionals.toLocaleString()}+
              </div>
              <div className="text-sm md:text-base text-white/70">
                Professionals Relocated
              </div>
            </div>
            
            <div className="text-center group">
              <div className="flex justify-center mb-3">
                <div className="p-3 rounded-xl bg-primary/20 group-hover:bg-primary/30 transition-colors">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                {animatedCounts.countries}+
              </div>
              <div className="text-sm md:text-base text-white/70">
                Countries & Growing
              </div>
            </div>
            
            <div className="text-center group">
              <div className="flex justify-center mb-3">
                <div className="p-3 rounded-xl bg-primary/20 group-hover:bg-primary/30 transition-colors">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                {animatedCounts.successRate}%
              </div>
              <div className="text-sm md:text-base text-white/70">
                Average Success Rate
              </div>
            </div>
          </div>
          
          {/* Personal Touch */}
          <div className="mt-6 pt-6 border-t border-white/10">
            <p className="text-sm md:text-base text-white/80 italic">
              "Find your perfect country match based on your skills, experience, and lifestyle preferences"
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}