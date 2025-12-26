'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  name: string;
  href: string;
}

const pathNameMap: Record<string, string> = {
  'shop': 'Shop',
  'blog': 'Blog',
  'about': 'About',
  'gallery': 'Gallery',
};

export default function Breadcrumbs() {
  const pathname = usePathname();

  // Don't show on homepage
  if (pathname === '/') return null;

  const pathSegments = pathname.split('/').filter(Boolean);

  const breadcrumbs: BreadcrumbItem[] = [
    { name: 'Home', href: '/' },
  ];

  let currentPath = '';
  pathSegments.forEach((segment) => {
    currentPath += `/${segment}`;
    const name = pathNameMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
    breadcrumbs.push({ name, href: currentPath });
  });

  // Generate BreadcrumbList schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": `https://elementary-state-of-mind.com${crumb.href === '/' ? '' : crumb.href}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <nav aria-label="Breadcrumb" className="bg-lavender/50 py-2 px-4 sm:px-6">
        <div className="container mx-auto">
          <ol className="flex items-center flex-wrap gap-1 text-sm text-gray">
            {breadcrumbs.map((crumb, index) => (
              <li key={crumb.href} className="flex items-center">
                {index > 0 && (
                  <ChevronRight className="w-4 h-4 mx-1 text-gray/50" />
                )}
                {index === breadcrumbs.length - 1 ? (
                  <span className="text-purple font-medium" aria-current="page">
                    {index === 0 ? <Home className="w-4 h-4" /> : crumb.name}
                  </span>
                ) : (
                  <Link
                    href={crumb.href}
                    className="hover:text-purple transition-colors"
                  >
                    {index === 0 ? <Home className="w-4 h-4" /> : crumb.name}
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
