import Image from 'next/image';
import { products } from '@/lib/products';
import ProductCard from '@/components/ProductCard';

export default function ShopPage() {
  const featuredProducts = products.filter((p) => p.featured);
  const allProducts = products.filter((p) => !p.featured);

  return (
    <div className="bg-gradient-to-b from-lavender to-white min-h-screen">
      {/* Banner Image Collage */}
      <div className="w-full relative h-28 sm:h-36 md:h-44 lg:h-52 overflow-hidden flex">
        {/* Left product images */}
        <div className="hidden md:flex flex-1 gap-1">
          <div className="relative flex-1">
            <Image src="/products/space-case-complete.jpg" alt="" fill className="object-cover" />
          </div>
          <div className="relative flex-1">
            <Image src="/products/oreo-opinion-writing.jpg" alt="" fill className="object-cover" />
          </div>
          <div className="relative flex-1">
            <Image src="/products/ela-anchor-charts.jpg" alt="" fill className="object-cover" />
          </div>
        </div>

        {/* Center main banner */}
        <div className="relative flex-[2] md:flex-[3]">
          <Image
            src="/shop-banner.webp"
            alt="Elementary State of Mind Shop"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Right product images */}
        <div className="hidden md:flex flex-1 gap-1">
          <div className="relative flex-1">
            <Image src="/products/67th-day.jpg" alt="" fill className="object-cover" />
          </div>
          <div className="relative flex-1">
            <Image src="/products/letter-to-teacher.jpg" alt="" fill className="object-cover" />
          </div>
          <div className="relative flex-1">
            <Image src="/products/kpop-demonhunters.jpg" alt="" fill className="object-cover" />
          </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-lavender pointer-events-none" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-10 md:py-14 lg:py-16">
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
