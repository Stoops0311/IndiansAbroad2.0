import { Header } from "@/components/Header";
import Footer from "@/components/Footer";
import OurStory from "@/components/OurStory";
import MissionVision from "@/components/MissionVision";
import MissionCard from "@/components/MissionCard";
import VisionCard from "@/components/VisionCard";
import WhyChooseStats from "@/components/WhyChooseStats";

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-12 md:pt-16">
        <section className="w-full px-4 md:px-8 lg:px-12">
          <div className="space-y-4 md:space-y-6">
            {/* Our Story + Core Values Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
              <div className="lg:col-span-2">
                <OurStory />
              </div>
              <div className="lg:col-span-1">
                <MissionVision />
              </div>
            </div>
            
            {/* Mission and Vision Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <MissionCard />
              <VisionCard />
            </div>
            
            {/* Stats Section - Full Width */}
            <WhyChooseStats />
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}