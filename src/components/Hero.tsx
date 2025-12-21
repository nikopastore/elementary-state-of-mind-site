"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import SocialBento from "./SocialBento"; // Assuming SocialBento is in the same directory

const Hero = () => {
  return (
    <section className="relative w-full bg-cream py-16 lg:py-24 overflow-hidden">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Left Side: Welcome Text and CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full lg:w-1/2 text-center lg:text-left"
        >
          <h1 className="font-heading text-5xl md:text-6xl font-extrabold text-charcoal mb-4 leading-tight">
            Welcome to Elementary State of Mind
          </h1>
          <p className="font-body text-xl text-charcoal-light mb-8 max-w-lg mx-auto lg:mx-0">
            {/* Subheading placeholder for bio intro */}
            A dedicated elementary teacher sharing resources, insights, and a passion for engaging education. Discover tools to inspire young minds!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link
                href="/shop"
                className="inline-block bg-terracotta text-cream font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-terracotta-dark transition-colors duration-300"
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
                className="inline-block bg-charcoal text-cream font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-charcoal-light transition-colors duration-300"
              >
                Meet the Teacher
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Side: Circular Photo Placeholder */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 flex items-center justify-center bg-sage/30 rounded-full shadow-xl flex-shrink-0"
        >
          <span className="font-body text-charcoal text-lg md:text-xl font-medium">
            Photo Coming Soon
          </span>
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
