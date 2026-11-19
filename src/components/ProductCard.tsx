import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import type { Product } from '@/lib/products';

export const categoryLabels: Record<string, string> = {
  'lesson-plan': 'Lesson Plan',
  worksheet: 'Worksheet',
  decor: 'Decor',
  bundle: 'Bundle',
};

type ProductCardProps = Product & {
  staggerIndex?: number;
};

export default function ProductCard({
  id,
  name,
  description,
  price,
  category,
  image,
  tptUrl,
  isFree,
  staggerIndex = 0,
}: ProductCardProps) {
  const free = isFree || price === 0;
  return (
    <article
      id={id}
      className="product-card"
      data-reveal="card"
      data-stagger={staggerIndex % 3}
    >
      <a
        href={tptUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="product-art"
        aria-label={name + ' on Teachers Pay Teachers'}
      >
        <Image
          src={image}
          alt=""
          fill
          sizes="(max-width: 570px) 90vw, (max-width: 940px) 44vw, 30vw"
        />
      </a>
      <div className="product-copy">
        <div className="product-meta">
          <span className="product-category-pill">
            {categoryLabels[category] ?? category}
          </span>
          <strong className={free ? 'product-price is-free' : 'product-price'}>
            {free ? 'FREE' : '$' + (price / 100).toFixed(2)}
          </strong>
        </div>
        <h3>{name}</h3>
        <p>{description}</p>
        <a
          href={tptUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="product-link product-card-cta"
          aria-label={(free ? 'Get free on TPT: ' : 'View on TPT: ') + name}
        >
          <span>{free ? 'Get Free on TPT' : 'View on TPT'}</span>
          <ArrowUpRight size={15} aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}
