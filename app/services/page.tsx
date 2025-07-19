import { Header } from "@/components/Header";
import Footer from "@/components/Footer";
import ServicesHero from "@/components/ServicesHero";
import ServiceCard from "@/components/ServiceCard";
import ProfileEvaluationCTA from "@/components/ProfileEvaluationCTA";

const services = [
  {
    id: "job-visa",
    title: "Job Visa Assistance",
    icon: "briefcase",
    description: "We connect skilled professionals with real job opportunities abroad and help with complete visa documentation.",
    features: [
      "Employer tie-ups",
      "Country-specific job programs", 
      "End-to-end paperwork"
    ],
    ctaText: "Explore Job Visa Options",
    status: "active" as const
  },
  {
    id: "pr-consulting", 
    title: "Permanent Residency (PR) Consulting",
    icon: "home",
    description: "Build a life overseas with genuine PR pathways. We'll guide you through the point system, NOC codes, and requirements.",
    features: [
      "PR Eligibility Check",
      "Document Verification",
      "Application Filing & Follow-ups"
    ],
    ctaText: "Check PR Eligibility", 
    status: "active" as const
  },
  {
    id: "resume-optimization",
    title: "Resume & LinkedIn Profile Optimization", 
    icon: "file-text",
    description: "Impress global recruiters with professionally crafted resumes and LinkedIn profiles.",
    features: [
      "ATS-friendly resumes",
      "LinkedIn positioning for global hiring",
      "3-5 day delivery"
    ],
    ctaText: "Upgrade My Resume",
    status: "active" as const
  },
  {
    id: "ielts-training",
    title: "IELTS & Language Training",
    icon: "message-square", 
    description: "Master English or German with our coaching sessions.",
    features: [
      "IELTS General & Academic",
      "German A1 to B2 Coaching", 
      "Mock Tests & Certification"
    ],
    ctaText: "Join a Free Demo Class",
    status: "active" as const
  },
  {
    id: "interview-prep",
    title: "Interview Preparation & HR Coaching",
    icon: "mic",
    description: "We help you confidently face international job interviews.",
    features: [
      "Country-specific HR rounds",
      "Zoom-based 1:1 training",
      "Salary negotiation tactics"
    ],
    ctaText: "Book a Mock Interview",
    status: "coming-soon" as const
  },
  {
    id: "post-landing",
    title: "Post-Landing & Settlement Support", 
    icon: "plane",
    description: "We stay with you even after visa approval.",
    features: [
      "Housing Guidance",
      "Banking & SIM Card Setup",
      "Community Connections"
    ],
    ctaText: "Know More",
    status: "coming-soon" as const
  }
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-12 md:pt-16">
        <ServicesHero />
        
        <section className="w-full px-4 md:px-8 lg:px-12 py-6 md:py-8">
          {/* Services Grid - 3x2 Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
          
          {/* Free Profile Evaluation CTA */}
          <ProfileEvaluationCTA />
        </section>
      </div>
      <Footer />
    </main>
  );
}