import { Header } from "@/components/Header";
import Footer from "@/components/Footer";
import ServicesHero from "@/components/ServicesHero";
import ServiceCard from "@/components/ServiceCard";
import ProfileEvaluationCTA from "@/components/ProfileEvaluationCTA";
import { servicesData } from "@/lib/services-data";

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
      </div>
      <Footer />
    </main>
  );
}