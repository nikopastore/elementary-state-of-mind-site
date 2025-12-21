'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface NotebookSectionProps {
  children: React.ReactNode;
  title: string;
}

const NotebookSection: React.FC<NotebookSectionProps> = ({ children, title }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const notebookPaperStyle: React.CSSProperties = {
    backgroundColor: '#fdfaef', // A warm, creamy white
    backgroundImage: `
      repeating-linear-gradient(to bottom, 
        transparent, 
        transparent 1.45rem, 
        #a5c4d4 1.45rem, 
        #a5c4d4 1.5rem),
      linear-gradient(to right, 
        #ff6347 2px, 
        transparent 2px)
    `,
    backgroundSize: '100% 1.5rem, 100% 100%',
    backgroundPosition: '0 0.5rem, 2.5rem 0', // Adjust vertical line position
    backgroundRepeat: 'repeat-y, no-repeat',
    padding: '2rem 1.5rem 2rem 3.5rem', // Top, Right, Bottom, Left padding to clear margin line
    lineHeight: '1.5rem',
  };

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      className="w-full max-w-4xl mx-auto my-12 rounded-lg shadow-lg overflow-hidden"
      style={notebookPaperStyle}
    >
      <h2 className="font-heading text-4xl mb-6 pb-2 border-b border-gray-300">
        {title}
      </h2>
      <div className="font-body text-gray-800">
        {children}
      </div>
    </motion.section>
  );
};

export default NotebookSection;
