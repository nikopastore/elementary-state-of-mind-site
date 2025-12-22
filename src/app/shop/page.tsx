import { Metadata } from 'next';
import { products } from '@/lib/products';
import ProductCard from '@/components/ProductCard';

export const metadata: Metadata = {
  title: "The Shop | Elementary State of Mind",
  description: "Beautiful, engaging digital resources for your classroom. Shop lesson plans, novel studies, anchor charts, and classroom decor for elementary teachers.",
  keywords: ["teacher resources", "digital downloads", "lesson plans", "novel studies", "anchor charts", "classroom decor", "teacherspayteachers"],
  openGraph: {
    title: "The Shop | Elementary State of Mind",
    description: "Beautiful, engaging digital resources for your classroom.",
    type: "website",
    url: "https://elementary-state-of-mind.com/shop",
    images: [
      {
        url: "https://elementary-state-of-mind.com/logo.png",
        width: 1200,
        height: 630,
        alt: "Elementary State of Mind",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Shop | Elementary State of Mind",
    description: "Beautiful, engaging digital resources for your classroom.",
    images: ["https://elementary-state-of-mind.com/logo.png"],
  },
  alternates: {
    canonical: "https://elementary-state-of-mind.com/shop",
  },
};

export default function ShopPage() {
  const featuredProducts = products.filter((p) => p.featured);
  const allProducts = products.filter((p) => !p.featured);

  return (
    <div className="bg-gradient-to-b from-lavender to-white min-h-screen py-10 md:py-14 lg:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-center text-black mb-3 md:mb-4">
          The Shop
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-center text-gray mb-8 md:mb-12 max-w-2xl mx-auto">
          Beautiful, engaging digital resources for your classroom
        </p>

        {/* Featured Section */}
        {featuredProducts.length > 0 && (
          <div className="mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-center text-purple mb-6 md:mb-8">
              Featured Resources
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-8 justify-items-center">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </div>
        )}

        {/* All Products Section */}
        <h2 className="text-2xl sm:text-3xl font-heading font-bold text-center text-black mb-6 md:mb-8">
          All Resources
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-8 justify-items-center">
          {allProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
}
