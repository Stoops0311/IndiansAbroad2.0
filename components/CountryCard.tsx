"use client";

import { BentoCard } from "@/components/ui/bento";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { 
  ArrowRight, 
  CheckCircle2, 
  DollarSign, 
  Clock, 
  TrendingUp,
  Star,
  User,
  Building,
  Quote
} from "lucide-react";
import { useState } from "react";

interface Country {
  id: string;
  name: string;
  flag: string;
  colors: {
    primary: string;
    accent: string;
    text: string;
  };
  stats: {
    averageSalary: string;
    processingTime: string;
    successRate: string;
    clientsPlaced: string;
  };
  whyChoose: string[];
  services: string[];
  ctaText: string;
  testimonial: {
    name: string;
    role: string;
    company: string;
    quote: string;
  };
}

interface CountryCardProps {
  country: Country;
}

export default function CountryCard({ country }: CountryCardProps) {
  const [showTestimonial, setShowTestimonial] = useState(false);

  return (
    <BentoCard className={`p-6 md:p-8 min-h-[600px] bg-gradient-to-br ${country.colors.primary} ${country.colors.accent} hover:scale-[1.02] transition-all duration-500 group relative overflow-hidden`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 right-10 w-20 h-20 border border-white rounded-full"></div>
        <div className="absolute bottom-20 left-20 w-16 h-16 border border-white rounded-full"></div>
      </div>
      
      <div className="relative z-10 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="text-4xl animate-pulse">{country.flag}</div>
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-white">{country.name}</h3>
              <Badge variant="secondary" className="mt-1 bg-white/10 text-white/80 border-white/20">
                {country.stats.clientsPlaced} placed
              </Badge>
            </div>
          </div>
          <div className={`p-2 rounded-lg bg-white/10 ${country.colors.text}`}>
            <TrendingUp className="h-5 w-5" />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="p-3 rounded-lg bg-white/5 border border-white/10">
            <div className="flex items-center gap-2 mb-1">
              <DollarSign className="h-4 w-4 text-green-400" />
              <span className="text-xs text-white/70">Avg Salary</span>
            </div>
            <div className="text-sm font-semibold text-white">{country.stats.averageSalary}</div>
          </div>
          
          <div className="p-3 rounded-lg bg-white/5 border border-white/10">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="h-4 w-4 text-blue-400" />
              <span className="text-xs text-white/70">Processing</span>
            </div>
            <div className="text-sm font-semibold text-white">{country.stats.processingTime}</div>
          </div>
          
          <div className="p-3 rounded-lg bg-white/5 border border-white/10">
            <div className="flex items-center gap-2 mb-1">
              <Star className="h-4 w-4 text-yellow-400" />
              <span className="text-xs text-white/70">Success Rate</span>
            </div>
            <div className="text-sm font-semibold text-white">{country.stats.successRate}</div>
          </div>
          
          <div className="p-3 rounded-lg bg-white/5 border border-white/10">
            <div className="flex items-center gap-2 mb-1">
              <User className="h-4 w-4 text-purple-400" />
              <span className="text-xs text-white/70">Clients</span>
            </div>
            <div className="text-sm font-semibold text-white">{country.stats.clientsPlaced}</div>
          </div>
        </div>

        {/* Why Choose Section */}
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-white mb-3">Why Choose {country.name}?</h4>
          <div className="space-y-2">
            {country.whyChoose.map((reason, index) => (
              <div key={index} className="flex items-center gap-3">
                <CheckCircle2 className="h-4 w-4 text-green-400 flex-shrink-0" />
                <span className="text-sm text-white/90">{reason}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Services Section */}
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-white mb-3">We Help With:</h4>
          <div className="flex flex-wrap gap-2">
            {country.services.map((service, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="text-xs bg-white/10 border-white/20 text-white/90 hover:bg-white/20 transition-colors"
              >
                {service}
              </Badge>
            ))}
          </div>
        </div>

        {/* Testimonial Toggle */}
        <div className="mb-6">
          <button
            onClick={() => setShowTestimonial(!showTestimonial)}
            className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors"
          >
            <Quote className="h-4 w-4" />
            {showTestimonial ? 'Hide' : 'Show'} Success Story
            <ArrowRight className={`h-3 w-3 transition-transform ${showTestimonial ? 'rotate-90' : ''}`} />
          </button>
          
          {showTestimonial && (
            <div className="mt-3 p-4 rounded-lg bg-white/5 border border-white/10">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{country.testimonial.name}</div>
                  <div className="text-xs text-white/70 flex items-center gap-1">
                    <Building className="h-3 w-3" />
                    {country.testimonial.role} at {country.testimonial.company}
                  </div>
                </div>
              </div>
              <blockquote className="text-sm text-white/90 italic">
                "{country.testimonial.quote}"
              </blockquote>
            </div>
          )}
        </div>

        {/* CTA Section */}
        <div className="mt-auto space-y-3">
          <Button 
            asChild
            className="w-full shadow-lg hover:shadow-primary/20 transition-all group bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary"
          >
            <Link href={`/contact?service=${country.id}&country=${country.name}`}>
              {country.ctaText}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          
          <Button 
            variant="outline"
            size="sm"
            className="w-full border-white/20 text-white/90 hover:bg-white/10 hover:border-white/40 transition-all"
          >
            Download {country.name} Guide
          </Button>
        </div>
      </div>
    </BentoCard>
  );
}