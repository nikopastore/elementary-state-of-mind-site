'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { GalleryPhoto as GalleryPhotoType } from '@/lib/galleryPhotos';
import { products } from '@/lib/products';
import { X } from 'lucide-react';

interface GalleryPhotoProps {
  photo: GalleryPhotoType;
  index: number;
}

export default function GalleryPhoto({ photo, index }: GalleryPhotoProps) {
  const [isOpen, setIsOpen] = useState(false);
  const product = products.find((p) => p.id === photo.productId);

  // Close modal on Escape key
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleKeyDown]);

  if (!product) {
    return null;
  }

  return (
    <>
      {/* Thumbnail in gallery grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.05 }}
        className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-100">
          <Image
            src={photo.image}
            alt={photo.alt}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Caption and product info - shown on hover */}
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            {photo.caption && (
              <p className="text-sm font-medium mb-1">{photo.caption}</p>
            )}
            <p className="text-xs opacity-90 line-clamp-2">{product.name}</p>
          </div>
        </div>
      </motion.div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 sm:p-8"
            onClick={() => setIsOpen(false)}
          >
            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Close"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Modal content */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-4xl w-full max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image - clicking navigates to product */}
              <Link
                href={`/shop#${product.id}`}
                className="relative block w-full h-auto cursor-pointer group"
                onClick={() => setIsOpen(false)}
              >
                <div className="relative w-full aspect-[3/4] max-h-[70vh]">
                  <Image
                    src={photo.image}
                    alt={photo.alt}
                    fill
                    className="object-contain rounded-lg"
                    sizes="(max-width: 768px) 100vw, 80vw"
                    priority
                  />
                </div>
                {/* Hint to click for product */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-colors rounded-lg">
                  <span className="text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity bg-purple/80 px-4 py-2 rounded-full">
                    View Product
                  </span>
                </div>
              </Link>

              {/* Caption and product info */}
              <div className="mt-4 text-center text-white">
                {photo.caption && (
                  <p className="text-lg font-medium mb-1">{photo.caption}</p>
                )}
                <p className="text-sm opacity-80">{product.name}</p>
                <p className="text-xs opacity-60 mt-2">Click image to view product</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
