"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  ImageIcon, 
  Play, 
  MapPin, 
  Users, 
  GraduationCap,
  TrendingUp,
  DollarSign,
  Home,
  Award
} from "lucide-react";
import Link from "next/link";
import { studyAbroadCountries, type Country } from "@/lib/study-abroad-data";

interface StudyAbroadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function StudyAbroadModal({ isOpen, onClose }: StudyAbroadModalProps) {
  const [currentStep, setCurrentStep] = useState<'selection' | 'details'>('selection');
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    setCurrentStep('details');
  };

  const handleBack = () => {
    setCurrentStep('selection');
    setSelectedCountry(null);
  };

  const handleClose = () => {
    setCurrentStep('selection');
    setSelectedCountry(null);
    onClose();
  };

  const handleCountrySwitch = (country: Country) => {
    setSelectedCountry(country);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-7xl max-h-[95vh] overflow-y-auto">
        {currentStep === 'selection' ? (
          // Step 1: Country Selection
          <div>
            <DialogHeader>
              <DialogTitle className="text-3xl md:text-4xl font-bold text-white mb-4">
                Choose Your Study Destination
              </DialogTitle>
              <p className="text-white/70 text-lg">
                Select a country to explore detailed information about studying abroad
              </p>
            </DialogHeader>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 p-6">
              {studyAbroadCountries.map((country) => (
                <button
                  key={country.id}
                  onClick={() => handleCountrySelect(country)}
                  className="group p-6 rounded-xl bg-gradient-to-br from-card via-background to-primary/5 border border-border/40 hover:border-primary/40 transition-all duration-300 hover:scale-105"
                >
                  <div className="text-center">
                    <div className="text-6xl mb-4">{country.flag}</div>
                    <h3 className="text-xl font-bold text-white mb-3">{country.name}</h3>
                    <div className="space-y-2 text-sm text-white/70">
                      <div className="flex items-center justify-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{country.overview.capital}</span>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <Users className="h-4 w-4" />
                        <span>{country.overview.population}</span>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <GraduationCap className="h-4 w-4" />
                        <span>{country.education.universities}+ Universities</span>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-center gap-2 text-primary">
                      <span className="text-sm font-medium">Learn More</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          // Step 2: Country Details
          selectedCountry && (
            <div>
              <DialogHeader>
                <div className="flex items-center gap-4 mb-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleBack}
                    className="flex items-center gap-2"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                  </Button>
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{selectedCountry.flag}</span>
                    <DialogTitle className="text-3xl md:text-4xl font-bold text-white">
                      Study in {selectedCountry.name}
                    </DialogTitle>
                  </div>
                </div>

                {/* Country Navigation */}
                <div className="flex gap-2 mb-6">
                  {studyAbroadCountries.map((country) => (
                    <button
                      key={country.id}
                      onClick={() => handleCountrySwitch(country)}
                      className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                        selectedCountry.id === country.id
                          ? 'bg-primary text-black font-medium'
                          : 'bg-white/10 text-white hover:bg-white/20'
                      }`}
                    >
                      {country.flag} {country.name}
                    </button>
                  ))}
                </div>
              </DialogHeader>

              <div className="space-y-8 p-6">
                {/* Overview Section */}
                <section>
                  <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                    <MapPin className="h-6 w-6 text-primary" />
                    Overview
                  </h3>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                      <p className="text-white/80 leading-relaxed whitespace-pre-line">
                        {selectedCountry.overview.description}
                      </p>
                    </div>
                    <div className="space-y-3">
                      {selectedCountry.overview.keyFacts.map((fact, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-400 mt-1 flex-shrink-0" />
                          <span className="text-white/80 text-sm">{fact}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                {/* Educational Structure */}
                <section>
                  <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                    <GraduationCap className="h-6 w-6 text-primary" />
                    Educational Structure
                  </h3>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                      <p className="text-white/80 leading-relaxed mb-4">
                        {selectedCountry.education.description}
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center p-3 rounded-lg bg-primary/10">
                          <div className="text-2xl font-bold text-primary">{selectedCountry.education.universities}+</div>
                          <div className="text-xs text-white/70">Universities</div>
                        </div>
                        <div className="text-center p-3 rounded-lg bg-primary/10">
                          <div className="text-2xl font-bold text-primary">{selectedCountry.education.programs.toLocaleString()}+</div>
                          <div className="text-xs text-white/70">Programs</div>
                        </div>
                        <div className="text-center p-3 rounded-lg bg-primary/10">
                          <div className="text-2xl font-bold text-primary">{selectedCountry.education.internationalStudents}</div>
                          <div className="text-xs text-white/70">Int'l Students</div>
                        </div>
                        <div className="text-center p-3 rounded-lg bg-primary/10">
                          <div className="text-2xl font-bold text-primary">{selectedCountry.education.globalRanking.split(' ')[0]}</div>
                          <div className="text-xs text-white/70">Top Ranked</div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {selectedCountry.education.facts.map((fact, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-400 mt-1 flex-shrink-0" />
                          <span className="text-white/80 text-sm">{fact}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                {/* Top Universities */}
                <section>
                  <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                    <Award className="h-6 w-6 text-primary" />
                    Top Universities
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedCountry.topUniversities.slice(0, 8).map((university, index) => (
                      <div key={index} className="flex items-center gap-4 p-4 rounded-lg bg-white/5 border border-white/10">
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-primary/20 flex items-center justify-center">
                          {university.image ? (
                            <img 
                              src={university.image} 
                              alt={`${university.name} logo`}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <ImageIcon className="h-6 w-6 text-primary" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-white text-sm leading-tight">{university.name}</h4>
                          <p className="text-primary text-xs mt-1">QS Ranking: #{university.ranking}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Top Courses */}
                <section>
                  <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                    <GraduationCap className="h-6 w-6 text-primary" />
                    Top Courses
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {selectedCountry.topCourses.map((courseField, index) => (
                      <div key={index} className="p-4 rounded-lg bg-white/5 border border-white/10">
                        <h4 className="font-semibold text-primary mb-3">{courseField.field}</h4>
                        <ul className="space-y-2">
                          {courseField.courses.map((course, courseIndex) => (
                            <li key={courseIndex} className="flex items-center gap-2">
                              <CheckCircle2 className="h-3 w-3 text-green-400 flex-shrink-0" />
                              <span className="text-white/80 text-sm">{course}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Placement and Salary */}
                <section>
                  <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                    <TrendingUp className="h-6 w-6 text-primary" />
                    Placement & Industry
                  </h3>
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
                    <div className="text-center p-4 rounded-lg bg-primary/10">
                      <div className="text-xl font-bold text-primary">{selectedCountry.placement.averageSalary}</div>
                      <div className="text-sm text-white/70">Average Salary</div>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-green-500/10">
                      <div className="text-xl font-bold text-green-400">{selectedCountry.placement.entryLevel}</div>
                      <div className="text-sm text-white/70">Entry Level</div>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-blue-500/10">
                      <div className="text-xl font-bold text-blue-400">{selectedCountry.placement.experienced}</div>
                      <div className="text-sm text-white/70">Experienced</div>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-purple-500/10">
                      <div className="text-xl font-bold text-purple-400">{selectedCountry.cost.roi}</div>
                      <div className="text-sm text-white/70">ROI</div>
                    </div>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b border-white/20">
                          <th className="text-left p-3 text-white font-semibold">Field of Study</th>
                          <th className="text-left p-3 text-white font-semibold">Bachelors</th>
                          <th className="text-left p-3 text-white font-semibold">Masters</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedCountry.placement.salaryData.map((salary, index) => (
                          <tr key={index} className="border-b border-white/10">
                            <td className="p-3 text-white/80">{salary.field}</td>
                            <td className="p-3 text-green-400">{salary.bachelors}</td>
                            <td className="p-3 text-blue-400">{salary.masters}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>

                {/* Cost and ROI */}
                <section>
                  <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                    <DollarSign className="h-6 w-6 text-primary" />
                    Cost of Education & ROI
                  </h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3">Monthly Expenses</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 rounded-lg bg-white/5">
                          <span className="text-white/80">Accommodation</span>
                          <span className="text-primary font-semibold">{selectedCountry.cost.costBreakdown.accommodation}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 rounded-lg bg-white/5">
                          <span className="text-white/80">Food</span>
                          <span className="text-primary font-semibold">{selectedCountry.cost.costBreakdown.food}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 rounded-lg bg-white/5">
                          <span className="text-white/80">Lifestyle</span>
                          <span className="text-primary font-semibold">{selectedCountry.cost.costBreakdown.lifestyle}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 rounded-lg bg-red-500/20 border border-red-500/40">
                          <span className="text-white font-semibold">Total Expenditure</span>
                          <span className="text-red-400 font-bold">{selectedCountry.cost.costBreakdown.total}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3">Income & Balance</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 rounded-lg bg-green-500/20 border border-green-500/40">
                          <span className="text-white font-semibold">Part-time Earnings</span>
                          <span className="text-green-400 font-bold">{selectedCountry.cost.costBreakdown.partTimeEarning}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 rounded-lg bg-primary/20 border border-primary/40">
                          <span className="text-white font-semibold">Monthly Balance</span>
                          <span className="text-primary font-bold">{selectedCountry.cost.costBreakdown.balance}</span>
                        </div>
                        <div className="p-4 rounded-lg bg-gradient-to-r from-primary/20 to-green-500/20 border border-primary/40">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-primary mb-1">{selectedCountry.cost.roi}</div>
                            <div className="text-sm text-white/70">Return on Investment</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Lifestyle */}
                <section>
                  <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                    <Home className="h-6 w-6 text-primary" />
                    Salary & Lifestyle
                  </h3>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                      <p className="text-white/80 leading-relaxed mb-4">
                        {selectedCountry.lifestyle.description}
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="p-4 rounded-lg bg-white/5">
                          <h5 className="font-semibold text-white mb-2">Full Time Salary</h5>
                          <p className="text-primary text-sm">{selectedCountry.lifestyle.fullTimeSalary}</p>
                        </div>
                        <div className="p-4 rounded-lg bg-white/5">
                          <h5 className="font-semibold text-white mb-2">Part Time Salary</h5>
                          <p className="text-primary text-sm">{selectedCountry.lifestyle.partTimeSalary}</p>
                        </div>
                        <div className="p-4 rounded-lg bg-white/5">
                          <h5 className="font-semibold text-white mb-2">Work Permission</h5>
                          <p className="text-white/80 text-sm">{selectedCountry.lifestyle.workPermission}</p>
                        </div>
                        <div className="p-4 rounded-lg bg-white/5">
                          <h5 className="font-semibold text-white mb-2">Monthly Savings</h5>
                          <p className="text-green-400 text-sm font-semibold">{selectedCountry.lifestyle.savings}</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h5 className="font-semibold text-white">Key Benefits</h5>
                      {selectedCountry.lifestyle.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-400 mt-1 flex-shrink-0" />
                          <span className="text-white/80 text-sm">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                {/* Pathway to Citizenship */}
                <section>
                  <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                    <Award className="h-6 w-6 text-primary" />
                    Pathway to Citizenship
                  </h3>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                      <p className="text-white/80 leading-relaxed mb-4">
                        {selectedCountry.citizenship.description}
                      </p>
                      {selectedCountry.citizenship.processingTime && (
                        <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                          <h5 className="font-semibold text-white mb-2">Processing Time</h5>
                          <p className="text-primary">{selectedCountry.citizenship.processingTime}</p>
                        </div>
                      )}
                    </div>
                    {selectedCountry.citizenship.requirements && (
                      <div className="space-y-3">
                        <h5 className="font-semibold text-white">Requirements</h5>
                        {selectedCountry.citizenship.requirements.map((requirement, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-400 mt-1 flex-shrink-0" />
                            <span className="text-white/80 text-sm">{requirement}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </section>

                {/* CTA Section */}
                <section className="border-t border-white/20 pt-6">
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-white mb-4">Ready to Start Your Journey?</h3>
                    <Button asChild className="bg-primary hover:bg-primary/90 text-black font-semibold px-8 py-3">
                      <Link href="/contact?service=study-abroad">
                        Get Started - ₹5,000
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                    <p className="text-white/60 text-sm mt-3">
                      Free consultation • Expert guidance • Comprehensive support
                    </p>
                  </div>
                </section>
              </div>
            </div>
          )
        )}
      </DialogContent>
    </Dialog>
  );
}