// Article SEO optimization utilities
import { Metadata } from "next";

interface ArticleData {
  _id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  tags: string[];
  status: string;
  featuredImage?: string;
  publishedAt?: number;
  createdAt: number;
  updatedAt?: number;
  readingTime?: number;
  metadata?: {
    keyTakeaways?: string[];
    sources?: any[];
  };
}

export function generateSEOTitle(title: string, category: string): string {
  const categoryMap: Record<string, string> = {
    immigration: "Immigration News",
    education: "Study Abroad News", 
    visa: "Visa Updates",
    career: "Career News",
    success: "Success Stories",
    culture: "Community News"
  };
  
  const categoryPrefix = categoryMap[category] || "News";
  
  // Ensure title is under 60 characters for SEO
  if (title.length > 45) {
    return `${title.substring(0, 42)}... | ${categoryPrefix}`;
  }
  
  return `${title} | ${categoryPrefix} - Indians Abroad`;
}

export function generateSEODescription(summary: string, tags: string[]): string {
  // Ensure meta description is 150-160 characters
  const baseDesc = summary.length > 140 ? `${summary.substring(0, 137)}...` : summary;
  
  // Add key tags for relevance
  const keyTags = tags.slice(0, 3).join(", ");
  const finalDesc = `${baseDesc} | Topics: ${keyTags}`;
  
  return finalDesc.length > 160 ? baseDesc : finalDesc;
}

export function generateArticleMetadata(article: ArticleData): Metadata {
  const baseUrl = 'https://www.indiansabroad.in';
  
  // Use existing SEO functions for consistency
  const seoTitle = generateSEOTitle(article.title, article.category);
  const metaDescription = generateSEODescription(article.summary, article.tags);
  
  // Generate keywords from tags and category
  const keywords = [
    ...article.tags,
    article.category,
    'Indians abroad',
    'immigration',
    'visa',
    'education',
    'study abroad'
  ].filter((keyword, index, self) => self.indexOf(keyword) === index);
  
  // Format publish date
  const publishDate = article.publishedAt 
    ? new Date(article.publishedAt).toISOString()
    : new Date(article.createdAt).toISOString();
  
  const modifiedDate = article.updatedAt
    ? new Date(article.updatedAt).toISOString()
    : publishDate;
  
  return {
    title: seoTitle,
    description: metaDescription,
    keywords: keywords.join(', '),
    authors: [{ name: 'Indians Abroad Editorial Team' }],
    openGraph: {
      title: article.title,
      description: article.summary,
      type: 'article',
      publishedTime: publishDate,
      modifiedTime: modifiedDate,
      authors: ['Indians Abroad'],
      tags: article.tags,
      siteName: 'Indians Abroad',
      locale: 'en_US',
      url: `${baseUrl}/news/${article._id}`,
      images: article.featuredImage ? [
        {
          url: article.featuredImage,
          width: 1200,
          height: 630,
          alt: article.title,
        }
      ] : [
        {
          url: `${baseUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: 'Indians Abroad',
        }
      ],
    },
    twitter: {
      card: article.featuredImage ? 'summary_large_image' : 'summary',
      title: article.title,
      description: article.summary,
      images: article.featuredImage ? [article.featuredImage] : [`${baseUrl}/og-image.jpg`],
      creator: '@indiansabroad',
      site: '@indiansabroad',
    },
    alternates: {
      canonical: `${baseUrl}/news/${article._id}`,
    },
    robots: {
      index: article.status === 'published',
      follow: true,
      googleBot: {
        index: article.status === 'published',
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export function generateArticleSchema(article: any, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": article.title,
    "description": article.summary,
    "url": url,
    "datePublished": new Date(article.publishedAt || article.createdAt).toISOString(),
    "dateModified": new Date(article.updatedAt || article.publishedAt || article.createdAt).toISOString(),
    "author": {
      "@type": "Organization",
      "name": "Indians Abroad",
      "url": "https://www.indiansabroad.in"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Indians Abroad",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.indiansabroad.in/Logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    },
    "keywords": article.tags.join(", "),
    "articleSection": article.category,
    "wordCount": article.content.split(' ').length,
    "isAccessibleForFree": true,
    "about": {
      "@type": "Thing",
      "name": "Immigration Services",
      "description": "Immigration consulting and visa services for Indians abroad"
    },
    "image": article.featuredImage || "https://www.indiansabroad.in/og-image.jpg"
  };
}