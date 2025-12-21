'use client';

import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  // Show first 3 products as featured
  const featuredProducts = products.slice(0, 3);

  return (
    <>
      <Hero />

      {/* Featured Products Section */}
      <section className="py-10 md:py-14 lg:py-16 px-4 sm:px-6 bg-white">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 md:mb-12"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-black mb-3 md:mb-4">
              Featured Resources
            </h2>
            <p className="font-body text-gray max-w-2xl mx-auto text-sm md:text-base">
              Handpicked digital resources to make your classroom shine
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 justify-items-center">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProductCard {...product} />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center mt-8 md:mt-12"
          >
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-dustyRose text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-lg hover:shadow-glow transition-all hover:scale-105 text-sm sm:text-base"
            >
              View All Products
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
