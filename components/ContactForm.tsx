"use client";

import { BentoCard, BentoIcon, BentoTitle } from "@/components/ui/bento";
import { Button } from "@/components/ui/button";
import { MessageSquare, Send } from "lucide-react";
import { useState, useEffect } from "react";

export default function ContactForm() {
  const [selectedService, setSelectedService] = useState("");

  const services = [
    { id: "job-visa", name: "Job Visa Assistance" },
    { id: "pr-consulting", name: "Permanent Residency (PR) Consulting" },
    { id: "resume-optimization", name: "Resume & LinkedIn Profile Optimization" },
    { id: "ielts-training", name: "IELTS & Language Training" },
    { id: "interview-prep", name: "Interview Preparation & HR Coaching" },
    { id: "post-landing", name: "Post-Landing & Settlement Support" },
    { id: "other", name: "Other / General Inquiry" }
  ];

  // Pre-populate service from URL parameter
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const serviceParam = urlParams.get('service');
    if (serviceParam) {
      setSelectedService(serviceParam);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic will be added here
    console.log("Form submitted");
  };

  return (
    <BentoCard className="p-4 md:p-6 min-h-[500px]">
      <div className="h-full flex flex-col">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <BentoIcon>
              <MessageSquare className="h-6 w-6 text-primary" />
            </BentoIcon>
          </div>
          
          <BentoTitle className="text-lg md:text-xl mb-2">
            Send Us a Message
          </BentoTitle>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4 flex-1">
          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-foreground/90 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              required
              className="w-full px-3 py-2 bg-foreground/10 border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/50 focus:bg-foreground/15 transition-all"
              placeholder="Enter your full name"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-foreground/90 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-3 py-2 bg-foreground/10 border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/50 focus:bg-foreground/15 transition-all"
              placeholder="your.email@example.com"
            />
          </div>

          {/* Mobile Number */}
          <div>
            <label htmlFor="mobile" className="block text-sm font-medium text-foreground/90 mb-2">
              Mobile Number *
            </label>
            <input
              type="tel"
              id="mobile"
              name="mobile"
              required
              className="w-full px-3 py-2 bg-foreground/10 border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/50 focus:bg-foreground/15 transition-all"
              placeholder="+91 9876543210"
            />
          </div>

          {/* Service Interested In */}
          <div>
            <label htmlFor="service" className="block text-sm font-medium text-foreground/90 mb-2">
              Service Interested In
            </label>
            <select
              id="service"
              name="service"
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="w-full px-3 py-2 bg-foreground/10 border border-border rounded-lg text-foreground focus:outline-none focus:border-primary/50 focus:bg-foreground/15 transition-all"
            >
              <option value="" className="bg-popover text-popover-foreground">Select a service</option>
              {services.map((service) => (
                <option key={service.id} value={service.id} className="bg-popover text-popover-foreground">
                  {service.name}
                </option>
              ))}
            </select>
          </div>

          {/* Message */}
          <div className="flex-1">
            <label htmlFor="message" className="block text-sm font-medium text-foreground/90 mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              className="w-full px-3 py-2 bg-foreground/10 border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/50 focus:bg-foreground/15 transition-all resize-none"
              placeholder="Tell us about your requirements..."
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <Button type="submit" className="w-full shadow-lg hover:shadow-primary/20 transition-all group">
              Send Message
              <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </form>
      </div>
    </BentoCard>
  );
}