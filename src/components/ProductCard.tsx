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
      return <BookOpen className="w-10 h-10" />;
    case 'worksheet':
      return <FileText className="w-10 h-10" />;
    case 'decor':
      return <Palette className="w-10 h-10" />;
    case 'bundle':
      return <Package className="w-10 h-10" />;
    default:
      return <FileText className="w-10 h-10" />;
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

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'lesson-plan':
      return 'from-purple/20 to-lightPurple';
    case 'worksheet':
      return 'from-dustyRose/20 to-softPink/30';
    case 'decor':
      return 'from-coral/20 to-peach';
    case 'bundle':
      return 'from-lavenderGray/30 to-lightPurple/50';
    default:
      return 'from-purple/20 to-lightPurple';
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
      whileHover={{ scale: 1.03, y: -5 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      className="bg-white rounded-3xl shadow-soft overflow-hidden w-full max-w-sm font-body hover:shadow-glow transition-shadow"
    >
      {/* Placeholder image area with category icon */}
      <div className={`relative h-48 w-full bg-gradient-to-br ${getCategoryColor(category)} flex items-center justify-center`}>
        <div className="text-purple/50">
          {getCategoryIcon(category)}
        </div>
        <div className="absolute top-4 right-4 bg-dustyRose text-white text-lg font-bold px-4 py-2 rounded-full shadow-md">
          {formatPrice(price)}
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center mb-3">
          <Tag className="h-4 w-4 text-purple mr-2" />
          <span className="bg-lightPurple text-purple text-sm font-semibold px-3 py-1 rounded-full">
            {getCategoryLabel(category)}
          </span>
        </div>
        <h3 className="text-xl font-heading font-bold text-black mb-2">{name}</h3>
        <p className="text-gray text-sm mb-6 line-clamp-2">{description}</p>
        <button
          onClick={handleCheckout}
          disabled={isLoading}
          className="w-full bg-dustyRose hover:bg-purple text-white font-semibold py-3 rounded-2xl flex items-center justify-center gap-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
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
