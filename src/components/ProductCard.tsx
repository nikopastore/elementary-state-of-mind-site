'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Tag, Loader2, FileText, Palette, BookOpen, Package } from 'lucide-react';

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

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'lesson-plan':
      return <BookOpen className="w-8 h-8" />;
    case 'worksheet':
      return <FileText className="w-8 h-8" />;
    case 'decor':
      return <Palette className="w-8 h-8" />;
    case 'bundle':
      return <Package className="w-8 h-8" />;
    default:
      return <FileText className="w-8 h-8" />;
  }
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
  id,
  name,
  description,
  price,
  category,
}: ProductCardProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId: id }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error('No checkout URL returned');
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Checkout error:', error);
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      className="bg-warmWhite rounded-3xl shadow-lg overflow-hidden w-full max-w-sm font-body"
    >
      {/* Placeholder image area with category icon */}
      <div className="relative h-48 w-full bg-gradient-to-br from-sage/20 to-cream flex items-center justify-center">
        <div className="text-sage/60">
          {getCategoryIcon(category)}
        </div>
        <div className="absolute top-4 right-4 bg-terracotta text-white text-lg font-bold px-4 py-2 rounded-full shadow-md">
          {formatPrice(price)}
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center mb-3">
          <Tag className="h-4 w-4 text-sage mr-2" />
          <span className="bg-sage/20 text-sage text-sm font-semibold px-3 py-1 rounded-full">
            {getCategoryLabel(category)}
          </span>
        </div>
        <h3 className="text-xl font-heading font-bold text-charcoal mb-2">{name}</h3>
        <p className="text-charcoal/70 text-sm mb-6 line-clamp-2">{description}</p>
        <button
          onClick={handleCheckout}
          disabled={isLoading}
          className="w-full bg-terracotta hover:bg-terracotta/90 text-white font-semibold py-3 rounded-2xl flex items-center justify-center gap-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Processing...</span>
            </>
          ) : (
            <>
              <Download className="h-5 w-5" />
              <span>Buy Now</span>
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
}
