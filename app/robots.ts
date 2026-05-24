import { MetadataRoute } from 'next'
import { BRAND } from '@/lib/brand/config'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/', '/about', '/services', '/destinations', '/success-stories',
          '/contact', '/careers', '/eligibility', '/news', '/news/*',
        ],
        disallow: [
          '/admin', '/test-news', '/signin', '/coming-soon',
          '/*.aspx', '/*DNN=*', '/*cid=*', '/home.aspx',
          '/api/', '/_next/', '/static/',
        ],
      },
      { userAgent: 'Googlebot', allow: '/' },
      { userAgent: 'Bingbot', allow: '/' },
      { userAgent: 'SemrushBot', disallow: '/' },
      { userAgent: 'AhrefsBot', disallow: '/' },
      { userAgent: 'MJ12bot', disallow: '/' },
    ],
    sitemap: `${BRAND.siteUrl}/sitemap.xml`,
  }
}
