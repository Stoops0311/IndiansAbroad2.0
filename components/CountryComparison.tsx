"use client";

import { BentoCard, BentoIcon, BentoTitle } from "@/components/ui/bento";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BarChart3, CheckCircle2, AlertCircle, Clock } from "lucide-react";
import { useState } from "react";

interface Country {
  id: string;
  name: string;
  flag: string;
  stats: {
    averageSalary: string;
    processingTime: string;
    successRate: string;
    clientsPlaced: string;
  };
}

interface CountryComparisonProps {
  countries: Country[];
}

export default function CountryComparison({ countries }: CountryComparisonProps) {
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [showComparison, setShowComparison] = useState(false);

  const toggleCountrySelection = (countryId: string) => {
    if (selectedCountries.includes(countryId)) {
      setSelectedCountries(selectedCountries.filter(id => id !== countryId));
    } else if (selectedCountries.length < 3) {
      setSelectedCountries([...selectedCountries, countryId]);
    }
  };

  const getComparisonData = () => {
    return countries.filter(country => selectedCountries.includes(country.id));
  };

  const getProcessingTimeScore = (time: string) => {
    const months = parseInt(time.split('-')[0]);
    if (months <= 4) return { score: 'fast', color: 'text-green-400', icon: CheckCircle2 };
    if (months <= 8) return { score: 'medium', color: 'text-yellow-400', icon: Clock };
    return { score: 'slow', color: 'text-red-400', icon: AlertCircle };
  };

  const getSuccessRateScore = (rate: string) => {
    const percentage = parseInt(rate.replace('%', ''));
    if (percentage >= 90) return { score: 'excellent', color: 'text-green-400', icon: CheckCircle2 };
    if (percentage >= 85) return { score: 'good', color: 'text-yellow-400', icon: Clock };
    return { score: 'fair', color: 'text-red-400', icon: AlertCircle };
  };

  return (
    <BentoCard className="p-6 md:p-8 bg-gradient-to-br from-primary/10 to-accent/5">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <BentoIcon>
            <BarChart3 className="h-6 w-6 text-primary" />
          </BentoIcon>
        </div>
        
        <BentoTitle className="text-xl md:text-2xl lg:text-3xl mb-2">
          Compare Countries
        </BentoTitle>
        
        <p className="text-white/80 mb-6">
          Select up to 3 countries to compare their key metrics side by side
        </p>

        {/* Country Selection */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
          {countries.map((country) => (
            <button
              key={country.id}
              onClick={() => toggleCountrySelection(country.id)}
              disabled={!selectedCountries.includes(country.id) && selectedCountries.length >= 3}
              className={`p-3 rounded-lg border transition-all ${
                selectedCountries.includes(country.id)
                  ? 'bg-primary/20 border-primary/40 text-white'
                  : 'bg-white/5 border-white/20 text-white/80 hover:bg-white/10 hover:border-white/30'
              } ${
                !selectedCountries.includes(country.id) && selectedCountries.length >= 3
                  ? 'opacity-50 cursor-not-allowed'
                  : 'cursor-pointer'
              }`}
            >
              <div className="text-2xl mb-2">{country.flag}</div>
              <div className="text-xs font-medium">{country.name}</div>
            </button>
          ))}
        </div>

        {/* Compare Button */}
        {selectedCountries.length >= 2 && (
          <div className="text-center mb-6">
            <Button
              onClick={() => setShowComparison(!showComparison)}
              className="shadow-lg hover:shadow-primary/20 transition-all"
            >
              {showComparison ? 'Hide' : 'Show'} Comparison
              <BarChart3 className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Comparison Table */}
        {showComparison && selectedCountries.length >= 2 && (
          <div className="overflow-x-auto">
            <table className="w-full bg-white/5 rounded-lg border border-white/20">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="p-4 text-left text-white/90 font-semibold">Metric</th>
                  {getComparisonData().map((country) => (
                    <th key={country.id} className="p-4 text-center text-white/90 font-semibold">
                      <div className="flex flex-col items-center gap-2">
                        <span className="text-2xl">{country.flag}</span>
                        <span className="text-sm">{country.name}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/10">
                  <td className="p-4 text-white/80 font-medium">Average Salary</td>
                  {getComparisonData().map((country) => (
                    <td key={country.id} className="p-4 text-center">
                      <Badge variant="outline" className="bg-white/10 border-white/20 text-white/90">
                        {country.stats.averageSalary}
                      </Badge>
                    </td>
                  ))}
                </tr>
                
                <tr className="border-b border-white/10">
                  <td className="p-4 text-white/80 font-medium">Processing Time</td>
                  {getComparisonData().map((country) => {
                    const score = getProcessingTimeScore(country.stats.processingTime);
                    const Icon = score.icon;
                    return (
                      <td key={country.id} className="p-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Icon className={`h-4 w-4 ${score.color}`} />
                          <span className="text-white/90 text-sm">{country.stats.processingTime}</span>
                        </div>
                      </td>
                    );
                  })}
                </tr>
                
                <tr className="border-b border-white/10">
                  <td className="p-4 text-white/80 font-medium">Success Rate</td>
                  {getComparisonData().map((country) => {
                    const score = getSuccessRateScore(country.stats.successRate);
                    const Icon = score.icon;
                    return (
                      <td key={country.id} className="p-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Icon className={`h-4 w-4 ${score.color}`} />
                          <span className="text-white/90 text-sm">{country.stats.successRate}</span>
                        </div>
                      </td>
                    );
                  })}
                </tr>
                
                <tr>
                  <td className="p-4 text-white/80 font-medium">Clients Placed</td>
                  {getComparisonData().map((country) => (
                    <td key={country.id} className="p-4 text-center">
                      <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
                        {country.stats.clientsPlaced}
                      </Badge>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {selectedCountries.length < 2 && (
          <div className="text-center py-8">
            <p className="text-white/60">Select at least 2 countries to compare</p>
          </div>
        )}
      </div>
    </BentoCard>
  );
}