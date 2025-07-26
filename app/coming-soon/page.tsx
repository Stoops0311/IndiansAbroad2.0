"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Clock, Rocket, Bell } from "lucide-react";
import Link from "next/link";
import { useTheme } from "@/contexts/ThemeContext";

export default function ComingSoonPage() {
  const { resolvedTheme } = useTheme();

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background: resolvedTheme === 'dark' 
          ? 'linear-gradient(to bottom, #000000 0%, oklch(0.48 0.11 305) 100%)'
          : 'linear-gradient(to bottom, #ffffff 0%, oklch(0.39 0.09 305) 100%)'
      }}
    >
      <div className="w-full max-w-2xl">
        {/* Back to Home Button */}
        <Link 
          href="/" 
          className={`inline-flex items-center gap-2 mb-8 transition-colors ${
            resolvedTheme === 'dark' 
              ? 'text-white/80 hover:text-white' 
              : 'text-black/80 hover:text-black'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <Card className={`backdrop-blur-lg ${
          resolvedTheme === 'dark' 
            ? 'bg-white/10 border-white/20' 
            : 'bg-black/10 border-black/20'
        }`}>
          <CardContent className="p-8 md:p-12 text-center">
            {/* Icon */}
            <div className="mb-8">
              <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${
                resolvedTheme === 'dark' ? 'bg-white/10' : 'bg-black/10'
              }`}>
                <Rocket className={`w-10 h-10 ${
                  resolvedTheme === 'dark' ? 'text-white' : 'text-black'
                }`} />
              </div>
            </div>

            {/* Heading */}
            <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${
              resolvedTheme === 'dark' ? 'text-white' : 'text-black'
            }`}>
              Coming Soon
            </h1>

            <p className={`text-lg md:text-xl mb-8 ${
              resolvedTheme === 'dark' ? 'text-white/80' : 'text-black/80'
            }`}>
              We're working on something amazing for you!
            </p>

            {/* Features Preview */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className={`p-4 rounded-lg ${
                resolvedTheme === 'dark' ? 'bg-white/5' : 'bg-black/5'
              }`}>
                <div className="flex items-center gap-3 mb-2">
                  <Clock className={`w-5 h-5 ${
                    resolvedTheme === 'dark' ? 'text-white/70' : 'text-black/70'
                  }`} />
                  <h3 className={`font-semibold ${
                    resolvedTheme === 'dark' ? 'text-white' : 'text-black'
                  }`}>
                    Enhanced Features
                  </h3>
                </div>
                <p className={`text-sm ${
                  resolvedTheme === 'dark' ? 'text-white/70' : 'text-black/70'
                }`}>
                  New tools and resources to help you succeed in your journey abroad
                </p>
              </div>

              <div className={`p-4 rounded-lg ${
                resolvedTheme === 'dark' ? 'bg-white/5' : 'bg-black/5'
              }`}>
                <div className="flex items-center gap-3 mb-2">
                  <Bell className={`w-5 h-5 ${
                    resolvedTheme === 'dark' ? 'text-white/70' : 'text-black/70'
                  }`} />
                  <h3 className={`font-semibold ${
                    resolvedTheme === 'dark' ? 'text-white' : 'text-black'
                  }`}>
                    Stay Updated
                  </h3>
                </div>
                <p className={`text-sm ${
                  resolvedTheme === 'dark' ? 'text-white/70' : 'text-black/70'
                }`}>
                  Be the first to know when we launch these exciting new features
                </p>
              </div>
            </div>

            {/* Call to Action */}
            <div className="space-y-4">
              <p className={`text-sm ${
                resolvedTheme === 'dark' ? 'text-white/60' : 'text-black/60'
              }`}>
                In the meantime, explore our current services
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/services">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    View Our Services
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button 
                    variant="outline" 
                    className={`${
                      resolvedTheme === 'dark' 
                        ? 'border-white/20 text-white hover:bg-white/10'
                        : 'border-black/20 text-black hover:bg-black/10'
                    }`}
                  >
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>

            {/* Additional Info */}
            <div className={`mt-8 pt-6 border-t ${
              resolvedTheme === 'dark' ? 'border-white/20' : 'border-black/20'
            }`}>
              <p className={`text-sm ${
                resolvedTheme === 'dark' ? 'text-white/60' : 'text-black/60'
              }`}>
                Have questions? We're here to help!{" "}
                <Link 
                  href="/contact" 
                  className="text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  Get in touch
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}