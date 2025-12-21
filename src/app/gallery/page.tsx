'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import FlipBook from '@/components/FlipBook';

const galleryPages = [
  '/gallery/page-1.png',
  '/gallery/page-2.png',
  '/gallery/page-3.png',
  '/gallery/page-4.png',
  '/gallery/page-5.png',
  '/gallery/page-6.png',
  '/gallery/page-7.png',
  '/gallery/page-8.png',
];

export default function GalleryPage() {
  // Add keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        const buttons = document.querySelectorAll('button[aria-label*="page"]');
        if (e.key === 'ArrowLeft') {
          (buttons[0] as HTMLButtonElement)?.click();
        } else {
          (buttons[1] as HTMLButtonElement)?.click();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen py-8 md:py-12 lg:py-16">
      {/* Background decorations - responsive sizing */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-lavender via-white to-lavender/30" />
        <div className="absolute top-40 right-10 md:right-20 w-48 md:w-64 h-48 md:h-64 bg-purple/10 rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-10 md:left-20 w-56 md:w-80 h-56 md:h-80 bg-dustyRose/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6">
        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6 md:mb-8 lg:mb-10"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-black mb-2 md:mb-3">
            Gallery
          </h1>
          <p className="text-gray text-base md:text-lg max-w-2xl mx-auto">
            Flip through my visual resume and teaching journey
          </p>
        </motion.div>

        {/* FlipBook */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <FlipBook pages={galleryPages} />
        </motion.div>
      </div>
    </div>
  );
}
