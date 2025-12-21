'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import SocialBento from './SocialBento';
import IsometricClassroom from './IsometricClassroom';

const Hero = () => {
  return (
    <section className="relative w-full bg-gradient-to-b from-lavender to-white py-10 md:py-14 lg:py-16 overflow-hidden">
      {/* Decorative elements - smaller on laptops */}
      <div className="absolute top-10 left-10 w-24 md:w-32 h-24 md:h-32 bg-softPink/30 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-32 md:w-40 h-32 md:h-40 bg-purple/20 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/4 w-20 md:w-24 h-20 md:h-24 bg-peach/30 rounded-full blur-2xl" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Main content - 3 column layout on xl, 2 column on lg, stacked on mobile */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-4 xl:gap-6">

          {/* Left Side: Welcome Text and CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-2/5 xl:w-1/3 text-center lg:text-left order-1"
          >
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-4xl xl:text-5xl font-extrabold text-black mb-3 md:mb-4 leading-tight">
              Welcome to{' '}
              <span className="text-purple">Elementary</span>{' '}
              <span className="text-dustyRose">State of Mind</span>
            </h1>
            <p className="font-body text-sm sm:text-base md:text-lg lg:text-base xl:text-lg text-gray mb-5 md:mb-6 max-w-md mx-auto lg:mx-0">
              A dedicated elementary teacher sharing resources, insights, and a passion
              for engaging education. Discover tools to inspire young minds!
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Link
                  href="/shop"
                  className="inline-block bg-dustyRose text-white font-semibold px-5 sm:px-6 py-2.5 sm:py-3 rounded-full shadow-lg hover:brightness-110 hover:scale-105 transition-all duration-300 text-sm"
                >
                  Shop Now
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <Link
                  href="/about"
                  className="inline-block bg-dustyRose text-white font-semibold px-5 sm:px-6 py-2.5 sm:py-3 rounded-full shadow-lg hover:brightness-110 hover:scale-105 transition-all duration-300 text-sm"
                >
                  Meet the Teacher
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Center: Isometric Classroom Illustration */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-full lg:w-auto xl:flex-1 flex justify-center order-3 lg:order-2 mt-4 lg:mt-0"
          >
            <IsometricClassroom />
          </motion.div>

          {/* Right Side: Profile Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative flex-shrink-0 order-2 lg:order-3"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple/30 to-coral/30 rounded-full blur-2xl scale-110" />
            <Image
              src="/profile.png"
              alt="Elementary State of Mind"
              width={280}
              height={280}
              className="relative w-44 h-44 sm:w-52 sm:h-52 md:w-60 md:h-60 lg:w-52 lg:h-52 xl:w-64 xl:h-64 rounded-full object-cover border-4 border-white shadow-glow"
              priority
            />
          </motion.div>
        </div>
      </div>

      {/* Social Links Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mt-10 md:mt-14 lg:mt-16 container mx-auto px-4"
      >
        <SocialBento />
      </motion.div>
    </section>
  );
};

export default Hero;
