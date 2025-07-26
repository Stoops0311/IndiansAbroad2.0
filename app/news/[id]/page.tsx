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
import { use } from "react";
import { useSearchParams } from "next/navigation";

interface NewsArticlePageProps {
  params: Promise<{ id: string }>;
}

export default function NewsArticlePage({ params }: NewsArticlePageProps) {
  const { id } = use(params);
  const articleId = id as Id<"newsArticles">;
  const searchParams = useSearchParams();
  
  // Check if this is an admin preview (draft articles)
  const isAdminPreview = searchParams.get('preview') === 'admin';
  
  // Use appropriate query based on access level
  const article = useQuery(
    isAdminPreview ? api.news.getByIdForAdmin : api.news.getPublishedById, 
    { id: articleId }
  );
  const relatedArticles = useQuery(api.news.getRelated, { 
    currentId: articleId,
    limit: 3 
  });
  const recentArticles = useQuery(api.news.getRecent, { limit: 5 });
  const categoryCounts = useQuery(api.news.getCategories);

  if (article === null) {
    notFound();
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.summary,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      // Fallback to copy URL
      navigator.clipboard.writeText(window.location.href);
      // You could add a toast notification here
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Article Header */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link href="/news">
              <Button variant="ghost" className="text-white hover:bg-white/10 mb-6">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to News
              </Button>
            </Link>
            
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary" className="capitalize">
                  {article.category}
                </Badge>
                {article.status === "draft" && (
                  <Badge variant="destructive" className="text-xs">
                    DRAFT
                  </Badge>
                )}
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
                {article.title}
              </h1>
              <p className="text-xl opacity-90 mb-6">
                {article.summary}
              </p>
              {article.status === "draft" && (
                <div className="bg-yellow-500/20 border border-yellow-500/50 rounded-lg p-3 mb-4">
                  <p className="text-sm text-yellow-200">
                    ⚠️ This is a draft article. It is not visible to the public and only accessible with the admin preview link.
                  </p>
                </div>
              )}
            </div>

            {/* Article Meta */}
            <div className="flex flex-wrap items-center gap-6 text-sm opacity-80">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {article.publishedAt && formatDate(article.publishedAt)}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {article.readingTime} min read
              </div>
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4" />
                {article.tags.length} tags
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <main className="lg:w-2/3">
            {/* Article Actions */}
            <div className="flex items-center justify-between mb-8 p-4 bg-muted/50 rounded-lg">
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleShare}
                  className="flex items-center gap-2"
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Bookmark className="w-4 h-4" />
                  Save
                </Button>
              </div>
            </div>

            {/* Article Content */}
            <NewsContent 
              content={article.content} 
              sources={article.metadata?.sources || []}
            />

            {/* Article Footer with Sources */}
            {article.metadata?.sources && article.metadata.sources.length > 0 && (
              <div className="mt-12 p-6 bg-muted/30 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Sources</h3>
                <div className="space-y-2">
                  {article.metadata.sources.map((source: any, index: number) => (
                    <div key={index} className="text-sm">
                      <span className="font-medium">{source.source}</span>
                      {source.url && (
                        <a
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline ml-2"
                        >
                          View Source
                        </a>
                      )}
                      {source.quote && (
                        <p className="italic text-muted-foreground mt-1">
                          "{source.quote}"
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Key Takeaways */}
            {article.metadata?.keyTakeaways && article.metadata.keyTakeaways.length > 0 && (
              <div className="mt-8 p-6 bg-primary/5 border-l-4 border-primary rounded-r-lg">
                <h3 className="text-lg font-semibold mb-4">Key Takeaways</h3>
                <ul className="space-y-2">
                  {article.metadata.keyTakeaways.map((takeaway: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Related Articles */}
            {relatedArticles && relatedArticles.length > 0 && (
              <div className="mt-12">
                <h3 className="text-2xl font-bold mb-6">Related Articles</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {relatedArticles.map((relatedArticle) => (
                    <Link
                      key={relatedArticle._id}
                      href={`/news/${relatedArticle._id}`}
                      className="group block"
                    >
                      <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                        <Badge variant="outline" className="mb-2 capitalize text-xs">
                          {relatedArticle.category}
                        </Badge>
                        <h4 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                          {relatedArticle.title}
                        </h4>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {relatedArticle.summary}
                        </p>
                        <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                          <span>{relatedArticle.readingTime} min read</span>
                          {relatedArticle.publishedAt && (
                            <span>{formatDate(relatedArticle.publishedAt)}</span>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </main>

          {/* Sidebar */}
          <aside className="lg:w-1/3">
            <NewsSidebar
              recentArticles={recentArticles || []}
              categories={categoryCounts || []}
              selectedCategory={article.category}
              onCategoryChange={() => {}}
            />
          </aside>
        </div>
      </div>
    </div>
  );
}