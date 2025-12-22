'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { GalleryPhoto as GalleryPhotoType } from '@/lib/galleryPhotos';
import { products } from '@/lib/products';

interface GalleryPhotoProps {
  photo: GalleryPhotoType;
  index: number;
}

export default function GalleryPhoto({ photo, index }: GalleryPhotoProps) {
  const product = products.find((p) => p.id === photo.productId);

  if (!product) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
    >
      <Link href={product.tptUrl} target="_blank" rel="noopener noreferrer">
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
      </Link>
    </motion.div>
  );
}
