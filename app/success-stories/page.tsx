import { Header } from "@/components/Header";
import Footer from "@/components/Footer";
import TrustMetrics from "@/components/TrustMetrics";
import VideoTestimonials from "@/components/VideoTestimonials";
import WrittenTestimonials from "@/components/WrittenTestimonials";
import FinalCTA from "@/components/FinalCTA";

export default function SuccessStoriesPage() {
  return (
    <main className="min-h-screen">
      <Header />
      
      <div className="pt-12 md:pt-16">
        <section className="w-full px-4 md:px-8 lg:px-12">
          <div className="space-y-4 md:space-y-6">
            {/* Trust Metrics - Full Width */}
            <TrustMetrics />
            
            {/* Video Testimonials + Written Reviews Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
              <VideoTestimonials />
              <WrittenTestimonials />
            </div>
          </div>
        </section>
        
        {/* Final CTA - Full Width */}
        <section className="w-full px-4 md:px-8 lg:px-12 py-6 md:py-8">
          <FinalCTA />
        </section>
      </div>
      
      <Footer />
    </main>
  );
}