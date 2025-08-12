import { Metadata } from "next";
import { Header } from "@/components/Header";
import Footer from "@/components/Footer";
import ServicesHero from "@/components/ServicesHero";
import ServiceCard from "@/components/ServiceCard";
import ProfileEvaluationCTA from "@/components/ProfileEvaluationCTA";
import EligibilityForm from "@/components/EligibilityForm";
import { servicesData } from "@/lib/services-data";

export const metadata: Metadata = {
  title: "Immigration Services - Visa, PR & Study Abroad Consultants | Canada, Australia, USA, Germany, UK Services",
  description: "Comprehensive immigration services by Indians Abroad - expert MARA & RCIC certified consultants. Get Canada PR, Australia PR, USA work visas, Germany opportunity cards, UK study visas, and study abroad guidance. We offer visa consulting, document preparation, university admissions, language training, and career evaluation services with proven success rates and personalized support.",
  keywords: ["immigration services", "visa services", "Canada PR", "Australia PR", "USA work visa", "study abroad", "Germany opportunity card", "UK visa", "visa consultant", "immigration lawyer", "PR application", "student visa"],
  alternates: {
    canonical: "https://www.indiansabroad.in/services"
  },
  openGraph: {
    title: "Immigration Services - Visa, PR & Study Abroad Consultants",
    description: "Comprehensive immigration services by Indians Abroad - expert MARA & RCIC certified consultants. Get Canada PR, Australia PR, USA work visas, and study abroad guidance.",
    url: "https://www.indiansabroad.in/services",
  },
  twitter: {
    title: "Immigration Services - Visa, PR & Study Abroad Consultants",
    description: "Comprehensive immigration services by Indians Abroad - expert MARA & RCIC certified consultants. Get Canada PR, Australia PR, USA work visas, and study abroad guidance.",
  }
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-12 md:pt-16">
        <ServicesHero />
        
        <section className="w-full px-4 md:px-8 lg:px-12 py-6 md:py-8">
          {/* Study Abroad - Full Width at Top */}
          <div className="mb-8">
            {servicesData
              .filter(service => service.id === "study-abroad")
              .map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))
            }
          </div>

          {/* Other Services - 3x2 Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
            {servicesData
              .filter(service => service.id !== "study-abroad")
              .map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))
            }
          </div>
          
          {/* Free Profile Evaluation CTA */}
          <ProfileEvaluationCTA />
        </section>
        
        {/* Free Eligibility Check */}
        <section className="w-full px-4 md:px-8 lg:px-12 py-6 md:py-8">
          <EligibilityForm />
        </section>
      </div>
      <Footer />
    </main>
  );
}