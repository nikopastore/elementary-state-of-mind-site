import type { Product } from '@/lib/products';

export type TptTrafficSource = 'shop' | 'blog' | 'gallery';

type TptProduct = Pick<Product, 'id' | 'tptUrl'>;

/** Build one consistently tagged TPT URL for every site surface. */
export function getTptUrl(
  product: TptProduct,
  source: TptTrafficSource,
  campaign = product.id,
): string {
  const url = new URL(product.tptUrl);
  url.searchParams.set('utm_source', 'esom_site');
  url.searchParams.set('utm_medium', source);
  url.searchParams.set('utm_campaign', campaign);
  return url.toString();
}
