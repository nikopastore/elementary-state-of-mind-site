import Image from 'next/image';
import type { Product } from '@/lib/products';

export const categoryLabels: Record<string, string> = {
  'lesson-plan': 'Lesson Plan',
  worksheet: 'Worksheet',
  decor: 'Decor',
  bundle: 'Bundle',
};

export default function ProductCard({ id, name, description, price, category, image, tptUrl, isFree }: Product) {
  const free = isFree || price === 0;
  return (
    <article id={id} className="product-card" data-reveal="card">
      <a href={tptUrl} target="_blank" rel="noopener noreferrer" className="product-art" aria-label={name + ' on Teachers Pay Teachers'}>
        <Image src={image} alt="" fill sizes="(max-width: 570px) 90vw, (max-width: 940px) 44vw, 30vw" />
      </a>
      <div className="product-copy">
        <div className="product-meta"><span>{categoryLabels[category] ?? category}</span><strong>{free ? 'FREE' : '$' + (price / 100).toFixed(2)}</strong></div>
        <h3>{name}</h3>
        <p>{description}</p>
        <a href={tptUrl} target="_blank" rel="noopener noreferrer" className="product-link" aria-label={(free ? 'Get free on TPT: ' : 'View on TPT: ') + name}>{free ? 'Get Free on TPT' : 'View on TPT'}</a>
      </div>
    </article>
  );
}
