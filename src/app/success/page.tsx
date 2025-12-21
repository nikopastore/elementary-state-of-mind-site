'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle, Download, ArrowLeft } from 'lucide-react';
import { Suspense } from 'react';

function SuccessContent() {
  const searchParams = useSearchParams();
  const productId = searchParams.get('product_id');

  return (
    <main className="min-h-screen bg-gradient-to-b from-lavender to-white flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-3xl shadow-soft p-8 md:p-12 max-w-lg w-full text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-20 h-20 bg-lightPurple rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle className="w-12 h-12 text-purple" />
        </motion.div>

        <h1 className="font-heading text-3xl md:text-4xl font-bold text-black mb-4">
          Thank You!
        </h1>

        <p className="font-body text-gray mb-8">
          Your purchase was successful! Your digital download is ready.
        </p>

        <div className="space-y-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-dustyRose text-white font-semibold py-4 px-6 rounded-2xl flex items-center justify-center gap-2 shadow-md hover:shadow-glow transition-all"
          >
            <Download className="w-5 h-5" />
            Download Your Files
          </motion.button>

          <p className="text-sm text-gray font-body">
            A download link has also been sent to your email.
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-lavenderGray">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-purple hover:text-dustyRose transition-colors font-body"
          >
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </Link>
        </div>
      </motion.div>
    </main>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-gradient-to-b from-lavender to-white flex items-center justify-center">
        <div className="text-black font-body">Loading...</div>
      </main>
    }>
      <SuccessContent />
    </Suspense>
  );
}
