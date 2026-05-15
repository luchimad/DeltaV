import { MetadataRoute } from 'next'
import { getCollectionProducts } from '@/lib/fourthwall'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_CHECKOUT_DOMAIN 
    ? `https://${process.env.NEXT_PUBLIC_CHECKOUT_DOMAIN}` 
    : 'https://deltav-shop.fourthwall.com'
  
  // We'll fetch known collections to build the sitemap dynamically
  const collections = ['signature', 'aero']
  const productsMap = new Map()
  
  for (const slug of collections) {
    try {
      const prods = await getCollectionProducts(slug)
      prods.forEach(p => productsMap.set(p.slug, p))
    } catch (err) {
      console.error(`Sitemap: Failed to fetch collection ${slug}`, err)
    }
  }
  
  const productUrls = Array.from(productsMap.values()).map(p => ({
    url: `${baseUrl}/product/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const collectionUrls = collections.map(slug => ({
    url: `${baseUrl}/collection/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    ...collectionUrls,
    ...productUrls,
  ]
}
