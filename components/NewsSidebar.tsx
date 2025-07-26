"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Calendar, TrendingUp, Hash } from "lucide-react";

interface NewsArticle {
  _id: string;
  title: string;
  summary: string;
  category: string;
  readingTime: number;
  publishedAt?: number;
  generatedAt: number;
}

interface CategoryCount {
  category: string;
  count: number;
}

interface NewsSidebarProps {
  recentArticles: NewsArticle[];
  categories: CategoryCount[];
  selectedCategory?: string;
  onCategoryChange: (category: string) => void;
}

const categoryLabels: Record<string, string> = {
  immigration: "Immigration",
  education: "Education",
  visa: "Visa Updates",
  career: "Career",
  success: "Success Stories",
  culture: "Culture & Community",
};

export default function NewsSidebar({
  recentArticles,
  categories,
  selectedCategory,
  onCategoryChange,
}: NewsSidebarProps) {
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric"
    });
  };

  return (
    <div className="space-y-6">
      {/* Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Hash className="w-5 h-5" />
            Categories
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button
            variant={selectedCategory === "all" ? "default" : "ghost"}
            className="w-full justify-between"
            onClick={() => onCategoryChange("all")}
          >
            All Categories
            <span className="text-xs bg-muted px-2 py-1 rounded">
              {categories.reduce((sum, cat) => sum + cat.count, 0)}
            </span>
          </Button>
          
          {categories
            .sort((a, b) => b.count - a.count)
            .map((categoryCount) => (
              <Button
                key={categoryCount.category}
                variant={selectedCategory === categoryCount.category ? "default" : "ghost"}
                className="w-full justify-between"
                onClick={() => onCategoryChange(categoryCount.category)}
              >
                <span className="capitalize">
                  {categoryLabels[categoryCount.category] || categoryCount.category}
                </span>
                <span className="text-xs bg-muted px-2 py-1 rounded">
                  {categoryCount.count}
                </span>
              </Button>
            ))}
        </CardContent>
      </Card>

      {/* Recent Articles */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <TrendingUp className="w-5 h-5" />
            Recent Articles
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {recentArticles.map((article) => (
            <div key={article._id} className="group">
              <Link href={`/news/${article._id}`}>
                <div className="space-y-2 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs capitalize">
                      {article.category}
                    </Badge>
                  </div>
                  
                  <h4 className="font-medium text-sm leading-tight group-hover:text-primary transition-colors line-clamp-2">
                    {article.title}
                  </h4>
                  
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(article.publishedAt || article.generatedAt)}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {article.readingTime}m
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
          
          {recentArticles.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-4">
              No recent articles available
            </p>
          )}
        </CardContent>
      </Card>

      {/* Newsletter Signup */}
      <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
        <CardHeader>
          <CardTitle className="text-lg">Stay Updated</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Get the latest immigration and education updates delivered to your inbox.
          </p>
          <div className="space-y-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 text-sm border rounded-md bg-background"
            />
            <Button size="sm" className="w-full">
              Subscribe
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            No spam. Unsubscribe anytime.
          </p>
        </CardContent>
      </Card>

      {/* Quick Links */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Links</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Link href="/services">
            <Button variant="ghost" className="w-full justify-start">
              Our Services
            </Button>
          </Link>
          <Link href="/eligibility">
            <Button variant="ghost" className="w-full justify-start">
              Eligibility Assessment
            </Button>
          </Link>
          <Link href="/destinations">
            <Button variant="ghost" className="w-full justify-start">
              Study Destinations
            </Button>
          </Link>
          <Link href="/success-stories">
            <Button variant="ghost" className="w-full justify-start">
              Success Stories
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="ghost" className="w-full justify-start">
              Contact Us
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}