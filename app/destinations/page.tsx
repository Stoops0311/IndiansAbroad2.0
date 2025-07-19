import { Header } from "@/components/Header";
import Footer from "@/components/Footer";
import DestinationsHero from "@/components/DestinationsHero";
import CountryCard from "@/components/CountryCard";
import CountryComparison from "@/components/CountryComparison";
import FloatingCTA from "@/components/FloatingCTA";

const countries = [
  {
    id: "canada",
    name: "Canada",
    flag: "🇨🇦",
    colors: {
      primary: "from-red-500/20 to-red-600/20",
      accent: "border-red-500/30",
      text: "text-red-400"
    },
    stats: {
      averageSalary: "$75,000 CAD",
      processingTime: "6-12 months",
      successRate: "94%",
      clientsPlaced: "1200+"
    },
    whyChoose: [
      "PR-friendly immigration system",
      "Huge demand in IT, Healthcare, Logistics", 
      "Family Visa & Work Permit available"
    ],
    services: [
      "Express Entry",
      "Provincial Nominee Program (PNP)",
      "Resume + Job Assistance"
    ],
    ctaText: "Work in Canada",
    testimonial: {
      name: "Priya Sharma",
      role: "Software Engineer",
      company: "Shopify",
      quote: "Got my PR through Express Entry in 8 months!"
    }
  },
  {
    id: "germany", 
    name: "Germany",
    flag: "🇩🇪",
    colors: {
      primary: "from-yellow-500/20 to-red-600/20",
      accent: "border-yellow-500/30",
      text: "text-yellow-400"
    },
    stats: {
      averageSalary: "€65,000 EUR",
      processingTime: "3-6 months",
      successRate: "92%",
      clientsPlaced: "800+"
    },
    whyChoose: [
      "No IELTS required",
      "Shortage of skilled workers",
      "Blue Card Program"
    ],
    services: [
      "Job Seeker Visa",
      "Employer Outreach",
      "A1-B2 Language Coaching"
    ],
    ctaText: "Work in Germany",
    testimonial: {
      name: "Rahul Gupta",
      role: "Data Scientist", 
      company: "SAP",
      quote: "No IELTS needed - got my job offer in 4 months!"
    }
  },
  {
    id: "uk",
    name: "United Kingdom", 
    flag: "🇬🇧",
    colors: {
      primary: "from-blue-500/20 to-blue-600/20",
      accent: "border-blue-500/30", 
      text: "text-blue-400"
    },
    stats: {
      averageSalary: "£55,000 GBP",
      processingTime: "4-8 months",
      successRate: "89%",
      clientsPlaced: "950+"
    },
    whyChoose: [
      "High-paying jobs in Healthcare & Tech",
      "Work visa + family sponsorship",
      "2-year stay back for graduates"
    ],
    services: [
      "Skilled Worker Visa",
      "CV & Interview Training", 
      "IELTS & Visa Filing"
    ],
    ctaText: "Work in UK",
    testimonial: {
      name: "Anjali Reddy",
      role: "NHS Nurse",
      company: "NHS Trust",
      quote: "Sponsored visa + family visa approved together!"
    }
  },
  {
    id: "australia",
    name: "Australia",
    flag: "🇦🇺", 
    colors: {
      primary: "from-green-500/20 to-yellow-500/20",
      accent: "border-green-500/30",
      text: "text-green-400"
    },
    stats: {
      averageSalary: "$85,000 AUD",
      processingTime: "8-15 months", 
      successRate: "91%",
      clientsPlaced: "650+"
    },
    whyChoose: [
      "Fast-track PR under SkillSelect",
      "High job demand",
      "Family-friendly policies"
    ],
    services: [
      "PR Pathway (189, 190)",
      "Resume Optimization",
      "IELTS Coaching"
    ],
    ctaText: "Work in Australia",
    testimonial: {
      name: "Vikram Singh",
      role: "Civil Engineer",
      company: "AECOM",
      quote: "PR approved in 10 months with 189 visa!"
    }
  },
  {
    id: "newzealand",
    name: "New Zealand",
    flag: "🇳🇿",
    colors: {
      primary: "from-blue-400/20 to-green-500/20", 
      accent: "border-blue-400/30",
      text: "text-blue-300"
    },
    stats: {
      averageSalary: "$70,000 NZD",
      processingTime: "6-10 months",
      successRate: "88%", 
      clientsPlaced: "400+"
    },
    whyChoose: [
      "Peaceful life with job growth",
      "Work to PR pathways",
      "English-speaking, safe"
    ],
    services: [
      "Accredited Employer Work Visa",
      "Document Filing",
      "Employer Matching"
    ],
    ctaText: "Work in New Zealand",
    testimonial: {
      name: "Meera Patel",
      role: "Teacher",
      company: "Auckland Primary",
      quote: "Amazing work-life balance and PR pathway!"
    }
  }
];

export default function DestinationsPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-12 md:pt-16">
        <DestinationsHero />
        
        <section className="w-full px-4 md:px-8 lg:px-12 py-6 md:py-8">
          {/* Country Cards Grid - 2x3 Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8 mb-12">
            {countries.map((country) => (
              <CountryCard key={country.id} country={country} />
            ))}
          </div>
          
          {/* Country Comparison Tool */}
          <CountryComparison countries={countries} />
        </section>
      </div>
      
      {/* Floating CTA */}
      <FloatingCTA />
      
      <Footer />
    </main>
  );
}