import { MetadataRoute } from 'next';
import { posts } from '@/lib/posts';
import { products } from '@/lib/products';
import { SITE_URL } from '@/lib/seo';

const SITE_LAST_UPDATED = new Date('2026-11-19');

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: SITE_LAST_UPDATED,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/shop`,
      lastModified: SITE_LAST_UPDATED,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: SITE_LAST_UPDATED,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/gallery`,
      lastModified: SITE_LAST_UPDATED,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: SITE_LAST_UPDATED,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
  ];

  const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${SITE_URL}/shop/${product.id}`,
    lastModified: SITE_LAST_UPDATED,
    changeFrequency: 'monthly',
    priority: product.featured ? 0.9 : 0.8,
    images: [`${SITE_URL}${product.image}`],
  }));

  const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly',
    priority: 0.8,
    ...(post.images && post.images.length > 0
      ? { images: post.images.map((img) => `${SITE_URL}${img}`) }
      : {}),
  }));

  return [...staticRoutes, ...productRoutes, ...blogRoutes];
}
