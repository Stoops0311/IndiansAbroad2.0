"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, ArrowRight, ImageIcon, Play } from "lucide-react";
import Link from "next/link";
import { type ServiceData } from "@/lib/services-data";

interface ServiceDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: ServiceData;
}

export default function ServiceDetailModal({ isOpen, onClose, service }: ServiceDetailModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex-1">
              <DialogTitle className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                {service.title}
              </DialogTitle>
              {service.price && (
                <div className="flex items-center gap-4">
                  <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/40 text-lg px-3 py-1">
                    {service.price}
                  </Badge>
                </div>
              )}
            </div>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 pt-0">
          {/* Left Column - Content */}
          <div className="space-y-6">
            {/* Service GIF */}
            <div className="relative aspect-video bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl border border-primary/20 overflow-hidden">
              <img
                src={`/services/${service.id}.gif`}
                alt={service.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback to placeholder if GIF doesn't exist
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.innerHTML = `
                      <div class="flex items-center justify-center h-full">
                        <div class="text-center">
                          <div class="p-4 rounded-full bg-primary/20 mb-4 mx-auto w-fit">
                            <svg class="h-8 w-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                            </svg>
                          </div>
                          <p class="text-muted-foreground text-sm">Video Coming Soon</p>
                        </div>
                      </div>
                    `;
                  }
                }}
              />
            </div>

            {/* Description */}
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Service Overview</h3>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                {service.detailedContent?.description.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-sm md:text-base">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Offering */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-4">What's Included</h3>
              <div className="space-y-3">
                {service.detailedContent?.offering.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-foreground/90 text-sm md:text-base leading-relaxed">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing and CTA */}
            <div className="p-6 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
              {service.price && (
                <div className="text-center mb-4">
                  <p className="text-muted-foreground text-sm mb-2">Starting at</p>
                  <p className="text-3xl font-bold text-primary">{service.price}</p>
                </div>
              )}
              
              <Button 
                asChild 
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 text-base shadow-lg hover:shadow-primary/20 transition-all group"
              >
                <Link href={`/contact?service=${service.id}`}>
                  {service.ctaText}
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              
              <p className="text-muted-foreground/80 text-xs text-center mt-3">
                Free consultation • No hidden fees • Expert guidance
              </p>
            </div>

            {/* Additional Info */}
            <div className="p-4 rounded-lg bg-foreground/5 border border-foreground/10">
              <h4 className="font-semibold text-foreground mb-2">Why Choose Us?</h4>
              <ul className="text-muted-foreground text-sm space-y-1">
                <li>• 10+ years of immigration expertise</li>
                <li>• 95% success rate</li>
                <li>• End-to-end support</li>
                <li>• Transparent pricing</li>
              </ul>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}