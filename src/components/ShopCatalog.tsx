'use client';

import { useState } from 'react';
import ProductCard, { categoryLabels } from './ProductCard';
import type { Product } from '@/lib/products';

export default function ShopCatalog({ products }: { products: Product[] }) {
  const [category, setCategory] = useState('all');
  const filters = ['all', ...new Set(products.map((product) => product.category)), 'free'];

  const countFor = (filter: string) =>
    products.filter((product) =>
      filter === 'all' ||
      (filter === 'free' ? product.isFree || product.price === 0 : product.category === filter),
    ).length;

  const visible = products.filter((product) =>
    category === 'all' ||
    (category === 'free' ? product.isFree || product.price === 0 : product.category === category),
  );
  const featured = category === 'all' ? visible.filter((product) => product.featured) : [];
  const remaining = category === 'all' ? visible.filter((product) => !product.featured) : visible;

  return (
    <>
      <div className="catalog-tools">
        <div className="catalog-filters" role="group" aria-label="Filter resources">
          {filters.map((filter) => (
            <button
              type="button"
              key={filter}
              aria-pressed={category === filter}
              onClick={() => setCategory(filter)}
            >
              <span>
                {filter === 'all'
                  ? 'All'
                  : filter === 'free'
                    ? 'Free'
                    : categoryLabels[filter] ?? filter}
              </span>
              <span className="filter-count">{countFor(filter)}</span>
            </button>
          ))}
        </div>
        <p className="catalog-count" aria-live="polite">
          Showing <strong>{visible.length}</strong>{' '}
          {visible.length === 1 ? 'resource' : 'resources'}
        </p>
      </div>

      {featured.length > 0 && (
        <section className="catalog-section" aria-labelledby="catalog-featured">
          <div className="catalog-section-head" data-reveal="heading">
            <span className="section-kicker">Teacher Favorites</span>
            <h2 id="catalog-featured">Featured Resources</h2>
          </div>
          <div className="product-grid">
            {featured.map((product, index) => (
              <ProductCard key={product.id} {...product} staggerIndex={index} />
            ))}
          </div>
        </section>
      )}

      <section className="catalog-section" aria-labelledby="catalog-resources">
        <div className="catalog-section-head" data-reveal="heading">
          <span className="section-kicker">Digital Downloads</span>
          <h2 id="catalog-resources">
            {category === 'all'
              ? 'All Resources'
              : category === 'free'
                ? 'Free Resources'
                : categoryLabels[category] ?? category}
          </h2>
        </div>
        <div className="product-grid" key={category}>
          {remaining.map((product, index) => (
            <ProductCard key={product.id} {...product} staggerIndex={index} />
          ))}
        </div>
      </section>
    </>
  );
}
