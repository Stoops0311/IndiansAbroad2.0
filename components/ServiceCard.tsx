"use client";

import { useState } from "react";
import { BentoCard } from "@/components/ui/bento";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ServiceDetailModal from "@/components/ServiceDetailModal";
import StudyAbroadModal from "@/components/StudyAbroadModal";
import ServiceInquiryModal from "@/components/ServiceInquiryModal";
import { type ServiceData } from "@/lib/services-data";
import { 
  Briefcase, 
  Home, 
  FileText, 
  MessageSquare, 
  Mic, 
  Plane, 
  CheckCircle2,
  ArrowRight,
  Bell,
  Search,
  Globe,
  Users,
  GraduationCap,
  BookOpen,
  Eye
} from "lucide-react";

const iconMap = {
  briefcase: Briefcase,
  home: Home,
  "file-text": FileText,
  "message-square": MessageSquare,
  mic: Mic,
  plane: Plane,
  search: Search,
  globe: Globe,
  users: Users,
  "graduation-cap": GraduationCap,
  "book-open": BookOpen
};

interface ServiceCardProps {
  service: ServiceData;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const Icon = iconMap[service.icon as keyof typeof iconMap];
  const isComingSoon = false; // All services are active now

  return (
    <>
      <BentoCard 
        className={`p-4 md:p-6 min-h-[450px] md:min-h-[500px] relative ${
          isComingSoon 
            ? 'opacity-75 bg-gradient-to-br from-card/50 via-background/50 to-primary/5' 
            : 'bg-gradient-to-br from-card via-background to-primary/5'
        }`}
      >
        {/* Coming Soon Badge */}
        {isComingSoon && (
          <div className="absolute top-4 right-4 z-10">
            <Badge variant="secondary" className="bg-orange-500/20 text-orange-300 border-orange-500/40">
              Coming Soon
            </Badge>
          </div>
        )}
        
        {/* Price Badge */}
        {service.price && (
          <div className="absolute top-4 left-4 z-10">
            <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/40 font-semibold">
              {service.price}
            </Badge>
          </div>
        )}
        
        <div className="h-full flex flex-col">
          {/* Icon and Title */}
          <div className="mb-4 mt-8">
            <div className="p-3 rounded-xl bg-primary/20 w-fit mb-4">
              <Icon className="h-6 w-6 text-primary" />
            </div>
            
            <h3 className="text-lg md:text-xl font-bold text-foreground mb-3 leading-tight">
              {service.title}
            </h3>
            
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              {service.summary || service.description}
            </p>
          </div>
          
          {/* Features List */}
          <div className="space-y-3 flex-1 mb-6">
            {service.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <CheckCircle2 className="h-4 w-4 text-green-400 flex-shrink-0" />
                <span className="text-sm text-foreground/90">{feature}</span>
              </div>
            ))}
          </div>
          
          {/* Action Buttons */}
          <div className="mt-auto space-y-3">
            {/* Learn More Button */}
            {service.detailedContent && (
              <Button
                variant="outline"
                className="w-full border-primary/40 text-primary hover:bg-primary/10 hover:border-primary/60 transition-all group"
                onClick={() => setIsModalOpen(true)}
              >
                <Eye className="mr-2 h-4 w-4" />
                Learn More
              </Button>
            )}
            
            {/* CTA Button */}
            {isComingSoon ? (
              <Button 
                variant="outline" 
                className="w-full border-orange-500/40 text-orange-300 hover:bg-orange-500/10 hover:border-orange-500/60 transition-all group"
                disabled
              >
                <Bell className="mr-2 h-4 w-4" />
                Notify Me When Available
              </Button>
            ) : (
              <Button 
                className="w-full shadow-lg hover:shadow-primary/20 transition-all group"
                onClick={() => setIsInquiryModalOpen(true)}
              >
                {service.ctaText}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            )}
          </div>
        </div>
      </BentoCard>

      {/* Service Detail Modal - Conditional based on service type */}
      {service.detailedContent && (
        service.id === "study-abroad" ? (
          <StudyAbroadModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        ) : (
          <ServiceDetailModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            service={service}
          />
        )
      )}

      {/* Service Inquiry Modal */}
      <ServiceInquiryModal
        isOpen={isInquiryModalOpen}
        onClose={() => setIsInquiryModalOpen(false)}
        service={service}
      />
    </>
  );
}