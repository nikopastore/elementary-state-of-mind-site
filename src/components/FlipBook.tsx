'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface FlipBookProps {
  pages: string[];
  title?: string;
}

export default function FlipBook({ pages, title = 'Visual Resume' }: FlipBookProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(0);

  const paginate = (newDirection: number) => {
    const newPage = currentPage + newDirection;
    if (newPage >= 0 && newPage < pages.length) {
      setDirection(newDirection);
      setCurrentPage(newPage);
    }
  };

  const variants = {
    enter: (direction: number) => ({
      rotateY: direction > 0 ? 90 : -90,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      rotateY: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut' as const,
      },
    },
    exit: (direction: number) => ({
      rotateY: direction < 0 ? 90 : -90,
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.5,
        ease: 'easeIn' as const,
      },
    }),
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Book title */}
      {title && (
        <h2 className="text-2xl md:text-3xl font-heading text-center text-purple mb-6">
          {title}
        </h2>
      )}

      {/* Book container */}
      <div className="relative" style={{ perspective: '2000px' }}>
        {/* Book wrapper with shadow */}
        <div className="relative bg-gradient-to-br from-purple/10 to-dustyRose/10 rounded-lg p-4 md:p-8 shadow-xl">
          {/* Page display area */}
          <div className="relative aspect-[3/4] w-full max-w-2xl mx-auto overflow-hidden rounded-lg shadow-2xl bg-white">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentPage}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <Image
                  src={pages[currentPage]}
                  alt={`Page ${currentPage + 1}`}
                  fill
                  className="object-contain"
                  priority
                />
              </motion.div>
            </AnimatePresence>

            {/* Page curl effect overlay */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black/5 to-transparent" />
              <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-r from-black/10 to-transparent" />
            </div>
          </div>

          {/* Navigation arrows */}
          <button
            onClick={() => paginate(-1)}
            disabled={currentPage === 0}
            className={`absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all ${
              currentPage === 0
                ? 'bg-gray/20 text-gray/40 cursor-not-allowed'
                : 'bg-white shadow-lg text-purple hover:bg-purple hover:text-white hover:scale-110'
            }`}
            aria-label="Previous page"
          >
            <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
          </button>

          <button
            onClick={() => paginate(1)}
            disabled={currentPage === pages.length - 1}
            className={`absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all ${
              currentPage === pages.length - 1
                ? 'bg-gray/20 text-gray/40 cursor-not-allowed'
                : 'bg-white shadow-lg text-purple hover:bg-purple hover:text-white hover:scale-110'
            }`}
            aria-label="Next page"
          >
            <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
          </button>
        </div>

        {/* Page indicator */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {pages.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentPage ? 1 : -1);
                setCurrentPage(index);
              }}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentPage
                  ? 'bg-purple scale-125'
                  : 'bg-lavenderGray hover:bg-dustyRose'
              }`}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>

        {/* Page number */}
        <p className="text-center text-gray mt-3 font-body">
          Page {currentPage + 1} of {pages.length}
        </p>
      </div>

      {/* Keyboard navigation hint */}
      <p className="text-center text-gray/60 text-sm mt-4">
        Use arrow keys or click to navigate
      </p>
    </div>
  );
}
