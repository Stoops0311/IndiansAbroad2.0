"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Globe, Users, Award, ArrowRight, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="w-full px-4 md:px-8 lg:px-12 py-8 md:py-16 lg:py-24">
      <Card className="relative overflow-hidden border-primary/20 bg-gradient-to-br from-card via-background to-primary/5 p-6 md:p-8 lg:p-12 xl:p-16">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover blur-[2px] opacity-30"
          >
            <source src="/city-night-movement.mp4" type="video/mp4" />
          </video>
          {/* Overlay gradient for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/60 to-primary/20" />
        </div>
        
        <div className="relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6 lg:space-y-8">
              <div className="space-y-4">
                <h1 className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-white">
                  <span>🌍</span> Work & Settle Abroad Without the Stress
                </h1>
                <p className="text-base md:text-lg lg:text-xl text-white/80 max-w-lg">
                  Get expert guidance for job visas, PR, and permanent settlement in countries like Canada, Germany, UK, Australia, and more.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                <Button 
                  size="lg" 
                  className="text-base md:text-lg px-6 md:px-8 py-4 md:py-6 shadow-lg hover:shadow-primary/20 transition-all group text-white"
                >
                  <CheckCircle2 className="mr-2 h-4 md:h-5 w-4 md:w-5" />
                  Free Eligibility Check
                  <ArrowRight className="ml-2 h-3 md:h-4 w-3 md:w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-base md:text-lg px-6 md:px-8 py-4 md:py-6 border-primary/20 hover:border-primary/40 hover:bg-primary/10 transition-all group text-white"
                  asChild
                >
                  <a href="https://wa.me/919825574590" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-2 h-4 md:h-5 w-4 md:w-5 text-green-500" />
                    Chat on WhatsApp
                  </a>
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <Card className="p-4 md:p-6 bg-background/50 backdrop-blur border-primary/10 hover:border-primary/30 transition-colors">
                <Globe className="h-6 md:h-8 w-6 md:w-8 text-primary mb-2 md:mb-3" />
                <div className="text-xl md:text-3xl font-bold text-white mb-1">20+</div>
                <div className="text-xs md:text-sm text-white/70">Countries Covered</div>
              </Card>
              
              <Card className="p-4 md:p-6 bg-background/50 backdrop-blur border-primary/10 hover:border-primary/30 transition-colors">
                <Users className="h-6 md:h-8 w-6 md:w-8 text-primary mb-2 md:mb-3" />
                <div className="text-xl md:text-3xl font-bold text-white mb-1">5,000+</div>
                <div className="text-xs md:text-sm text-white/70">Success Stories</div>
              </Card>
              
              <Card className="p-4 md:p-6 bg-background/50 backdrop-blur border-primary/10 hover:border-primary/30 transition-colors">
                <Award className="h-6 md:h-8 w-6 md:w-8 text-primary mb-2 md:mb-3" />
                <div className="text-xl md:text-3xl font-bold text-white mb-1">98%</div>
                <div className="text-xs md:text-sm text-white/70">Success Rate</div>
              </Card>
              
              <Card className="p-4 md:p-6 bg-background/50 backdrop-blur border-primary/10 hover:border-primary/30 transition-colors">
                <CheckCircle2 className="h-6 md:h-8 w-6 md:w-8 text-primary mb-2 md:mb-3" />
                <div className="text-xl md:text-3xl font-bold text-white mb-1">15+</div>
                <div className="text-xs md:text-sm text-white/70">Years Experience</div>
              </Card>
            </div>
          </div>
        </div>
        
        {/* Purple blur */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-primary/15 rounded-full blur-3xl pointer-events-none"
          animate={{
            x: ["-50%", "-150%", "-50%", "50%", "-50%"],
            y: ["-50%", "-150%", "50%", "-150%", "-50%"],
            scale: [1, 1.2, 0.8, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Pink blur */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-64 h-64 bg-accent/12 rounded-full blur-3xl pointer-events-none"
          animate={{
            x: ["0%", "100%", "-100%", "0%"],
            y: ["0%", "100%", "-100%", "0%"],
            scale: [0.8, 1.2, 1, 0.8],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
        
        {/* Yellow blur */}
        <motion.div
          className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-yellow-400/10 rounded-full blur-3xl pointer-events-none"
          animate={{
            x: ["0%", "-50%", "50%", "0%"],
            y: ["0%", "-50%", "50%", "0%"],
            scale: [1, 0.8, 1.2, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
        />
        
        {/* Blue blur */}
        <motion.div
          className="absolute top-1/3 left-1/4 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl pointer-events-none"
          animate={{
            x: ["0%", "100%", "0%", "-100%", "0%"],
            y: ["0%", "50%", "100%", "50%", "0%"],
            scale: [0.9, 1.1, 0.85, 1.15, 0.9],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 6,
          }}
        />
      </Card>
    </section>
  );
}