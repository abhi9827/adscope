import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/saved/', '/compare/', '/internal/', '/internal'],
    },
    sitemap: 'https://adscope.dev/sitemap.xml',
  }
}
