import { Header } from "@/components/Header";
import Footer from "@/components/Footer";
import TrustMetrics from "@/components/TrustMetrics";
import VideoTestimonials from "@/components/VideoTestimonials";
import WrittenTestimonials from "@/components/WrittenTestimonials";
import FinalCTA from "@/components/FinalCTA";
import EligibilityForm from "@/components/EligibilityForm";
import DesktopSidebar from "@/components/DesktopSidebar";

export default function SuccessStoriesPage() {
  return (
    <main className="min-h-screen">
      <DesktopSidebar />
      <Header />
      
      <div className="pt-12 md:pt-16">
        <section className="w-full px-4 md:px-8 lg:px-12">
          <div className="space-y-4 md:space-y-6">
            {/* Trust Metrics - Full Width */}
            <TrustMetrics />
            
            {/* Written Reviews + Video Testimonials Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
              <div className="lg:col-span-2">
                <WrittenTestimonials />
              </div>
              <div className="lg:col-span-1">
                <VideoTestimonials />
              </div>
            </div>
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
      </div>
      
      <Footer />
    </main>
  );
}