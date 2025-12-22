'use client';

import { motion } from 'framer-motion';
import { galleryPhotos } from '@/lib/galleryPhotos';
import GalleryPhoto from '@/components/GalleryPhoto';

export default function GalleryPage() {
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
          className="text-center mb-8 md:mb-12"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-black mb-2 md:mb-3">
            Products in Action
          </h1>
          <p className="text-gray text-base md:text-lg max-w-2xl mx-auto">
            See these resources come to life in real classrooms
          </p>
        </motion.div>

        {/* Pinterest-style masonry grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 md:gap-6 space-y-4 md:space-y-6">
          {galleryPhotos.map((photo, index) => (
            <div key={photo.id} className="break-inside-avoid">
              <GalleryPhoto photo={photo} index={index} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
