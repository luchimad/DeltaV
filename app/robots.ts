import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_CHECKOUT_DOMAIN 
    ? `https://${process.env.NEXT_PUBLIC_CHECKOUT_DOMAIN}` 
    : 'https://deltav-shop.fourthwall.com'

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
