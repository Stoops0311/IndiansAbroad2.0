"use client";

import { BentoCard, BentoIcon, BentoTitle, BentoDescription } from "@/components/ui/bento";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, Star, MapPin, Briefcase, Clock, Award, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const detailedStories = [
  {
    id: 1,
    name: "Ritika Shah",
    profession: "HR Executive",
    country: "Australia", 
    flag: "🇦🇺",
    image: "/placeholder-ritika.jpg",
    achievement: "PR Visa for Australia",
    rating: 5,
    timeframe: "8 months",
    previousRole: "HR Manager in Mumbai",
    currentRole: "Senior HR Business Partner, Melbourne",
    salary: "AUD 95,000",
    shortReview: "From my IELTS to visa stamping, everything was taken care of. I never felt lost.",
    fullReview: "From my IELTS to visa stamping, everything was taken care of. I never felt lost. The team guided me through every step, from documentation to interview preparation. The IELTS coaching was exceptional - I scored 8.0 overall in my first attempt. The point calculation for Australia PR was done meticulously, and they helped me get the maximum points possible. Now I'm working in Melbourne with my family, and we couldn't be happier with our decision to migrate to Australia.",
    journey: [
      "Initial consultation and eligibility assessment",
      "IELTS preparation and scoring 8.0 overall", 
      "Skills assessment and documentation",
      "Expression of Interest (EOI) submission",
      "Invitation to Apply (ITA) received",
      "Complete application submission",
      "PR visa approval and migration"
    ]
  },
  {
    id: 2,
    name: "Arjun Sharma",
    profession: "Data Scientist",
    country: "Netherlands",
    flag: "🇳🇱", 
    image: "/placeholder-arjun.jpg",
    achievement: "Highly Skilled Migrant Visa + €85k Job",
    rating: 5,
    timeframe: "5 months",
    previousRole: "Data Analyst in Bangalore", 
    currentRole: "Senior Data Scientist, Amsterdam",
    salary: "€85,000",
    shortReview: "Within 2 weeks of resume optimization, I had 5 interviews lined up. The visa process was seamless.",
    fullReview: "I was struggling to get responses from European companies for months. Within 2 weeks of resume optimization, I had 5 interviews lined up. The resume they created was perfectly tailored for the European market, highlighting my skills in a way that matched what employers were looking for. The interview preparation sessions were invaluable - they taught me about Dutch work culture and what to expect. The visa process was seamless with their guidance, and now I'm working at one of Amsterdam's leading fintech companies.",
    journey: [
      "Resume and LinkedIn profile optimization",
      "Job market analysis and targeting",
      "Interview preparation and mock sessions",
      "Job application strategy execution", 
      "Multiple interview rounds and offers",
      "Highly Skilled Migrant visa processing",
      "Successful relocation to Amsterdam"
    ]
  }
];

export default function DetailedStories() {
  const [expandedStory, setExpandedStory] = useState<number | null>(null);

  const toggleExpanded = (storyId: number) => {
    setExpandedStory(expandedStory === storyId ? null : storyId);
  };

  return (
    <BentoCard className="lg:col-span-3 p-4 md:p-6 lg:p-8 min-h-[400px] md:min-h-[450px]">
      <div className="h-full flex flex-col">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <BentoIcon>
              <User className="h-6 w-6 text-primary" />
            </BentoIcon>
            <span className="text-2xl">👨‍💼</span>
          </div>
          
          <BentoTitle className="text-xl md:text-2xl lg:text-3xl mb-2">
            Success Journey Details
          </BentoTitle>
          
          <BentoDescription className="text-white/90">
            Comprehensive stories showing the complete transformation process
          </BentoDescription>
        </div>
        
        <div className="space-y-6 flex-1">
          {detailedStories.map((story) => (
            <Card 
              key={story.id}
              className="p-6 bg-white/5 border-primary/20 hover:border-primary/40 transition-all duration-300"
            >
              <div className="grid md:grid-cols-4 gap-6">
                <div className="md:col-span-1 text-center">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center mx-auto mb-4">
                    <User className="h-10 w-10 md:h-12 md:w-12 text-white" />
                  </div>
                  
                  <h3 className="text-lg md:text-xl font-semibold text-white mb-2">
                    {story.name}
                  </h3>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-center gap-2 text-sm text-white/70">
                      <Briefcase className="h-4 w-4" />
                      <span>{story.profession}</span>
                    </div>
                    
                    <Badge className="bg-primary/20 text-primary">
                      {story.flag} {story.country}
                    </Badge>
                    
                    <div className="flex justify-center gap-1 my-2">
                      {Array.from({ length: story.rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="md:col-span-3">
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Award className="h-5 w-5 text-primary" />
                      <h4 className="text-lg font-semibold text-primary">
                        {story.achievement}
                      </h4>
                    </div>
                    
                    <blockquote className="text-white/90 italic leading-relaxed mb-4">
                      "{expandedStory === story.id ? story.fullReview : story.shortReview}"
                    </blockquote>
                  </div>
                  
                  {expandedStory === story.id && (
                    <div className="space-y-4 mb-4">
                      <div className="grid md:grid-cols-2 gap-4 p-4 rounded-lg bg-white/5">
                        <div>
                          <h5 className="font-medium text-white mb-2">Career Transformation</h5>
                          <p className="text-sm text-white/70 mb-1">From: {story.previousRole}</p>
                          <p className="text-sm text-white/70 mb-1">To: {story.currentRole}</p>
                          <p className="text-sm text-primary font-medium">Salary: {story.salary}</p>
                        </div>
                        <div>
                          <h5 className="font-medium text-white mb-2">Journey Timeline</h5>
                          <p className="text-sm text-white/70 mb-2">{story.timeframe} total</p>
                          <div className="flex items-center gap-1 text-xs text-primary">
                            <Clock className="h-3 w-3" />
                            <span>Complete transformation</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="font-medium text-white mb-3">Success Journey Steps</h5>
                        <div className="space-y-2">
                          {story.journey.map((step, index) => (
                            <div key={index} className="flex items-center gap-3 text-sm">
                              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                                <span className="text-primary text-xs font-bold">{index + 1}</span>
                              </div>
                              <span className="text-white/80">{step}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleExpanded(story.id)}
                    className="text-primary hover:text-primary/80 hover:bg-primary/10 p-2"
                  >
                    {expandedStory === story.id ? (
                      <>
                        <ChevronUp className="h-4 w-4 mr-2" />
                        Show Less
                      </>
                    ) : (
                      <>
                        <ChevronDown className="h-4 w-4 mr-2" />
                        Read Full Story
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </BentoCard>
  );
}