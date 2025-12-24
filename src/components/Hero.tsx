'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import SocialBento from './SocialBento';

const Hero = () => {
  return (
    <section className="relative w-full bg-gradient-to-b from-lavender to-white py-8 md:py-12 lg:py-16">
      {/* Decorative elements - contained within section bounds */}
      <div className="absolute top-10 left-10 w-24 md:w-32 h-24 md:h-32 bg-softPink/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-32 md:w-40 h-32 md:h-40 bg-purple/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 w-20 md:w-24 h-20 md:h-24 bg-peach/30 rounded-full blur-2xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-10 relative z-10">
        {/* Left Side: Welcome Text and CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full lg:w-3/5 text-center lg:text-left"
        >
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-6xl font-extrabold text-black mb-4 md:mb-6 leading-tight">
            <span className="block">Welcome to <span className="text-purple">Elementary</span></span>
            <span className="block text-dustyRose">State of Mind</span>
          </h1>
          <p className="font-body text-base sm:text-lg md:text-xl text-gray mb-6 md:mb-8 max-w-lg mx-auto lg:mx-0">
            A dedicated elementary teacher sharing resources, insights, and a passion
            for engaging education. Discover tools to inspire young minds!
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link
                href="/shop"
                className="inline-block bg-dustyRose text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-lg hover:brightness-110 hover:scale-105 transition-all duration-300 text-sm sm:text-base"
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
                className="inline-block bg-dustyRose text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-lg hover:brightness-110 hover:scale-105 transition-all duration-300 text-sm sm:text-base"
              >
                Meet the Teacher
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Side: Profile Photo - scaled for laptops */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative flex-shrink-0"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple/30 to-coral/30 rounded-full blur-2xl scale-110" />
          <Image
            src="/profile.png"
            alt="Elementary State of Mind"
            width={320}
            height={320}
            className="relative w-52 h-52 sm:w-60 sm:h-60 md:w-72 md:h-72 lg:w-72 lg:h-72 xl:w-80 xl:h-80 rounded-full object-cover border-4 border-white shadow-glow"
            priority
          />
        </motion.div>
      </div>

      {/* Social Links Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mt-6 md:mt-10 lg:mt-14 container mx-auto px-4 pb-4"
      >
        <SocialBento />
      </motion.div>
    </section>
  );
};

export default Hero;
