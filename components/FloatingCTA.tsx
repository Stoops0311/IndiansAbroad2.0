"use client";

import { Button } from "@/components/ui/button";
import { 
  MessageCircle, 
  X, 
  Target, 
  ArrowRight,
  HelpCircle,
  Phone
} from "lucide-react";
import { useState, useEffect } from "react";

export default function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000); // Show after 3 seconds

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  const handleWhatsAppClick = () => {
    const message = "Hi! I'm exploring work opportunities abroad and would like help choosing the right country for my profile. Can you help me get started?";
    const whatsappUrl = `https://wa.me/918454073913?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleCallClick = () => {
    window.location.href = "tel:+918454073913";
  };

  return (
    <>
      {/* Mobile Floating Widget */}
      <div className="md:hidden fixed bottom-4 left-4 right-4 z-50">
        {!isExpanded ? (
          <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-4 shadow-2xl border border-primary/30 backdrop-blur-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-white/20">
                  <HelpCircle className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">Confused which country?</div>
                  <div className="text-xs text-white/80">Get personalized suggestions</div>
                </div>
              </div>
              <Button
                size="sm"
                onClick={() => setIsExpanded(true)}
                className="bg-white/20 hover:bg-white/30 text-white border-white/30"
              >
                Help Me
              </Button>
            </div>
          </div>
        ) : (
          <div className="bg-gradient-to-br from-primary/95 to-primary/80 rounded-2xl p-6 shadow-2xl border border-primary/30 backdrop-blur-lg">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-bold text-white">Get Country Suggestions</h3>
              <button
                onClick={() => setIsExpanded(false)}
                className="p-1 rounded-full hover:bg-white/20 transition-colors"
              >
                <X className="h-4 w-4 text-white" />
              </button>
            </div>
            
            <p className="text-sm text-white/90 mb-4">
              Not sure which country suits your profile? Our experts will help you choose the best destination based on your skills and goals.
            </p>
            
            <div className="space-y-3">
              <Button
                onClick={handleWhatsAppClick}
                className="w-full bg-green-600 hover:bg-green-700 text-white shadow-lg"
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                WhatsApp Free Consultation
              </Button>
              
              <Button
                onClick={handleCallClick}
                variant="outline"
                className="w-full border-white/30 text-white hover:bg-white/10"
              >
                <Phone className="mr-2 h-4 w-4" />
                Call Now: +91 845 407 3913
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Desktop Floating Widget */}
      <div className="hidden md:block fixed bottom-8 right-8 z-50">
        {!isExpanded ? (
          <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-4 shadow-2xl border border-primary/30 backdrop-blur-lg max-w-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-full bg-white/20 animate-pulse">
                <Target className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-sm font-semibold text-white">Confused which country is right for you?</div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={() => setIsExpanded(true)}
                className="bg-white/20 hover:bg-white/30 text-white border-white/30 flex-1"
              >
                Get Free Suggestion
                <ArrowRight className="ml-2 h-3 w-3" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsVisible(false)}
                className="text-white/70 hover:text-white hover:bg-white/10 p-2"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="bg-gradient-to-br from-primary/95 to-primary/80 rounded-2xl p-6 shadow-2xl border border-primary/30 backdrop-blur-lg max-w-md">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Get Personalized Country Suggestions</h3>
                <p className="text-sm text-white/80">Free consultation with our experts</p>
              </div>
              <button
                onClick={() => setIsExpanded(false)}
                className="p-1 rounded-full hover:bg-white/20 transition-colors"
              >
                <X className="h-4 w-4 text-white" />
              </button>
            </div>
            
            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2 text-sm text-white/90">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Based on your skills & experience</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/90">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Current job market analysis</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/90">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Visa requirements & timeline</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <Button
                onClick={handleWhatsAppClick}
                className="w-full bg-green-600 hover:bg-green-700 text-white shadow-lg"
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                Start WhatsApp Chat
              </Button>
              
              <div className="grid grid-cols-2 gap-2">
                <Button
                  onClick={handleCallClick}
                  variant="outline"
                  size="sm"
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  <Phone className="mr-1 h-3 w-3" />
                  Call Now
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  className="border-white/30 text-white hover:bg-white/10"
                  asChild
                >
                  <a href="/contact">
                    <Target className="mr-1 h-3 w-3" />
                    Free Check
                  </a>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}