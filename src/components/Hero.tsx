'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import SocialBento from './SocialBento';

const Hero = () => {
  return (
    <section className="relative w-full bg-gradient-to-b from-lavender to-white py-16 lg:py-24 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-softPink/30 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple/20 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-peach/30 rounded-full blur-2xl" />

      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
        {/* Left Side: Welcome Text and CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full lg:w-1/2 text-center lg:text-left"
        >
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold text-black mb-6 leading-tight">
            Welcome to{' '}
            <span className="text-purple">Elementary</span>{' '}
            <span className="text-dustyRose">State of Mind</span>
          </h1>
          <p className="font-body text-lg md:text-xl text-gray mb-8 max-w-lg mx-auto lg:mx-0">
            {/* Placeholder bio intro - replace with your own */}
            A dedicated elementary teacher sharing resources, insights, and a passion
            for engaging education. Discover tools to inspire young minds!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link
                href="/shop"
                className="inline-block bg-coral text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-glow hover:scale-105 transition-all duration-300"
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
                className="inline-block bg-purple text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-glow hover:scale-105 transition-all duration-300"
              >
                Meet the Teacher
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Side: Profile Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 flex-shrink-0"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple/30 to-coral/30 rounded-full blur-2xl" />
          <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-glow">
            <Image
              src="/profile.png"
              alt="Elementary State of Mind"
              fill
              className="object-cover"
              priority
            />
          </div>
        </motion.div>
      </div>

      {/* Social Links Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mt-16 container mx-auto px-4"
      >
        <SocialBento />
      </motion.div>
    </section>
  );
};

export default Hero;
