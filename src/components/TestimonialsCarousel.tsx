'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { testimonials } from '@/lib/testimonials';

export default function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextTestimonial = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prevTestimonial = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  // Auto-rotate every 5 seconds
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextTestimonial();
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, nextTestimonial]);

  // Pause auto-play on hover
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  const currentTestimonial = testimonials[currentIndex];

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  return (
    <section className="py-10 md:py-14 lg:py-16 bg-gradient-to-b from-white to-lavender/50">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-10">
          <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-2">
            What Teachers Are Saying
          </h2>
          <p className="font-body text-gray text-sm md:text-base">
            Real reviews from real educators
          </p>
        </div>

        {/* Carousel Container */}
        <div
          className="relative max-w-3xl mx-auto"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-12 z-10 p-2 rounded-full bg-white shadow-soft hover:shadow-glow transition-all hover:scale-110"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-purple" />
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-12 z-10 p-2 rounded-full bg-white shadow-soft hover:shadow-glow transition-all hover:scale-110"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-purple" />
          </button>

          {/* Testimonial Card */}
          <div className="overflow-hidden px-8 md:px-4">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="bg-white rounded-2xl md:rounded-3xl shadow-soft p-6 md:p-8 lg:p-10"
              >
                {/* Quote Icon */}
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-purple/10">
                    <Quote className="w-6 h-6 md:w-8 md:h-8 text-purple" />
                  </div>
                </div>

                {/* Stars */}
                <div className="flex justify-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 md:w-5 md:h-5 text-coral fill-coral"
                    />
                  ))}
                </div>

                {/* Review Text */}
                <blockquote className="text-center mb-6">
                  <p className="font-body text-base md:text-lg lg:text-xl text-black leading-relaxed italic">
                    &ldquo;{currentTestimonial.review}&rdquo;
                  </p>
                </blockquote>

                {/* Reviewer Info */}
                <div className="text-center">
                  <p className="font-heading text-lg md:text-xl font-bold text-purple">
                    {currentTestimonial.reviewer}
                  </p>
                  <p className="font-body text-sm text-gray mt-1">
                    {currentTestimonial.product}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-purple w-6 md:w-8'
                    : 'bg-purple/30 hover:bg-purple/50'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* TPT Store Link */}
        <div className="text-center mt-8">
          <a
            href="https://www.teacherspayteachers.com/store/elementary-state-of-mind"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-purple hover:text-dustyRose transition-colors font-semibold text-sm md:text-base"
          >
            <span>See all reviews on TPT</span>
            <span className="text-xs">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
