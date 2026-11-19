import { Metadata } from 'next';
import { products } from '@/lib/products';
import ShopCatalog from '@/components/ShopCatalog';

export const metadata: Metadata = {
  title: "Elementary Teaching Resources & Lesson Plans",
  description: "Beautiful, engaging digital resources for your classroom. Shop lesson plans, novel studies, anchor charts, and classroom decor for elementary teachers.",
  keywords: ["teacher resources", "digital downloads", "lesson plans", "novel studies", "anchor charts", "classroom decor", "teacherspayteachers", "elementary teaching materials"],
  openGraph: {
    title: "The Shop | Elementary State of Mind",
    description: "Beautiful, engaging digital resources for your classroom.",
    type: "website",
    url: "https://www.elementarystateofmind.com/shop",
    images: [
      {
        url: "https://www.elementarystateofmind.com/logo.png",
        width: 1200,
        height: 1200,
        alt: "Elementary State of Mind",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Shop | Elementary State of Mind",
    description: "Beautiful, engaging digital resources for your classroom.",
    images: ["https://www.elementarystateofmind.com/logo.png"],
  },
  alternates: {
    canonical: "https://www.elementarystateofmind.com/shop",
  },
};

export default function ShopPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Elementary teaching resources',
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => ({
      '@type': 'ListItem', position: index + 1, name: product.name,
      url: 'https://www.elementarystateofmind.com/shop/' + product.id,
    })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="content-page">
        <div className="site-width">
          <div className="page-title">
            <h1>The Shop</h1>
            <p>Browse novel studies, writing organizers, classroom activities and free downloads.</p>
          </div>
          <ShopCatalog products={products} />
        </div>
      </div>
    </>
  );
}
