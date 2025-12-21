'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Tag, ExternalLink } from 'lucide-react';

type ProductCardProps = {
  id: string;
  name: string;
  description: string;
  price: number; // in cents
  category: string;
  image: string;
  tptUrl: string;
  isFree?: boolean;
};

const formatPrice = (priceInCents: number, isFree?: boolean) => {
  if (isFree || priceInCents === 0) return 'FREE';
  return `$${(priceInCents / 100).toFixed(2)}`;
};

const getCategoryLabel = (category: string) => {
  switch (category) {
    case 'lesson-plan':
      return 'Lesson Plan';
    case 'worksheet':
      return 'Worksheet';
    case 'decor':
      return 'Decor';
    case 'bundle':
      return 'Bundle';
    default:
      return category;
  }
};

export default function ProductCard({
  name,
  description,
  price,
  category,
  image,
  tptUrl,
  isFree,
}: ProductCardProps) {
  const handleClick = () => {
    if (tptUrl) {
      window.open(tptUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const priceDisplay = formatPrice(price, isFree);
  const isProductFree = isFree || price === 0;

  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -5 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      className="bg-white rounded-3xl shadow-soft overflow-hidden w-full max-w-sm font-body hover:shadow-glow transition-shadow"
    >
      {/* Product image */}
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className={`absolute top-4 right-4 ${isProductFree ? 'bg-purple' : 'bg-dustyRose'} text-white text-lg font-bold px-4 py-2 rounded-full shadow-md`}>
          {priceDisplay}
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center mb-3">
          <Tag className="h-4 w-4 text-purple mr-2" />
          <span className="bg-lightPurple text-purple text-sm font-semibold px-3 py-1 rounded-full">
            {getCategoryLabel(category)}
          </span>
        </div>
        <h3 className="text-xl font-heading font-bold text-black mb-2 line-clamp-2">{name}</h3>
        <p className="text-gray text-sm mb-6 line-clamp-2">{description}</p>
        <button
          onClick={handleClick}
          className={`w-full ${isProductFree ? 'bg-purple hover:bg-dustyRose' : 'bg-dustyRose hover:bg-purple'} text-white font-semibold py-3 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg`}
        >
          <ExternalLink className="h-5 w-5" />
          <span>{isProductFree ? 'Get Free on TPT' : 'View on TPT'}</span>
        </button>
      </div>
    </motion.div>
  );
}
