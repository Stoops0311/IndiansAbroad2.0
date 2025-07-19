import { Header } from "@/components/Header";
import Footer from "@/components/Footer";
import ContactHero from "@/components/ContactHero";
import ContactInfo from "@/components/ContactInfo";
import ContactForm from "@/components/ContactForm";
import EligibilityForm from "@/components/EligibilityForm";
import ContactCTA from "@/components/ContactCTA";

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-12 md:pt-16">
        <ContactHero />
        
        <section className="w-full px-4 md:px-8 lg:px-12 py-6 md:py-8">
          {/* Contact Information and Quick Form */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
            <div className="lg:col-span-2">
              <ContactInfo />
            </div>
            <div className="lg:col-span-1">
              <ContactForm />
            </div>
          </div>
          
          {/* Free Eligibility Check Form */}
          <div className="mb-8">
            <EligibilityForm />
          </div>
          
          {/* Final Encouragement CTA */}
          <ContactCTA />
        </section>
      </div>
      <Footer />
    </main>
  );
}