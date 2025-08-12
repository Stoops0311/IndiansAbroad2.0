import { Metadata } from "next";
import { Header } from "@/components/Header";
import Footer from "@/components/Footer";
import ContactHero from "@/components/ContactHero";
import ContactInfo from "@/components/ContactInfo";
import ContactForm from "@/components/ContactForm";
import EligibilityForm from "@/components/EligibilityForm";
import ContactCTA from "@/components/ContactCTA";
import DesktopSidebar from "@/components/DesktopSidebar";

export const metadata: Metadata = {
  title: "Contact Indians Abroad - Immigration Consultants | Get Free Consultation for Visa & PR Services",
  description: "Contact Indians Abroad for expert immigration consultation. Get free assessment for Canada PR, Australia PR, USA work visas, study abroad programs, and visa services. Our MARA & RCIC certified consultants are ready to help you with personalized immigration solutions. Call, email, or schedule a consultation today for stress-free immigration guidance and support.",
  keywords: ["contact immigration consultant", "free immigration consultation", "Indians Abroad contact", "visa consultation", "immigration advice", "contact us", "immigration support", "free assessment"],
  alternates: {
    canonical: "https://www.indiansabroad.in/contact"
  },
  openGraph: {
    title: "Contact Indians Abroad - Immigration Consultants | Get Free Consultation",
    description: "Contact Indians Abroad for expert immigration consultation. Get free assessment for Canada PR, Australia PR, USA work visas, and study abroad programs.",
    url: "https://www.indiansabroad.in/contact",
  },
  twitter: {
    title: "Contact Indians Abroad - Immigration Consultants | Get Free Consultation",
    description: "Contact Indians Abroad for expert immigration consultation. Get free assessment for Canada PR, Australia PR, USA work visas, and study abroad programs.",
  }
};

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <DesktopSidebar />
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