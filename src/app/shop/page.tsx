import { products } from '@/lib/products';
import ProductCard from '@/components/ProductCard';

export default function ShopPage() {
  return (
    <div className="bg-gradient-to-b from-lavender to-white min-h-screen py-10 md:py-14 lg:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-center text-black mb-3 md:mb-4">
          The Shop
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-center text-gray mb-8 md:mb-12 max-w-2xl mx-auto">
          Beautiful, engaging digital resources for your classroom
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-8 justify-items-center">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
}
