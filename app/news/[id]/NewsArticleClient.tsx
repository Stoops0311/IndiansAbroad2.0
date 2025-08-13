"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { notFound } from "next/navigation";
import NewsContent from "@/components/NewsContent";
import NewsSidebar from "@/components/NewsSidebar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Share2, Bookmark, Clock, Calendar, Tag } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { useSearchParams } from "next/navigation";
import { generateArticleSchema } from "@/lib/article-seo";
import Script from "next/script";

interface NewsArticleClientProps {
  id: string;
}

export default function NewsArticleClient({ id }: NewsArticleClientProps) {
  const articleId = id as Id<"newsArticles">;
  const searchParams = useSearchParams();
  
  // Check if this is an admin preview (draft articles)
  const isPreview = searchParams.get("preview") === "admin";
  
  // Fetch the article
  const article = useQuery(
    isPreview ? api.news.getByIdForAdmin : api.news.getPublishedById,
    { id: articleId }
  );
  
  // Fetch related articles for sidebar
  const relatedArticles = useQuery(api.news.getPublished, {
    limit: 5
  });

  // Loading state
  if (article === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse space-y-4 w-full max-w-4xl px-4">
          <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="space-y-2 mt-8">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  // Not found
  if (!article) {
    notFound();
  }

  // Calculate reading time
  const wordsPerMinute = 200;
  const wordCount = article.content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);

  // Format date
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Share article
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.summary,
          url: window.location.href,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      // Fallback to copying link
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  // Generate structured data for SEO
  const structuredData = generateArticleSchema(article, `https://www.indiansabroad.in/news/${id}`);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Structured Data for SEO */}
      <Script
        id="article-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      
      {/* Header with back button */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/news">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to News
            </Button>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            <article className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 sm:p-8">
              {/* Article header */}
              <header className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400">
                    {article.category}
                  </Badge>
                  {isPreview && (
                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400">
                      Preview Mode
                    </Badge>
                  )}
                </div>
                
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  {article.title}
                </h1>
                
                {article.summary && (
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                    {article.summary}
                  </p>
                )}
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(article.publishedAt || article.createdAt)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{readingTime} min read</span>
                  </div>
                </div>
              </header>

              {/* Article content */}
              <NewsContent content={article.content} />

              {/* Tags */}
              {article.tags && article.tags.length > 0 && (
                <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2 mb-4">
                    <Tag className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-500">Tags:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Share buttons */}
              <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-4">
                  <Button onClick={handleShare} variant="outline" className="gap-2">
                    <Share2 className="h-4 w-4" />
                    Share Article
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Bookmark className="h-4 w-4" />
                    Save for Later
                  </Button>
                </div>
              </div>
            </article>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <NewsSidebar 
              recentArticles={relatedArticles || []} 
              categories={[]}
              onCategoryChange={() => {}}
            />
          </div>
        </div>
      </div>
    </div>
  );
}