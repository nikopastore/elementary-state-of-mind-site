import Hero from '@/components/Hero';
import ProductCard from '@/components/ProductCard';
import { products } from '@/lib/products';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Hero />
      <section className="home-featured">
        <div className="site-width">
          <div className="section-heading" data-reveal="heading">
            <div>
              <h2>Featured Resources</h2>
              <p>Handpicked digital resources to make your classroom shine</p>
            </div>
            <Link href="/shop" className="button button-outline">View All Products</Link>
          </div>
          <div className="product-grid feature-grid">
            {products.slice(0, 3).map((product) => <ProductCard key={product.id} {...product} />)}
          </div>
        </div>
      </section>
    </>
  );
}
