import { MetadataRoute } from 'next'
import { fetchQuery } from 'convex/nextjs'
import { api } from '@/convex/_generated/api'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.indiansabroad.in'
  
  // Static pages with optimized priorities and change frequencies
  const staticPages = [
    { path: '', changeFreq: 'daily', priority: 1.0 },
    { path: '/services', changeFreq: 'weekly', priority: 0.95 },
    { path: '/contact', changeFreq: 'monthly', priority: 0.9 },
    { path: '/destinations', changeFreq: 'weekly', priority: 0.85 },
    { path: '/about', changeFreq: 'monthly', priority: 0.8 },
    { path: '/success-stories', changeFreq: 'weekly', priority: 0.8 },
    { path: '/eligibility', changeFreq: 'weekly', priority: 0.75 },
    { path: '/careers', changeFreq: 'weekly', priority: 0.7 },
    { path: '/news', changeFreq: 'daily', priority: 0.9 },
    { path: '/terms', changeFreq: 'yearly', priority: 0.3 },
  ]
  
  const staticRoutes: MetadataRoute.Sitemap = staticPages.map((page) => ({
    url: `${baseUrl}${page.path}`,
    lastModified: new Date(),
    changeFrequency: page.changeFreq as 'daily' | 'weekly' | 'monthly' | 'yearly',
    priority: page.priority,
  }))

  // Fetch dynamic news articles from Convex
  let newsRoutes: MetadataRoute.Sitemap = []
  
  try {
    // Fetch all published news articles
    const articles = await fetchQuery(api.news.getPublished, {
      limit: 1000 // Adjust based on your needs
    })
    
    if (articles && articles.length > 0) {
      newsRoutes = articles.map((article) => ({
        url: `${baseUrl}/news/${article._id}`,
        lastModified: article.updatedAt ? new Date(article.updatedAt) : new Date(article.createdAt),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
        images: article.featuredImage ? [article.featuredImage] : undefined,
      }))
    }
  } catch (error) {
    // If Convex fetch fails, continue with static routes only
    console.error('Failed to fetch news articles for sitemap:', error)
  }

  // Additional important pages that might be added in the future
  const additionalRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/sitemap.xml`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.3,
    }
  ]

  return [...staticRoutes, ...newsRoutes, ...additionalRoutes]
}