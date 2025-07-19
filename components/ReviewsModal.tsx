"use client";

import React, { useState, useMemo } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Star, User, Briefcase, Search, Filter } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  profession: string;
  country: string;
  flag: string;
  rating: number;
  review: string;
  achievement: string;
  timeframe: string;
  service: string;
}

const mockTestimonials: Testimonial[] = [
  {
    id: 1,
    name: "Ritika Shah",
    profession: "HR Executive",
    country: "Australia",
    flag: "🇦🇺",
    rating: 5,
    review: "From my IELTS to visa stamping, everything was taken care of. I never felt lost. The team guided me through every step.",
    achievement: "PR Visa Approved",
    timeframe: "8 months",
    service: "PR Consulting"
  },
  {
    id: 2,
    name: "Arjun Sharma",
    profession: "Data Scientist",
    country: "Netherlands",
    flag: "🇳🇱",
    rating: 5,
    review: "Within 2 weeks of resume optimization, I had 5 interviews lined up. The visa process was seamless with their guidance.",
    achievement: "€85k Job Offer",
    timeframe: "5 months",
    service: "Job Visa"
  },
  {
    id: 3,
    name: "Priya Gupta",
    profession: "Marketing Manager",
    country: "Canada",
    flag: "🇨🇦",
    rating: 5,
    review: "Got my Express Entry invitation in first draw itself. Their point calculation and document preparation was spot-on.",
    achievement: "Canada PR",
    timeframe: "7 months",
    service: "PR Consulting"
  },
  {
    id: 4,
    name: "Vikram Singh",
    profession: "Software Developer",
    country: "Germany",
    flag: "🇩🇪",
    rating: 5,
    review: "No IELTS required for Germany was true! They connected me with employers who sponsored my visa directly.",
    achievement: "Job Visa Approved",
    timeframe: "4 months",
    service: "Job Visa"
  },
  {
    id: 5,
    name: "Meera Patel",
    profession: "Nurse",
    country: "UK",
    flag: "🇬🇧",
    rating: 5,
    review: "The NHS application process was complex, but they made it simple. Got my nursing registration and visa together.",
    achievement: "NHS Job + Visa",
    timeframe: "6 months",
    service: "Job Visa"
  },
  {
    id: 6,
    name: "Rohit Kumar",
    profession: "Accountant",
    country: "New Zealand",
    flag: "🇳🇿",
    rating: 5,
    review: "Amazing support throughout the skilled migrant process. They know exactly what NZ immigration looks for.",
    achievement: "Skilled Migrant Visa",
    timeframe: "9 months",
    service: "PR Consulting"
  },
  {
    id: 7,
    name: "Anjali Desai",
    profession: "Teacher",
    country: "Canada",
    flag: "🇨🇦",
    rating: 4,
    review: "Great help with document translation and credential evaluation. My teaching qualification was recognized quickly.",
    achievement: "Teaching License + PR",
    timeframe: "10 months",
    service: "PR Consulting"
  },
  {
    id: 8,
    name: "Karan Mehta",
    profession: "Chef",
    country: "Australia",
    flag: "🇦🇺",
    rating: 5,
    review: "Found me a restaurant sponsor in Melbourne. The whole process was smooth and professional.",
    achievement: "Sponsored Visa",
    timeframe: "5 months",
    service: "Job Visa"
  },
  {
    id: 9,
    name: "Divya Joshi",
    profession: "Graphic Designer",
    country: "USA",
    flag: "🇺🇸",
    rating: 4,
    review: "H1B lottery was stressful, but they prepared everything perfectly. Got selected in the first attempt.",
    achievement: "H1B Visa Approved",
    timeframe: "12 months",
    service: "Job Visa"
  },
  {
    id: 10,
    name: "Amit Verma",
    profession: "Mechanical Engineer",
    country: "Germany",
    flag: "🇩🇪",
    rating: 5,
    review: "Blue Card process was explained clearly. They helped me negotiate a higher salary with the employer too.",
    achievement: "EU Blue Card",
    timeframe: "6 months",
    service: "Job Visa"
  },
  {
    id: 11,
    name: "Sneha Rao",
    profession: "Data Analyst",
    country: "Singapore",
    flag: "🇸🇬",
    rating: 5,
    review: "Tech Pass application was competitive, but their guidance made all the difference. Now working at a top fintech.",
    achievement: "Tech Pass + S$120k",
    timeframe: "4 months",
    service: "Job Visa"
  },
  {
    id: 12,
    name: "Rahul Agarwal",
    profession: "Doctor",
    country: "UK",
    flag: "🇬🇧",
    rating: 5,
    review: "Medical registration with GMC was complex. They handled everything from PLAB to visa applications.",
    achievement: "NHS Doctor Position",
    timeframe: "14 months",
    service: "Job Visa"
  },
  {
    id: 13,
    name: "Kavya Reddy",
    profession: "Pharmacist",
    country: "Australia",
    flag: "🇦🇺",
    rating: 4,
    review: "Pharmacy board registration and visa - both handled professionally. Working in Sydney now.",
    achievement: "Pharmacist Registration",
    timeframe: "8 months",
    service: "Job Visa"
  },
  {
    id: 14,
    name: "Suresh Nair",
    profession: "Project Manager",
    country: "Canada",
    flag: "🇨🇦",
    rating: 5,
    review: "PMP certification helped with CRS points. Their strategy got me an ITA in just 2 draws.",
    achievement: "Express Entry ITA",
    timeframe: "6 months",
    service: "PR Consulting"
  },
  {
    id: 15,
    name: "Pooja Sharma",
    profession: "Software Tester",
    country: "Netherlands",
    flag: "🇳🇱",
    rating: 5,
    review: "Highly Skilled Migrant visa for tech sector. Great support in finding the right employer match.",
    achievement: "HSM Visa + €70k",
    timeframe: "5 months",
    service: "Job Visa"
  },
  {
    id: 16,
    name: "Manish Gupta",
    profession: "Business Analyst",
    country: "Switzerland",
    flag: "🇨🇭",
    rating: 4,
    review: "Swiss work permit is notoriously difficult, but they made it happen. Banking sector opportunity in Zurich.",
    achievement: "Work Permit B",
    timeframe: "7 months",
    service: "Job Visa"
  },
  {
    id: 17,
    name: "Ritu Kapoor",
    profession: "Dentist",
    country: "New Zealand",
    flag: "🇳🇿",
    rating: 5,
    review: "Dental council registration and skilled migrant visa together. Excellent coordination between processes.",
    achievement: "Dental Practice License",
    timeframe: "11 months",
    service: "PR Consulting"
  },
  {
    id: 18,
    name: "Sanjay Jain",
    profession: "Civil Engineer",
    country: "Canada",
    flag: "🇨🇦",
    rating: 5,
    review: "Engineers Canada assessment was smooth. Got provincial nomination from Ontario.",
    achievement: "PNP + Engineering License",
    timeframe: "9 months",
    service: "PR Consulting"
  },
  {
    id: 19,
    name: "Nisha Patel",
    profession: "UX Designer",
    country: "Germany",
    flag: "🇩🇪",
    rating: 4,
    review: "Berlin startup visa process was unique. They connected me with the right incubator program.",
    achievement: "Startup Visa",
    timeframe: "6 months",
    service: "Job Visa"
  },
  {
    id: 20,
    name: "Deepak Kumar",
    profession: "Network Engineer",
    country: "Australia",
    flag: "🇦🇺",
    rating: 5,
    review: "Skills assessment with ACS was tricky, but they guided me through every requirement perfectly.",
    achievement: "Subclass 189 Visa",
    timeframe: "8 months",
    service: "PR Consulting"
  },
  {
    id: 21,
    name: "Aditi Singh",
    profession: "Physical Therapist",
    country: "Canada",
    flag: "🇨🇦",
    rating: 5,
    review: "Healthcare professional pathway was well-planned. Got job offer before landing in Toronto.",
    achievement: "Healthcare PR",
    timeframe: "7 months",
    service: "PR Consulting"
  },
  {
    id: 22,
    name: "Varun Malhotra",
    profession: "DevOps Engineer",
    country: "USA",
    flag: "🇺🇸",
    rating: 4,
    review: "L1 to Green Card transition was seamless. They handled all the complex paperwork efficiently.",
    achievement: "Green Card Approved",
    timeframe: "18 months",
    service: "PR Consulting"
  },
  {
    id: 23,
    name: "Shreya Agarwal",
    profession: "Research Scientist",
    country: "Germany",
    flag: "🇩🇪",
    rating: 5,
    review: "Research visa for postdoc position. They coordinated with university and immigration perfectly.",
    achievement: "Research Visa",
    timeframe: "4 months",
    service: "Job Visa"
  },
  {
    id: 24,
    name: "Ashish Bansal",
    profession: "Product Manager",
    country: "Singapore",
    flag: "🇸🇬",
    rating: 5,
    review: "Employment Pass approval was quick. Great salary negotiation support with the tech company.",
    achievement: "EP + S$140k Package",
    timeframe: "3 months",
    service: "Job Visa"
  },
  {
    id: 25,
    name: "Priyanka Mehta",
    profession: "Financial Analyst",
    country: "UK",
    flag: "🇬🇧",
    rating: 4,
    review: "Skilled Worker visa for finance role in London. CFA certification helped with the application.",
    achievement: "Skilled Worker Visa",
    timeframe: "5 months",
    service: "Job Visa"
  }
];

interface ReviewsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ReviewsModal({ open, onOpenChange }: ReviewsModalProps) {
  const [countryFilter, setCountryFilter] = useState("");
  const [professionFilter, setProfessionFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");
  const [timeframeFilter, setTimeframeFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const countries = Array.from(new Set(mockTestimonials.map(t => t.country))).sort();
  const professions = Array.from(new Set(mockTestimonials.map(t => t.profession))).sort();

  const filteredTestimonials = useMemo(() => {
    return mockTestimonials.filter(testimonial => {
      const matchesCountry = !countryFilter || testimonial.country === countryFilter;
      const matchesProfession = !professionFilter || testimonial.profession === professionFilter;
      const matchesRating = !ratingFilter || (
        ratingFilter === "5" ? testimonial.rating === 5 :
        ratingFilter === "4+" ? testimonial.rating >= 4 :
        ratingFilter === "3+" ? testimonial.rating >= 3 : true
      );
      const matchesTimeframe = !timeframeFilter || (
        timeframeFilter === "under-3" ? parseInt(testimonial.timeframe) < 3 :
        timeframeFilter === "3-6" ? parseInt(testimonial.timeframe) >= 3 && parseInt(testimonial.timeframe) <= 6 :
        timeframeFilter === "6-12" ? parseInt(testimonial.timeframe) >= 6 && parseInt(testimonial.timeframe) <= 12 :
        timeframeFilter === "over-12" ? parseInt(testimonial.timeframe) > 12 : true
      );
      const matchesSearch = !searchTerm || 
        testimonial.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        testimonial.profession.toLowerCase().includes(searchTerm.toLowerCase()) ||
        testimonial.review.toLowerCase().includes(searchTerm.toLowerCase()) ||
        testimonial.country.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesCountry && matchesProfession && matchesRating && matchesTimeframe && matchesSearch;
    });
  }, [countryFilter, professionFilter, ratingFilter, timeframeFilter, searchTerm]);

  const clearFilters = () => {
    setCountryFilter("");
    setProfessionFilter("");
    setRatingFilter("");
    setTimeframeFilter("");
    setSearchTerm("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <span className="text-2xl">📝</span>
            All Client Reviews
          </DialogTitle>
          <p className="text-white/70 mt-2">
            Browse through all our client testimonials and success stories
          </p>
        </DialogHeader>

        <div className="flex flex-col h-[calc(90vh-120px)]">
          {/* Filters Section - Fixed at top */}
          <div className="flex-shrink-0 p-6 pb-4 space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
              <Input
                placeholder="Search reviews, names, professions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/5 border-primary/20 text-white placeholder:text-white/50"
              />
            </div>

            {/* Filter Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Select value={countryFilter} onValueChange={setCountryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Countries" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Countries</SelectItem>
                  {countries.map(country => (
                    <SelectItem key={country} value={country}>{country}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={professionFilter} onValueChange={setProfessionFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Professions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Professions</SelectItem>
                  {professions.map(profession => (
                    <SelectItem key={profession} value={profession}>{profession}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={ratingFilter} onValueChange={setRatingFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Ratings" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Ratings</SelectItem>
                  <SelectItem value="5">5 Stars</SelectItem>
                  <SelectItem value="4+">4+ Stars</SelectItem>
                  <SelectItem value="3+">3+ Stars</SelectItem>
                </SelectContent>
              </Select>

              <Select value={timeframeFilter} onValueChange={setTimeframeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Timeframes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Timeframes</SelectItem>
                  <SelectItem value="under-3">Under 3 months</SelectItem>
                  <SelectItem value="3-6">3-6 months</SelectItem>
                  <SelectItem value="6-12">6-12 months</SelectItem>
                  <SelectItem value="over-12">12+ months</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Results Count & Clear Filters */}
            <div className="flex items-center justify-between text-sm text-white/70">
              <span>Showing {filteredTestimonials.length} of {mockTestimonials.length} reviews</span>
              {(countryFilter || professionFilter || ratingFilter || timeframeFilter || searchTerm) && (
                <button 
                  onClick={clearFilters}
                  className="text-primary hover:text-primary/80 transition-colors"
                >
                  Clear filters
                </button>
              )}
            </div>
          </div>

          {/* Reviews Grid - Scrollable area */}
          <div className="flex-1 overflow-y-auto px-6 pb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredTestimonials.map((testimonial) => (
                <Card 
                  key={testimonial.id}
                  className="p-4 bg-white/5 border-primary/20 hover:border-primary/40 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="space-y-3">
                    <div className="flex gap-1 mb-2">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="h-3 w-3 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    
                    <blockquote className="text-sm text-white/90 italic leading-relaxed line-clamp-3">
                      "{testimonial.review}"
                    </blockquote>
                    
                    <div className="flex items-center justify-between pt-3 border-t border-white/10">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center flex-shrink-0">
                          <User className="h-4 w-4 text-white" />
                        </div>
                        <div className="min-w-0">
                          <h5 className="font-semibold text-white text-sm leading-tight">
                            {testimonial.name}
                          </h5>
                          <div className="flex items-center gap-2 text-xs text-white/70">
                            <Briefcase className="h-3 w-3 flex-shrink-0" />
                            <span className="truncate">{testimonial.profession}</span>
                          </div>
                        </div>
                      </div>
                      
                      <Badge className="bg-primary/20 text-primary text-xs">
                        {testimonial.flag} {testimonial.country}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-primary font-medium">
                        {testimonial.achievement}
                      </span>
                      <span className="text-white/60">
                        {testimonial.timeframe}
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {filteredTestimonials.length === 0 && (
              <div className="text-center py-12">
                <Filter className="h-12 w-12 text-white/30 mx-auto mb-4" />
                <p className="text-white/60">No reviews match your current filters.</p>
                <button 
                  onClick={clearFilters}
                  className="text-primary hover:text-primary/80 transition-colors mt-2"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}