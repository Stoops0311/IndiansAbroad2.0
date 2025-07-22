"use client";

import { BentoCard, BentoIcon, BentoTitle } from "@/components/ui/bento";
import { Button } from "@/components/ui/button";
import { 
  MapPin, 
  Phone, 
  Mail, 
  MessageCircle, 
  Clock, 
  Instagram, 
  Facebook, 
  Linkedin, 
  Youtube
} from "lucide-react";

export default function ContactInfo() {
  const contactDetails = [
    {
      icon: <MapPin className="h-5 w-5" />,
      label: "Address",
      value: "18th Floor Cyber One Business Park, Sector 30A, Vashi, Navi Mumbai, Maharashtra 400705",
      type: "address"
    },
    {
      icon: <Phone className="h-5 w-5" />,
      label: "Phone",
      value: "+91 (982) 557-4590",
      type: "tel",
      href: "tel:+919825574590"
    },
    {
      icon: <Mail className="h-5 w-5" />,
      label: "Email",
      value: "contact@indiansabroad.com",
      type: "email",
      href: "mailto:contact@indiansabroad.com"
    },
    {
      icon: <MessageCircle className="h-5 w-5" />,
      label: "WhatsApp",
      value: "Chat Now",
      type: "whatsapp",
      href: "https://wa.me/919825574590?text=Hi, I'm interested in your services"
    },
    {
      icon: <Clock className="h-5 w-5" />,
      label: "Working Hours",
      value: "Mon–Sat: 10AM – 7PM",
      type: "hours"
    }
  ];

  const socialLinks = [
    {
      name: "Instagram",
      icon: <Instagram className="h-5 w-5" />,
      href: "#",
      color: "hover:text-pink-400"
    },
    {
      name: "Facebook", 
      icon: <Facebook className="h-5 w-5" />,
      href: "#",
      color: "hover:text-blue-400"
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="h-5 w-5" />,
      href: "#",
      color: "hover:text-blue-500"
    },
    {
      name: "YouTube",
      icon: <Youtube className="h-5 w-5" />,
      href: "#",
      color: "hover:text-red-500"
    }
  ];

  return (
    <BentoCard className="p-4 md:p-6 lg:p-8 min-h-[500px]">
      <div className="h-full flex flex-col">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <BentoIcon>
              <MapPin className="h-6 w-6 text-primary" />
            </BentoIcon>
          </div>
          
          <BentoTitle className="text-xl md:text-2xl lg:text-3xl mb-2">
            Get In Touch
          </BentoTitle>
        </div>
        
        {/* Contact Details */}
        <div className="space-y-4 mb-8">
          {contactDetails.map((detail, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-primary/20 text-primary flex-shrink-0 mt-1">
                {detail.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-foreground text-sm mb-1">{detail.label}</h4>
                {detail.href ? (
                  <a
                    href={detail.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors leading-relaxed break-words"
                    target={detail.type === 'whatsapp' ? '_blank' : undefined}
                    rel={detail.type === 'whatsapp' ? 'noopener noreferrer' : undefined}
                  >
                    {detail.value}
                  </a>
                ) : (
                  <p className="text-sm text-muted-foreground leading-relaxed break-words">
                    {detail.value}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {/* Social Media */}
        <div className="mb-8">
          <h4 className="font-semibold text-foreground text-sm mb-4">Follow Us</h4>
          <div className="flex gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                className={`p-2 rounded-lg bg-foreground/5 text-muted-foreground ${social.color} transition-all hover:bg-foreground/10 hover:scale-110`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
        
      </div>
    </BentoCard>
  );
}