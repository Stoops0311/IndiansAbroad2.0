"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  GraduationCap,
  DollarSign,
  Calendar,
  Globe,
  Award,
  Search,
  X,
  ExternalLink,
  Clock,
  MapPin
} from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

interface UniversityExplorerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const countryFlags: Record<string, string> = {
  "UK": "🇬🇧",
  "USA": "🇺🇸", 
  "Canada": "🇨🇦",
  "Germany": "🇩🇪",
  "Australia": "🇦🇺"
};

export default function UniversityExplorerModal({ isOpen, onClose }: UniversityExplorerModalProps) {
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");

  const universities = useQuery(api.universities.get, {
    country: selectedCountry || undefined,
  });

  const countries = useQuery(api.universities.getCountries);

  // Filter universities based on search query
  const filteredUniversities = universities?.filter(uni => 
    searchQuery === "" || 
    uni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    uni.popularPrograms.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleClearFilters = () => {
    setSelectedCountry("");
    setSearchQuery("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[95vh] overflow-hidden flex flex-col">
        <DialogHeader className="border-b border-border pb-4 px-6">
          <DialogTitle className="text-3xl md:text-4xl font-bold text-foreground">
            Explore Partner Universities
          </DialogTitle>
          <p className="text-muted-foreground text-lg mt-2">
            Browse through {universities?.length || 300}+ universities we're associated with worldwide
          </p>
        </DialogHeader>

        {/* Scrollable content wrapper */}
        <div className="flex-1 overflow-y-auto">
          {/* Filters Section */}
          <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm py-4 px-6 border-b border-border">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by university name or program..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background border-muted-foreground/20"
              />
            </div>

            {/* Country Filter */}
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={selectedCountry === "" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCountry("")}
                className="whitespace-nowrap"
              >
                All Countries
              </Button>
              {countries?.map((country) => (
                <Button
                  key={country}
                  variant={selectedCountry === country ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCountry(country)}
                  className="whitespace-nowrap"
                >
                  {countryFlags[country] || "🌍"} {country}
                </Button>
              ))}
            </div>

            {/* Clear Filters */}
            {(selectedCountry || searchQuery) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearFilters}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4 mr-1" />
                Clear
              </Button>
            )}
          </div>

          {/* Results Count */}
          <div className="mt-3 text-sm text-muted-foreground">
            Showing {filteredUniversities?.length || 0} universities
            {selectedCountry && ` in ${selectedCountry}`}
            {searchQuery && ` matching "${searchQuery}"`}
          </div>
        </div>

          {/* Universities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
          {filteredUniversities?.map((university, index) => (
            <div
              key={`${university._id}-${index}`}
              className="group p-4 rounded-xl bg-card dark:bg-gradient-to-br dark:from-card dark:via-background dark:to-primary/5 border border-border/40 hover:border-primary/40 transition-all duration-300 hover:shadow-lg"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground text-lg leading-tight line-clamp-2">
                    {university.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <MapPin className="h-3 w-3 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {countryFlags[university.country]} {university.country}
                    </span>
                  </div>
                </div>
              </div>

              {/* Programs */}
              <div className="mb-3">
                <div className="flex items-center gap-2 mb-2">
                  <GraduationCap className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">Popular Programs</span>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {university.popularPrograms}
                </p>
              </div>

              {/* Info Grid */}
              <div className="space-y-2 mb-3">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-muted-foreground">
                    {university.tuitionFees}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-blue-500" />
                  <span className="text-sm text-muted-foreground">
                    {university.duration}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-purple-500" />
                  <span className="text-sm text-muted-foreground">
                    Intake: {university.intakeMonths}
                  </span>
                </div>
              </div>

              {/* Scholarship */}
              {university.scholarshipAvailability && (
                <div className="mb-3">
                  <Badge 
                    variant="secondary" 
                    className="bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/40"
                  >
                    <Award className="h-3 w-3 mr-1" />
                    Scholarships Available
                  </Badge>
                  {university.scholarshipValue && (
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                      {university.scholarshipValue}
                    </p>
                  )}
                </div>
              )}

              {/* Website Link */}
              <Button
                variant="outline"
                size="sm"
                className="w-full mt-auto group-hover:border-primary/60"
                asChild
              >
                <a
                  href={university.website.startsWith('http') ? university.website : `https://${university.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  <Globe className="h-4 w-4" />
                  Visit Website
                  <ExternalLink className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </Button>
            </div>
          ))}
        </div>

          {/* Empty State */}
          {filteredUniversities?.length === 0 && (
            <div className="text-center py-12">
              <GraduationCap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                No universities found matching your criteria.
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}