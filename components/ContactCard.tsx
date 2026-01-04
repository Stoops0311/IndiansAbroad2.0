"use client";

import { BentoCard, BentoIcon, BentoTitle, BentoDescription } from "@/components/ui/bento";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MessageCircle, MapPin, Clock } from "lucide-react";

interface ContactCardProps {
  title?: string;
  description?: string;
  showAddress?: boolean;
  showHours?: boolean;
  variant?: "default" | "compact" | "full";
  className?: string;
}

export default function ContactCard({ 
  title = "Get in Touch",
  description = "Ready to start your journey abroad? Contact our experts today.",
  showAddress = true,
  showHours = true,
  variant = "default",
  className
}: ContactCardProps) {
  const contactMethods = [
    {
      icon: Phone,
      label: "Call Us",
      value: "+91 (845) 407-3913",
      href: "tel:+918454073913",
      emoji: "📞",
      color: "text-green-400"
    },
    {
      icon: Mail,
      label: "Email Us", 
      value: "contact@indiansabroad.com",
      href: "mailto:contact@indiansabroad.com",
      emoji: "📧",
      color: "text-blue-400"
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: "Chat Now",
      href: "https://wa.me/918454073913",
      emoji: "💬",
      color: "text-green-500"
    }
  ];

  if (variant === "compact") {
    return (
      <BentoCard className={className}>
        <div className="text-center space-y-4">
          <BentoTitle className="text-xl">{title}</BentoTitle>
          <div className="grid grid-cols-1 gap-2">
            {contactMethods.map((method) => {
              const Icon = method.icon;
              return (
                <Button
                  key={method.label}
                  variant="outline"
                  size="sm"
                  className="border-primary/30 hover:border-primary/50 hover:bg-primary/10"
                  asChild
                >
                  <a href={method.href} target={method.href.startsWith('http') ? '_blank' : undefined}>
                    <Icon className={`h-4 w-4 mr-2 ${method.color}`} />
                    {method.label}
                  </a>
                </Button>
              );
            })}
          </div>
        </div>
      </BentoCard>
    );
  }

  return (
    <BentoCard className={className}>
      <div className="space-y-6">
        <div>
          <BentoIcon>
            <Phone className="h-6 w-6 text-primary" />
          </BentoIcon>
          <BentoTitle className="mt-4 mb-2">{title}</BentoTitle>
          <BentoDescription>{description}</BentoDescription>
        </div>

        <div className="space-y-4">
          {contactMethods.map((method) => {
            const Icon = method.icon;
            return (
              <div key={method.label} className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10 flex-shrink-0">
                  <Icon className={`h-4 w-4 ${method.color}`} />
                </div>
                <span className="text-lg mr-2">{method.emoji}</span>
                <div className="flex-1">
                  <div className="text-sm font-medium text-white/90">{method.label}</div>
                  <a 
                    href={method.href}
                    target={method.href.startsWith('http') ? '_blank' : undefined}
                    className="text-sm text-white/70 hover:text-primary transition-colors"
                  >
                    {method.value}
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {showAddress && (
          <div className="pt-4 border-t border-white/10">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-primary/10 flex-shrink-0">
                <MapPin className="h-4 w-4 text-primary" />
              </div>
              <span className="text-lg mr-2">📍</span>
              <div>
                <div className="text-sm font-medium text-white/90 mb-1">Office Address</div>
                <div className="text-sm text-white/70">
                  Office No-2608, 26th floor, Plan S Business Park,<br />
                  Opp. D.Y.Patil Stadium, Navi Mumbai. 400705
                </div>
              </div>
            </div>
          </div>
        )}

        {showHours && (
          <div className="pt-4 border-t border-white/10">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10 flex-shrink-0">
                <Clock className="h-4 w-4 text-primary" />
              </div>
              <span className="text-lg mr-2">🕒</span>
              <div>
                <div className="text-sm font-medium text-white/90">Business Hours</div>
                <div className="text-sm text-white/70">Mon - Sat: 9:00 AM - 7:00 PM</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </BentoCard>
  );
}