'use client';

import { motion, Variants } from 'framer-motion';
import Image from 'next/image';

type ImageProps = {
  src: string;
  alt: string;
};

type MasonryGalleryProps = {
  images?: ImageProps[];
};

const galleryVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const imageVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 100,
      damping: 10,
    },
  },
};

const placeholderVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 100,
      damping: 10,
    },
  },
};

const MasonryGallery = ({ images }: MasonryGalleryProps) => {
  const hasImages = images && images.length > 0;

  return (
    <motion.div
      className="columns-1 gap-4 sm:columns-2 lg:columns-3"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={galleryVariants}
    >
      {hasImages ? (
        images.map((image, index) => (
          <motion.div
            key={index}
            className="mb-4 break-inside-avoid"
            variants={imageVariants}
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={500}
              height={500}
              className="h-auto w-full rounded-2xl shadow-md transition-transform duration-300 ease-in-out hover:scale-105"
            />
          </motion.div>
        ))
      ) : (
        [...Array(6)].map((_, index) => (
            <motion.div 
                key={index}
                variants={placeholderVariants}
                className="mb-4 break-inside-avoid"
            >
                <div className="flex h-48 w-full items-center justify-center rounded-2xl bg-sage/20 shadow-md">
          <p className="text-charcoal/50 font-body">Photo coming soon</p>
        </div>
          </motion.div>
        ))
      )}
    </motion.div>
  );
};

export default MasonryGallery;
