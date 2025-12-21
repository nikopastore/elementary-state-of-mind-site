import { products } from '@/lib/products';
import ProductCard from '@/components/ProductCard';

export default function ShopPage() {
  return (
    <div className="bg-cream min-h-screen py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-center text-charcoal mb-4">
          The Shop
        </h1>
        <p className="text-xl text-center text-charcoal/70 mb-12 max-w-2xl mx-auto">
          Beautiful, engaging digital resources for your classroom
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
}
