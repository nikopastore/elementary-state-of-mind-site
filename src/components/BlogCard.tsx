'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, Tag, ArrowRight } from 'lucide-react';

type BlogCardProps = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
};

const getCategoryLabel = (category: string) => {
  switch (category) {
    case 'classroom':
      return 'Classroom';
    case 'tips':
      return 'Tips & Tricks';
    case 'resources':
      return 'Resources';
    case 'personal':
      return 'Personal';
    default:
      return category;
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export default function BlogCard({
  slug,
  title,
  excerpt,
  date,
  category,
}: BlogCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      className="bg-white rounded-2xl md:rounded-3xl shadow-soft overflow-hidden w-full font-body hover:shadow-glow transition-shadow"
    >
      <div className="p-5 sm:p-6 md:p-8">
        <div className="flex flex-wrap items-center gap-3 mb-3 md:mb-4">
          <div className="flex items-center">
            <Tag className="h-3.5 w-3.5 md:h-4 md:w-4 text-purple mr-1.5" />
            <span className="bg-lightPurple text-purple text-xs md:text-sm font-semibold px-2.5 py-0.5 rounded-full">
              {getCategoryLabel(category)}
            </span>
          </div>
          <div className="flex items-center text-gray text-xs md:text-sm">
            <Calendar className="h-3.5 w-3.5 md:h-4 md:w-4 mr-1.5" />
            {formatDate(date)}
          </div>
        </div>
        <h3 className="text-xl md:text-2xl font-heading font-bold text-black mb-2 md:mb-3">
          {title}
        </h3>
        <p className="text-gray text-sm md:text-base mb-4 md:mb-6 line-clamp-3">
          {excerpt}
        </p>
        <Link
          href={`/blog/${slug}`}
          className="inline-flex items-center gap-2 bg-dustyRose hover:bg-purple text-white font-semibold py-2.5 md:py-3 px-5 md:px-6 rounded-xl md:rounded-2xl transition-all shadow-md hover:shadow-lg text-sm md:text-base"
        >
          <span>Read More</span>
          <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
        </Link>
      </div>
    </motion.div>
  );
}
