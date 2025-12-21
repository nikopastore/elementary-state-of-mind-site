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
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      className="bg-white rounded-2xl md:rounded-3xl shadow-soft overflow-hidden w-full max-w-[340px] lg:max-w-sm font-body hover:shadow-glow transition-shadow"
    >
      {/* Product image */}
      <div className="relative h-44 sm:h-48 md:h-52 w-full overflow-hidden bg-lavender/30">
        <Image
          src={image}
          alt={name}
          fill
          className="object-contain p-2"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className={`absolute top-3 right-3 md:top-4 md:right-4 ${isProductFree ? 'bg-purple' : 'bg-dustyRose'} text-white text-base md:text-lg font-bold px-3 md:px-4 py-1.5 md:py-2 rounded-full shadow-md`}>
          {priceDisplay}
        </div>
      </div>
      <div className="p-4 sm:p-5 md:p-6">
        <div className="flex items-center mb-2 md:mb-3">
          <Tag className="h-3.5 w-3.5 md:h-4 md:w-4 text-purple mr-1.5 md:mr-2" />
          <span className="bg-lightPurple text-purple text-xs md:text-sm font-semibold px-2.5 md:px-3 py-0.5 md:py-1 rounded-full">
            {getCategoryLabel(category)}
          </span>
        </div>
        <h3 className="text-lg md:text-xl font-heading font-bold text-black mb-1.5 md:mb-2 line-clamp-2">{name}</h3>
        <p className="text-gray text-xs md:text-sm mb-4 md:mb-6 line-clamp-2">{description}</p>
        <button
          onClick={handleClick}
          className={`w-full ${isProductFree ? 'bg-purple hover:bg-dustyRose' : 'bg-dustyRose hover:bg-purple'} text-white font-semibold py-2.5 md:py-3 rounded-xl md:rounded-2xl flex items-center justify-center gap-1.5 md:gap-2 transition-all shadow-md hover:shadow-lg text-sm md:text-base`}
        >
          <ExternalLink className="h-4 w-4 md:h-5 md:w-5" />
          <span>{isProductFree ? 'Get Free on TPT' : 'View on TPT'}</span>
        </button>
      </div>
    </motion.div>
  );
}
