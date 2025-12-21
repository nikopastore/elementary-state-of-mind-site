'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ShoppingCart, Download, Tag } from 'lucide-react';

type ProductCardProps = {
  id: string;
  name: string;
  description: string;
  price: number; // in cents
  category: string;
  image: string;
};

const formatPrice = (priceInCents: number) => {
  return `$${(priceInCents / 100).toFixed(2)}`;
};

export default function ProductCard({
  id,
  name,
  description,
  price,
  category,
  image,
}: ProductCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      className="bg-cream rounded-3xl shadow-lg overflow-hidden w-full max-w-sm font-sans"
    >
      <div className="relative h-56 w-full">
        <Image
          src={image}
          alt={name}
          layout="fill"
          objectFit="cover"
        />
        <div className="absolute top-4 right-4 bg-terracotta text-white text-lg font-bold px-4 py-2 rounded-full shadow-md">
          {formatPrice(price)}
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center mb-2">
          <Tag className="h-5 w-5 text-sage mr-2" />
          <span className="bg-sage text-white text-sm font-semibold px-3 py-1 rounded-full">
            {category}
          </span>
        </div>
        <h3 className="text-2xl font-bold text-charcoal mb-2">{name}</h3>
        <p className="text-charcoal/80 mb-6">{description}</p>
        <button className="w-full bg-charcoal text-white font-bold py-3 rounded-xl flex items-center justify-center space-x-2 transition-transform transform hover:scale-105 active:scale-95">
          <Download className="h-5 w-5" />
          <span>Download Now</span>
        </button>
      </div>
    </motion.div>
  );
}
