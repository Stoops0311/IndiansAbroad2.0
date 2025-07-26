"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Clock, Calendar, ArrowRight, Tag } from "lucide-react";

interface NewsArticle {
  _id: string;
  title: string;
  summary: string;
  category: string;
  tags: string[];
  readingTime: number;
  publishedAt?: number;
  generatedAt: number;
  featuredImage?: string;
}

interface NewsCardProps {
  article: NewsArticle;
  featured?: boolean;
}

export default function NewsCard({ article, featured = false }: NewsCardProps) {
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  const displayDate = article.publishedAt || article.generatedAt;

  return (
    <Card className={`group hover:shadow-lg transition-all duration-300 ${
      featured ? "lg:col-span-2 lg:row-span-2" : ""
    }`}>
      {article.featuredImage && (
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={article.featuredImage}
            alt={article.title}
            className={`w-full object-cover transition-transform duration-300 group-hover:scale-105 ${
              featured ? "h-64" : "h-48"
            }`}
          />
          <div className="absolute top-4 left-4">
            <Badge variant="secondary" className="capitalize">
              {article.category}
            </Badge>
          </div>
        </div>
      )}
      
      <CardHeader className="pb-2">
        {!article.featuredImage && (
          <Badge variant="outline" className="w-fit mb-2 capitalize">
            {article.category}
          </Badge>
        )}
        
        <Link href={`/news/${article._id}`} className="group-hover:text-primary transition-colors">
          <h3 className={`font-bold leading-tight ${
            featured ? "text-2xl md:text-3xl" : "text-lg md:text-xl"
          }`}>
            {article.title}
          </h3>
        </Link>
      </CardHeader>

      <CardContent className="pb-2">
        <p className={`text-muted-foreground line-clamp-3 ${
          featured ? "text-lg" : "text-sm"
        }`}>
          {article.summary}
        </p>
        
        {article.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            <Tag className="w-3 h-3 text-muted-foreground mt-0.5 mr-1" />
            {article.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {article.tags.length > 3 && (
              <span className="text-xs text-muted-foreground">
                +{article.tags.length - 3} more
              </span>
            )}
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-2">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {formatDate(displayDate)}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {article.readingTime} min
            </div>
          </div>
          
          <Link
            href={`/news/${article._id}`}
            className="text-primary hover:text-primary/80 transition-colors flex items-center gap-1 text-sm font-medium"
          >
            Read more
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}