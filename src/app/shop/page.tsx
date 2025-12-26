import { Metadata } from 'next';
import { products } from '@/lib/products';
import ProductCard from '@/components/ProductCard';

export const metadata: Metadata = {
  title: "The Shop | Elementary State of Mind",
  description: "Beautiful, engaging digital resources for your classroom. Shop lesson plans, novel studies, anchor charts, and classroom decor for elementary teachers.",
  keywords: ["teacher resources", "digital downloads", "lesson plans", "novel studies", "anchor charts", "classroom decor", "teacherspayteachers", "elementary teaching materials"],
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

// Generate Product schema for each product with enhanced digital product info
function generateProductSchema(product: typeof products[0]) {
  const categoryName = product.category === 'lesson-plan' ? 'Lesson Plans' :
                       product.category === 'worksheet' ? 'Worksheets' :
                       product.category === 'decor' ? 'Classroom Decor' :
                       product.category === 'bundle' ? 'Resource Bundles' : product.category;

  return {
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: `https://elementary-state-of-mind.com${product.image}`,
    url: product.tptUrl,
    brand: {
      "@type": "Brand",
      name: "Elementary State of Mind",
    },
    offers: {
      "@type": "Offer",
      price: product.isFree ? "0.00" : (product.price / 100).toFixed(2),
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: product.tptUrl,
      seller: {
        "@type": "Organization",
        name: "Elementary State of Mind",
      },
      itemCondition: "https://schema.org/NewCondition",
      priceValidUntil: "2025-12-31",
    },
    category: categoryName,
    isAccessoryOrSparePartFor: {
      "@type": "EducationalOccupationalProgram",
      name: "Elementary Education",
    },
    audience: {
      "@type": "EducationalAudience",
      educationalRole: "Teacher",
      audienceType: "Elementary Educators",
    },
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "File Format",
        value: "PDF, Google Slides",
      },
      {
        "@type": "PropertyValue",
        name: "Delivery Method",
        value: "Instant Digital Download",
      },
    ],
  };
}

// Generate OfferCatalog schema for the entire store
function generateOfferCatalogSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: "Elementary State of Mind Teaching Resources",
    description: "Complete catalog of digital teaching resources for elementary educators",
    url: "https://elementary-state-of-mind.com/shop",
    publisher: {
      "@type": "Organization",
      name: "Elementary State of Mind",
      url: "https://elementary-state-of-mind.com",
    },
    numberOfItems: products.length,
    itemListOrder: "https://schema.org/ItemListOrderDescending",
  };
}

export default function ShopPage() {
  const featuredProducts = products.filter((p) => p.featured);
  const allProducts = products.filter((p) => !p.featured);

  // Generate ItemList schema for all products
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Elementary State of Mind Teaching Resources",
    description: "Digital teaching resources for elementary educators including lesson plans, worksheets, and classroom decor.",
    url: "https://elementary-state-of-mind.com/shop",
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: generateProductSchema(product),
    })),
  };

  // Generate individual Product schemas for featured products (for rich snippets)
  const featuredProductSchemas = featuredProducts.map(product => ({
    "@context": "https://schema.org",
    ...generateProductSchema(product),
  }));

  // Generate OfferCatalog schema
  const offerCatalogSchema = generateOfferCatalogSchema();

  // Store aggregate rating schema
  const storeRatingSchema = {
    "@context": "https://schema.org",
    "@type": "Store",
    name: "Elementary State of Mind Shop",
    description: "Digital teaching resources for elementary educators",
    url: "https://elementary-state-of-mind.com/shop",
    image: "https://elementary-state-of-mind.com/logo.png",
    priceRange: "$0 - $15",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.95",
      bestRating: "5",
      worstRating: "1",
      ratingCount: "43",
      reviewCount: "43",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Teaching Resources",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Product", name: "Lesson Plans" } },
        { "@type": "Offer", itemOffered: { "@type": "Product", name: "Worksheets" } },
        { "@type": "Offer", itemOffered: { "@type": "Product", name: "Novel Studies" } },
        { "@type": "Offer", itemOffered: { "@type": "Product", name: "Classroom Decor" } },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(offerCatalogSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(storeRatingSchema) }}
      />
      {featuredProductSchemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

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
    </>
  );
}
