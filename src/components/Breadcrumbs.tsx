'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';
import { products } from '@/lib/products';
import { posts } from '@/lib/posts';

interface BreadcrumbItem {
  name: string;
  href: string;
}

const pathNameMap: Record<string, string> = {
  shop: 'Shop',
  blog: 'Blog',
  about: 'About',
  gallery: 'Gallery',
};

const productTitles = new Map(products.map((p) => [p.id, p.name]));
const postTitles = new Map(posts.map((p) => [p.slug, p.title]));

function resolveSegmentName(segment: string, parentSegment?: string): string {
  if (parentSegment === 'shop') {
    const productName = productTitles.get(segment);
    if (productName) return productName;
  }
  if (parentSegment === 'blog') {
    const postTitle = postTitles.get(segment);
    if (postTitle) return postTitle;
  }
  return (
    pathNameMap[segment] ||
    segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ')
  );
}

export default function Breadcrumbs() {
  const pathname = usePathname();

  if (pathname === '/' || pathname === '/success') return null;

  const pathSegments = pathname.split('/').filter(Boolean);

  const breadcrumbs: BreadcrumbItem[] = [{ name: 'Home', href: '/' }];

  let currentPath = '';
  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const name = resolveSegmentName(segment, pathSegments[index - 1]);
    breadcrumbs.push({ name, href: currentPath });
  });

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: `https://www.elementarystateofmind.com${crumb.href === '/' ? '' : crumb.href}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <nav aria-label="Breadcrumb" className="site-breadcrumbs">
        <div className="site-width">
          <ol className="breadcrumbs-list">
            {breadcrumbs.map((crumb, index) => (
              <li key={crumb.href} className="breadcrumb-item">
                {index > 0 && (
                  <ChevronRight className="breadcrumb-sep" size={14} aria-hidden="true" />
                )}
                {index === breadcrumbs.length - 1 ? (
                  <span className="breadcrumb-current" aria-current="page">
                    {index === 0 ? <Home size={14} aria-label="Home" /> : crumb.name}
                  </span>
                ) : (
                  <Link href={crumb.href} className="breadcrumb-link">
                    {index === 0 ? <Home size={14} aria-label="Home" /> : crumb.name}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </div>
      </nav>
    </>
  );
}
