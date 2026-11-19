'use client';

import { useState } from 'react';
import ProductCard, { categoryLabels } from './ProductCard';
import type { Product } from '@/lib/products';

export default function ShopCatalog({ products }: { products: Product[] }) {
  const [category, setCategory] = useState('all');
  const filters = ['all', ...new Set(products.map((product) => product.category)), 'free'];
  const visible = products.filter((product) =>
    category === 'all' || (category === 'free' ? product.isFree || product.price === 0 : product.category === category)
  );
  const featured = category === 'all' ? visible.filter((product) => product.featured) : [];
  const remaining = category === 'all' ? visible.filter((product) => !product.featured) : visible;

  return (
    <>
      <div className="catalog-tools">
        <div className="catalog-filters" role="group" aria-label="Filter resources">
          {filters.map((filter) => (
            <button type="button" key={filter} aria-pressed={category === filter} onClick={() => setCategory(filter)}>
              {filter === 'all' ? 'All' : filter === 'free' ? 'Free' : categoryLabels[filter] ?? filter}
            </button>
          ))}
        </div>
        <p aria-live="polite">{visible.length} {visible.length === 1 ? 'resource' : 'resources'}</p>
      </div>
      {featured.length > 0 && (
        <section className="catalog-section" aria-labelledby="catalog-featured">
          <h2 id="catalog-featured" data-reveal="heading">Featured Resources</h2>
          <div className="product-grid">{featured.map((product) => <ProductCard key={product.id} {...product} />)}</div>
        </section>
      )}
      <section className="catalog-section" aria-labelledby="catalog-resources">
        <h2 id="catalog-resources" data-reveal="heading">{category === 'all' ? 'All Resources' : category === 'free' ? 'Free Resources' : categoryLabels[category] ?? category}</h2>
        <div className="product-grid">{remaining.map((product) => <ProductCard key={product.id} {...product} />)}</div>
      </section>
    </>
  );
}
