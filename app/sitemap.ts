import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.indiansabroad.in'
  
  // Static pages
  const staticPages = [
    '',
    '/about',
    '/services',
    '/destinations',
    '/success-stories',
    '/contact',
    '/careers',
    '/eligibility',
    '/news',
    '/terms'
  ]
  
  const staticRoutes = staticPages.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' || route === '/news' ? 'daily' as const : 'weekly' as const,
    priority: route === '' ? 1.0 : route === '/contact' || route === '/services' ? 0.9 : 0.8,
  }))

  // Add news articles (we'll fetch these dynamically in a real app)
  // For now, we'll add a placeholder pattern
  const newsRoutes = [
    {
      url: `${baseUrl}/news/sample-article`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }
  ]

  return [...staticRoutes, ...newsRoutes]
}