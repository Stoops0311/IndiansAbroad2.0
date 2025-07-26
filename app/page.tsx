import Hero from "@/components/Hero";
import CoreServices from "@/components/CoreServices";
import WhyChooseUs from "@/components/WhyChooseUs";
import SuccessStories from "@/components/SuccessStories";
import CountriesGrid from "@/components/CountriesGrid";
import FinalCTA from "@/components/FinalCTA";
import EligibilityForm from "@/components/EligibilityForm";
import Footer from "@/components/Footer";
import DesktopSidebar from "@/components/DesktopSidebar";
import { BentoGrid } from "@/components/ui/bento";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Desktop Sidebar */}
      <DesktopSidebar />
      
      {/* Hero Section - Full Width */}
      <Hero />
      
      {/* Main Bento Grid Layout */}
      <section className="w-full px-4 md:px-8 lg:px-12 py-6 md:py-8 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 auto-rows-min">
          {/* Core Services - Large Card */}
          <CoreServices />
          
          {/* Why Choose Us - Medium Card */}
          <WhyChooseUs />
          
          {/* Success Stories - Wide Card */}
          <SuccessStories />
          
          {/* Countries Grid - Wide Card */}
          <CountriesGrid />
        </div>
      </section>
      
      {/* Final CTA - Full Width */}
      <section className="w-full px-4 md:px-8 lg:px-12 py-6 md:py-8">
        <FinalCTA />
      </section>
      
      {/* Free Eligibility Check */}
      <section className="w-full px-4 md:px-8 lg:px-12 py-6 md:py-8">
        <EligibilityForm />
      </section>
      
      {/* Footer */}
      <Footer />
    </main>
  );
}