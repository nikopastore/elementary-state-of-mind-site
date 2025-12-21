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
    <div className="min-h-screen py-12 md:py-16">
      {/* Background decorations */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-lavender via-white to-lavender/30" />
        <div className="absolute top-40 right-20 w-64 h-64 bg-purple/10 rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-20 w-80 h-80 bg-dustyRose/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-black mb-3">
            Gallery
          </h1>
          <p className="text-gray text-lg max-w-2xl mx-auto">
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
