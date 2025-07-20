import { Header } from "@/components/Header";
import Footer from "@/components/Footer";
import EligibilityForm from "@/components/EligibilityForm";

export default function EligibilityPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-12 md:pt-16">
        
        <section className="w-full px-4 md:px-8 lg:px-12 py-6 md:py-8">
          {/* Free Eligibility Check Form */}
          <EligibilityForm />
        </section>
      </div>
      <Footer />
    </main>
  );
}