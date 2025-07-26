"use client";

import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import NewsCard from "@/components/NewsCard";
import NewsSidebar from "@/components/NewsSidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { Search, Filter } from "lucide-react";

const categories = [
  { value: "all", label: "All Categories" },
  { value: "immigration", label: "Immigration" },
  { value: "education", label: "Education" },
  { value: "visa", label: "Visa Updates" },
  { value: "career", label: "Career" },
  { value: "success", label: "Success Stories" },
  { value: "culture", label: "Culture & Community" },
];

export default function NewsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  const articles = useQuery(api.news.getPublished, {
    category: selectedCategory === "all" ? undefined : selectedCategory,
  });

  const recentArticles = useQuery(api.news.getRecent, { limit: 5 });
  const categoryCounts = useQuery(api.news.getCategories);

  const filteredArticles = articles?.filter((article) => {
    if (!searchTerm) return true;
    return (
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Latest News & Updates
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Stay informed with the latest immigration, education, and career updates for Indians abroad
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 pr-4 py-3 text-lg bg-white text-gray-900 border-0 rounded-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <main className="lg:w-2/3">
            {/* Filters */}
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center gap-2"
                  >
                    <Filter className="w-4 h-4" />
                    Filters
                  </Button>
                  
                  {showFilters && (
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="px-4 py-2 border rounded-lg bg-background"
                    >
                      {categories.map((category) => (
                        <option key={category.value} value={category.value}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
                
                <div className="text-sm text-muted-foreground">
                  {filteredArticles?.length || 0} articles found
                </div>
              </div>
            </div>

            {/* Articles Grid */}
            <div className="space-y-8">
              {filteredArticles?.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-xl text-muted-foreground mb-4">
                    No articles found
                  </p>
                  <p className="text-muted-foreground">
                    Try adjusting your search terms or filters
                  </p>
                </div>
              ) : (
                <div className="grid gap-8">
                  {filteredArticles?.map((article) => (
                    <NewsCard key={article._id} article={article} />
                  ))}
                </div>
              )}
            </div>

            {/* Load More Button */}
            {filteredArticles && filteredArticles.length > 0 && (
              <div className="text-center mt-12">
                <Button variant="outline" size="lg">
                  Load More Articles
                </Button>
              </div>
            )}
          </main>

          {/* Sidebar */}
          <aside className="lg:w-1/3">
            <NewsSidebar
              recentArticles={recentArticles || []}
              categories={categoryCounts || []}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </aside>
        </div>
      </div>
    </div>
  );
}