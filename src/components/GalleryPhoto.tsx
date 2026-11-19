'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { GalleryPhoto as GalleryPhotoType } from '@/lib/galleryPhotos';
import { products } from '@/lib/products';
import { X } from 'lucide-react';

interface GalleryPhotoProps {
  photo: GalleryPhotoType;
  thumbnailSizes: string;
}

export default function GalleryPhoto({ photo, thumbnailSizes }: GalleryPhotoProps) {
  const [isOpen, setIsOpen] = useState(false);
  const thumbnail = useRef<HTMLButtonElement>(null);
  const reducedMotion = useReducedMotion();
  const product = products.find((p) => p.id === photo.productId);

  const closePhoto = useCallback(() => {
    setIsOpen(false);
    thumbnail.current?.focus();
  }, []);

  // Close modal on Escape key
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      closePhoto();
    }
  }, [closePhoto]);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, handleKeyDown]);

  if (!product) {
    return null;
  }

  return (
    <>
      {/* Thumbnail in gallery grid */}
      <button
        ref={thumbnail}
        type="button"
        aria-haspopup="dialog"
        aria-label={`Open photo: ${photo.alt}`}
        className="book-photo-button"
        onClick={() => setIsOpen(true)}
      >
        <span className="book-photo-frame">
          <Image
            src={photo.image}
            alt={photo.alt}
            fill
            className="book-photo-image"
            sizes={thumbnailSizes}
            loading="eager"
          />

        </span>
      </button>

      {/* Lightbox Modal */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {isOpen && (
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={photo.alt}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.2 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 sm:p-8"
              onClick={closePhoto}
            >
              {/* Close button */}
              <button
                onClick={closePhoto}
                className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Close"
                autoFocus
              >
                <X className="w-6 h-6 text-white" />
              </button>

              {/* Modal content */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: reducedMotion ? 0 : 0.2 }}
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
        </AnimatePresence>,
        document.body,
      )}
    </>
  );
}
