"use client";

import { BentoCard, BentoIcon, BentoTitle, BentoDescription } from "@/components/ui/bento";
import { Briefcase, Home, FileText, BookOpen, Mic, Plane, Settings } from "lucide-react";

const services = [
  {
    id: 1,
    title: "Job Visa Support",
    description: "From documentation to employer tie-ups – we assist in every step.",
    icon: Briefcase
  },
  {
    id: 2,
    title: "PR & Immigration",
    description: "End-to-end help for Canada, Australia, and Germany PR process.",
    icon: Home
  },
  {
    id: 3,
    title: "Resume + LinkedIn Upgrade",
    description: "Get noticed by global recruiters with professional resumes & profiles.",
    icon: FileText
  },
  {
    id: 4,
    title: "IELTS & Language Training",
    description: "Crack required tests with ease through expert coaching.",
    icon: BookOpen
  },
  {
    id: 5,
    title: "Interview Preparation",
    description: "Ace interviews with mock sessions, FAQs, and personalized tips.",
    icon: Mic
  },
  {
    id: 6,
    title: "Post-Landing Support",
    description: "We help you even after a visa – with housing, banking, and more.",
    icon: Plane
  }
];

export default function CoreServices() {
  return (
    <BentoCard className="lg:col-span-2 p-4 md:p-6 lg:p-8 min-h-[500px] md:min-h-[600px]">
      <div className="h-full flex flex-col">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <BentoIcon>
              <Settings className="h-6 w-6 text-primary" />
            </BentoIcon>
            <div>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-2">
                Our Core Services
              </h2>
              <p className="text-sm md:text-base lg:text-lg text-muted-foreground">
                Comprehensive support for your international career journey
              </p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
          {services.map((service) => {
            const Icon = service.icon;
            
            return (
              <div
                key={service.id}
                className="p-4 md:p-5 rounded-xl bg-foreground/5 hover:bg-foreground/10 hover:scale-[1.02] transition-all duration-300 group cursor-pointer border border-transparent hover:border-primary/20"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors flex-shrink-0">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground text-base mb-2 leading-tight">
                      {service.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </BentoCard>
  );
}