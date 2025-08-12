import { Metadata } from "next";
import { Header } from "@/components/Header";
import Footer from "@/components/Footer";
import OurStory from "@/components/OurStory";
import MissionVision from "@/components/MissionVision";
import MissionCard from "@/components/MissionCard";
import VisionCard from "@/components/VisionCard";
import WhyChooseStats from "@/components/WhyChooseStats";
import EligibilityForm from "@/components/EligibilityForm";
import DesktopSidebar from "@/components/DesktopSidebar";

export const metadata: Metadata = {
  title: "About Indians Abroad - MARA & RCIC Certified Immigration Consultants | Our Story, Mission & Vision",
  description: "Learn about Indians Abroad - trusted MARA and RCIC certified immigration consultants with over a decade of experience helping Indians work and settle abroad. Discover our mission to provide stress-free immigration services, our vision for global mobility, and why thousands choose us for Canada PR, Australia PR, study abroad guidance, and visa services across USA, Germany, and UK.",
  keywords: ["about Indians Abroad", "MARA certified", "RCIC certified", "immigration consultants story", "trusted visa consultants", "immigration company background", "study abroad consultants", "migration experts"],
  alternates: {
    canonical: "https://www.indiansabroad.in/about"
  },
  openGraph: {
    title: "About Indians Abroad - MARA & RCIC Certified Immigration Consultants",
    description: "Learn about Indians Abroad - trusted MARA and RCIC certified immigration consultants with over a decade of experience helping Indians work and settle abroad.",
    url: "https://www.indiansabroad.in/about",
  },
  twitter: {
    title: "About Indians Abroad - MARA & RCIC Certified Immigration Consultants",
    description: "Learn about Indians Abroad - trusted MARA and RCIC certified immigration consultants with over a decade of experience helping Indians work and settle abroad.",
  }
};

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <DesktopSidebar />
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
        
        {/* Free Eligibility Check */}
        <section className="w-full px-4 md:px-8 lg:px-12 py-6 md:py-8">
          <EligibilityForm />
        </section>
      </div>
      <Footer />
    </main>
  );
}