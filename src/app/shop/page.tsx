import { Metadata } from 'next';
import { products } from '@/lib/products';
import ShopCatalog from '@/components/ShopCatalog';
import { ORG_ID, SITE_URL, WEBSITE_ID, buildProductSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'The Shop — Elementary ELA, Writing & PBL Resources',
  description:
    'Browse 26 classroom-tested digital teaching resources by Dr. Zoe Pastore, Ed.D. Mock trial PBL units, OREO & CER writing packets, anchor charts, classroom decor, and free graphic organizers.',
  keywords: [
    'teacher resources',
    'digital downloads',
    'elementary lesson plans',
    'Space Case Mock Trial',
    'OREO opinion writing',
    'ELA graphic organizers',
    'anchor charts',
    'Teachers Pay Teachers',
  ],
  openGraph: {
    title: 'The Shop — Elementary ELA, Writing & PBL Resources',
    description:
      'Shop 26 classroom-tested digital resources for grades 3–8 educators, including free graphic organizers and novel study PBL units.',
    type: 'website',
    url: `${SITE_URL}/shop`,
    images: [
      {
        url: `${SITE_URL}/logo.png`,
        width: 1200,
        height: 1200,
        alt: 'Elementary State of Mind Shop',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Shop — Elementary ELA, Writing & PBL Resources',
    description:
      'Classroom-tested digital lesson plans, writing organizers, and decor for grades 3–8 educators.',
    images: [`${SITE_URL}/logo.png`],
  },
  alternates: {
    canonical: `${SITE_URL}/shop`,
  },
};

export default function ShopPage() {
  const collectionSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${SITE_URL}/shop#collection`,
        url: `${SITE_URL}/shop`,
        name: 'The Shop — Elementary State of Mind Teaching Resources',
        description:
          'Complete catalog of 26 digital teaching resources for grades 3–8 elementary educators.',
        isPartOf: { '@id': WEBSITE_ID },
        about: { '@id': ORG_ID },
        mainEntity: { '@id': `${SITE_URL}/shop#itemlist` },
      },
      {
        '@type': 'ItemList',
        '@id': `${SITE_URL}/shop#itemlist`,
        name: 'Elementary State of Mind Teaching Resources',
        numberOfItems: products.length,
        itemListElement: products.map((product, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          url: `${SITE_URL}/shop/${product.id}`,
          item: buildProductSchema(product),
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      <div className="content-page">
        <div className="site-width">
          <div className="page-title">
            <span className="section-kicker">26 Digital Downloads · Grades 3–8</span>
            <h1>The Shop</h1>
            <p>Beautiful, engaging digital resources for your classroom</p>
          </div>
          <ShopCatalog products={products} />
        </div>
      </div>
    </>
  );
}
