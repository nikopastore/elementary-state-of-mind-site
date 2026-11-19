import type { MetadataRoute } from 'next';
import { posts } from '@/lib/posts';
import { products } from '@/lib/products';

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = 'https://www.elementarystateofmind.com';
  return [
    ...['/', '/blog', '/shop', '/about', '/gallery'].map(path => ({ url: origin + path })),
    ...posts.map(post => ({ url: origin + '/blog/' + post.slug })),
    ...products.map(product => ({ url: origin + '/shop/' + product.id, images: [origin + product.image] })),
  ];
}
