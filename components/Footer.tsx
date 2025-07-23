"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Home, Instagram, ExternalLink, FileText } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full px-4 md:px-8 lg:px-12 py-8">
      <Card className="p-8 md:p-12 bg-gradient-to-br from-card via-background to-primary/5 border-primary/20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xl font-bold text-foreground mb-4">
              Indians Abroad
            </h3>
            <p className="text-muted-foreground max-w-md">
              Your trusted partner for working and settling abroad. We provide end-to-end support for job visas, PR, and permanent settlement worldwide.
            </p>
          </div>
          
          {/* Contact Information */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground mb-4">
              Contact Info
            </h4>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                <div>
                  <span className="text-2xl mr-2">📍</span>
                  <span className="text-sm text-muted-foreground">
                    18th Floor Cyber One Business Park, Sector 30A, Vashi, Navi Mumbai, Maharashtra 400705
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                <div>
                  <span className="text-xl mr-2">📞</span>
                  <a 
                    href="tel:+919825574590" 
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    +91 (982) 557-4590
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                <div>
                  <span className="text-xl mr-2">📧</span>
                  <a 
                    href="mailto:contact@indiansabroad.com" 
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    contact@indiansabroad.com
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Links & Social */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground mb-4">
              Quick Links
            </h4>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Home className="h-4 w-4 text-primary" />
                <span className="text-xl mr-2">🔗</span>
                <a 
                  href="/" 
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Home
                </a>
              </div>
              
              <div className="flex items-center gap-3">
                <Instagram className="h-4 w-4 text-primary" />
                <span className="text-xl mr-2">🔗</span>
                <a 
                  href="https://www.instagram.com/indians__abroad/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                >
                  Follow us on Instagram
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
              
              <div className="flex items-center gap-3">
                <FileText className="h-4 w-4 text-primary" />
                <span className="text-xl mr-2">📄</span>
                <Link 
                  href="/terms"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Terms & Conditions
                </Link>
              </div>
            </div>
            
            <div className="pt-4">
              <Button 
                variant="outline" 
                size="sm"
                className="border-primary/30 hover:border-primary/50 hover:bg-primary/10"
                asChild
              >
                <a href="https://wa.me/919825574590" target="_blank" rel="noopener noreferrer">
                  Chat on WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Legal Information Box */}
        <div className="mt-8 pt-6 border-t border-border">
          <div className="bg-foreground/10 backdrop-blur-sm border border-border rounded-xl p-6 max-w-4xl mx-auto">
            <div className="space-y-4">
              {/* Product and Partnership Info */}
              <div className="text-center">
                <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 text-sm text-foreground mb-4">
                  <span className="font-medium">Product of Myst Education</span>
                  <span className="hidden md:inline text-muted-foreground">|</span>
                  <span className="font-medium">Partnered with</span>
                </div>
                
                {/* Partner Logos with Labels */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8">
                  <div className="flex flex-col items-center gap-2">
                    <img 
                      src="/MARA.png" 
                      alt="MARA - Migration Agents Registration Authority" 
                      className="h-12 w-auto filter brightness-110 contrast-110"
                    />
                    <span className="text-xs text-muted-foreground text-center max-w-[140px] leading-tight">
                      MARA - Migration Agents Registration Authority
                    </span>
                  </div>
                  
                  <div className="hidden sm:block text-muted-foreground text-lg">|</div>
                  
                  <div className="flex flex-col items-center gap-2">
                    <img 
                      src="/RCIC.png" 
                      alt="RCIC - Regulated Canadian Immigration Consultant" 
                      className="h-12 w-auto filter brightness-110 contrast-110"
                    />
                    <span className="text-xs text-muted-foreground text-center max-w-[140px] leading-tight">
                      RCIC - Regulated Canadian Immigration Consultant
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Copyright */}
              <div className="text-center pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground font-medium">
                  All Rights Reserved. © 2018 Indians Abroad
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </footer>
  );
}