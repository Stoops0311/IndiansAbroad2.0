import { Metadata } from "next";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { generateArticleMetadata, generateArticleSchema } from "@/lib/article-seo";
import NewsArticleClient from "./NewsArticleClient";

interface NewsArticlePageProps {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ params, searchParams }: NewsArticlePageProps): Promise<Metadata> {
  const { id } = await params;
  const searchParamsResolved = await searchParams;
  const isAdminPreview = searchParamsResolved?.preview === 'admin';
  
  try {
    // Fetch article data from Convex
    const articleId = id as Id<"newsArticles">;
    const article = await fetchQuery(
      isAdminPreview ? api.news.getByIdForAdmin : api.news.getPublishedById,
      { id: articleId }
    );
    
    // If article not found, return default metadata
    if (!article) {
      return {
        title: "Article Not Found | Indians Abroad",
        description: "The requested article could not be found.",
        robots: {
          index: false,
          follow: false,
        },
      };
    }
    
    // Generate dynamic metadata using the article data
    return generateArticleMetadata(article);
    
  } catch (error) {
    console.error("Error fetching article for metadata:", error);
    
    // Fallback metadata in case of error
    return {
      title: "Immigration News & Updates | Indians Abroad",
      description: "Stay updated with latest immigration, visa, and career news for Indians abroad. Expert insights and analysis.",
      openGraph: {
        title: "Immigration News & Updates | Indians Abroad",
        description: "Stay updated with latest immigration, visa, and career news for Indians abroad",
        type: "article",
        siteName: "Indians Abroad",
      },
      twitter: {
        card: "summary_large_image",
        title: "Immigration News & Updates | Indians Abroad",
        description: "Stay updated with latest immigration, visa, and career news for Indians abroad",
      },
    };
  }
}

export default async function NewsArticlePage({ params, searchParams }: NewsArticlePageProps) {
  const { id } = await params;
  const searchParamsResolved = await searchParams;
  
  // Since this is a server component, we'll pass the id to the client component
  return <NewsArticleClient id={id} />;
}