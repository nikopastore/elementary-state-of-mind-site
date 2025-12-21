'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface FlipBookProps {
  pages: string[];
  title?: string;
}

export default function FlipBook({ pages }: FlipBookProps) {
  // Current spread index (0 = cover, 1 = pages 1-2, 2 = pages 3-4, etc.)
  const [currentSpread, setCurrentSpread] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<'next' | 'prev'>('next');

  // Calculate total spreads (cover + page pairs + back cover)
  const totalSpreads = Math.ceil((pages.length - 1) / 2) + 1;

  const goToNextSpread = () => {
    if (currentSpread < totalSpreads - 1 && !isFlipping) {
      setFlipDirection('next');
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentSpread(prev => prev + 1);
        setIsFlipping(false);
      }, 600);
    }
  };

  const goToPrevSpread = () => {
    if (currentSpread > 0 && !isFlipping) {
      setFlipDirection('prev');
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentSpread(prev => prev - 1);
        setIsFlipping(false);
      }, 600);
    }
  };

  // Get pages for current spread
  const getSpreadPages = () => {
    if (currentSpread === 0) {
      // Cover - show first page as cover
      return { left: null, right: pages[0], isCover: true };
    }

    const leftIndex = (currentSpread - 1) * 2 + 1;
    const rightIndex = leftIndex + 1;

    return {
      left: pages[leftIndex] || null,
      right: pages[rightIndex] || null,
      isCover: false,
    };
  };

  const { left, right, isCover } = getSpreadPages();

  return (
    <div className="w-full max-w-5xl mx-auto px-4">
      {/* 3D Book Container */}
      <div
        className="relative mx-auto"
        style={{ perspective: '2500px' }}
      >
        {/* Book wrapper - responsive sizing for laptops */}
        <div
          className={`relative mx-auto transition-all duration-500 ${
            isCover
              ? 'w-[280px] sm:w-[320px] md:w-[360px] lg:w-[400px]'
              : 'w-full max-w-[600px] md:max-w-[700px] lg:max-w-[800px]'
          }`}
          style={{
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Book Shadow - responsive */}
          <div
            className={`absolute -bottom-3 md:-bottom-4 left-1/2 -translate-x-1/2 bg-black/20 blur-xl rounded-full transition-all duration-500 ${
              isCover
                ? 'w-[240px] sm:w-[280px] md:w-[320px] lg:w-[350px]'
                : 'w-[90%] max-w-[650px]'
            }`}
            style={{ height: '25px' }}
          />

          {/* The Book - responsive min-height */}
          <div
            className={`relative bg-gradient-to-r from-purple to-dustyRose rounded-r-lg shadow-2xl transition-all duration-500 min-h-[350px] sm:min-h-[400px] md:min-h-[450px] lg:min-h-[500px] ${
              isCover ? 'rounded-l-lg' : 'rounded-l-none'
            }`}
            style={{
              transformStyle: 'preserve-3d',
              aspectRatio: isCover ? '3/4' : '6/4',
            }}
          >
            {/* Book Spine */}
            {!isCover && (
              <div
                className="absolute left-1/2 top-0 bottom-0 w-4 -translate-x-1/2 bg-gradient-to-r from-black/30 via-black/10 to-black/30 z-20"
                style={{ boxShadow: 'inset 0 0 10px rgba(0,0,0,0.3)' }}
              />
            )}

            {/* Cover View */}
            {isCover && (
              <motion.div
                initial={{ rotateY: -20 }}
                animate={{ rotateY: isFlipping && flipDirection === 'next' ? -180 : 0 }}
                transition={{ duration: 0.6, ease: 'easeInOut' as const }}
                className="absolute inset-0 rounded-lg overflow-hidden cursor-pointer"
                style={{
                  transformStyle: 'preserve-3d',
                  transformOrigin: 'right center',
                  backfaceVisibility: 'hidden',
                }}
                onClick={goToNextSpread}
              >
                {/* Cover image */}
                <div className="relative w-full h-full bg-white">
                  <Image
                    src={right!}
                    alt="Book Cover"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                {/* Cover edge effect */}
                <div className="absolute right-0 top-0 bottom-0 w-3 bg-gradient-to-l from-black/20 to-transparent" />
                {/* Click hint */}
                <div className="absolute bottom-4 right-4 bg-white/90 px-4 py-2 rounded-full text-sm font-medium text-purple shadow-lg">
                  Click to open
                </div>
              </motion.div>
            )}

            {/* Open Book View - Two Page Spread */}
            {!isCover && (
              <div className="relative w-full h-full flex">
                {/* Left Page */}
                <div
                  className="relative w-1/2 h-full bg-white overflow-hidden"
                  style={{
                    boxShadow: 'inset -5px 0 15px rgba(0,0,0,0.1)',
                    borderTopLeftRadius: '4px',
                    borderBottomLeftRadius: '4px',
                  }}
                >
                  {left ? (
                    <Image
                      src={left}
                      alt={`Page ${(currentSpread - 1) * 2 + 1}`}
                      fill
                      className="object-contain p-2"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray">
                      <span className="text-lg">End of book</span>
                    </div>
                  )}
                  {/* Page curl shadow */}
                  <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/5 to-transparent" />
                </div>

                {/* Right Page */}
                <div
                  className="relative w-1/2 h-full bg-white overflow-hidden"
                  style={{
                    boxShadow: 'inset 5px 0 15px rgba(0,0,0,0.1)',
                    borderTopRightRadius: '4px',
                    borderBottomRightRadius: '4px',
                  }}
                >
                  {right ? (
                    <Image
                      src={right}
                      alt={`Page ${(currentSpread - 1) * 2 + 2}`}
                      fill
                      className="object-contain p-2"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray">
                      <span className="text-lg">End of book</span>
                    </div>
                  )}
                  {/* Page curl shadow */}
                  <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black/5 to-transparent" />
                </div>

                {/* Page flip animation overlay */}
                <AnimatePresence>
                  {isFlipping && (
                    <motion.div
                      initial={{
                        rotateY: flipDirection === 'next' ? 0 : -180,
                      }}
                      animate={{
                        rotateY: flipDirection === 'next' ? -180 : 0,
                      }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6, ease: 'easeInOut' as const }}
                      className="absolute top-0 bottom-0 w-1/2 bg-white z-30 overflow-hidden"
                      style={{
                        transformStyle: 'preserve-3d',
                        transformOrigin: flipDirection === 'next' ? 'left center' : 'right center',
                        left: flipDirection === 'next' ? '50%' : '0',
                        boxShadow: '0 0 20px rgba(0,0,0,0.3)',
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-black/10" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Controls - responsive */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 mt-6 md:mt-8">
          <button
            onClick={goToPrevSpread}
            disabled={currentSpread === 0 || isFlipping}
            aria-label="Previous page"
            className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-5 md:px-6 py-2 sm:py-3 rounded-full font-semibold text-sm sm:text-base transition-all ${
              currentSpread === 0 || isFlipping
                ? 'bg-gray/20 text-gray/50 cursor-not-allowed'
                : 'bg-white text-purple shadow-lg hover:shadow-xl hover:scale-105 active:scale-95'
            }`}
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">{currentSpread === 1 ? 'Close Book' : 'Previous'}</span>
          </button>

          {/* Page indicator */}
          <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-4">
            {Array.from({ length: totalSpreads }).map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  if (!isFlipping && i !== currentSpread) {
                    setFlipDirection(i > currentSpread ? 'next' : 'prev');
                    setCurrentSpread(i);
                  }
                }}
                className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all ${
                  i === currentSpread
                    ? 'bg-purple scale-125'
                    : 'bg-lavenderGray hover:bg-dustyRose'
                }`}
              />
            ))}
          </div>

          <button
            onClick={goToNextSpread}
            disabled={currentSpread === totalSpreads - 1 || isFlipping}
            aria-label="Next page"
            className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-5 md:px-6 py-2 sm:py-3 rounded-full font-semibold text-sm sm:text-base transition-all ${
              currentSpread === totalSpreads - 1 || isFlipping
                ? 'bg-gray/20 text-gray/50 cursor-not-allowed'
                : 'bg-white text-purple shadow-lg hover:shadow-xl hover:scale-105 active:scale-95'
            }`}
          >
            <span className="hidden sm:inline">{currentSpread === 0 ? 'Open Book' : 'Next'}</span>
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Page info */}
        <p className="text-center text-gray mt-4 font-body">
          {isCover ? 'Cover' : `Pages ${(currentSpread - 1) * 2 + 1}-${Math.min((currentSpread - 1) * 2 + 2, pages.length - 1)} of ${pages.length - 1}`}
        </p>
      </div>
    </div>
  );
}
