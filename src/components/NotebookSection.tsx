'use client';

import React, { useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';

interface NotebookSectionProps {
  children: React.ReactNode;
  title: string;
}

const NotebookSection: React.FC<NotebookSectionProps> = ({ children, title }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const notebookPaperStyle: React.CSSProperties = {
    backgroundColor: '#ffffff',
    backgroundImage: `
      repeating-linear-gradient(to bottom,
        transparent,
        transparent 1.45rem,
        #dccbeb 1.45rem,
        #dccbeb 1.5rem),
      linear-gradient(to right,
        #e1889f 2px,
        transparent 2px)
    `,
    backgroundSize: '100% 1.5rem, 100% 100%',
    backgroundPosition: '0 0.5rem, 2.5rem 0',
    backgroundRepeat: 'repeat-y, no-repeat',
    padding: '2rem 1.5rem 2rem 3.5rem',
    lineHeight: '1.5rem',
  };

  const variants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
  };

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      className="w-full max-w-4xl mx-auto my-12 rounded-3xl shadow-soft overflow-hidden border border-lavenderGray/30"
      style={notebookPaperStyle}
    >
      <h2 className="font-heading text-3xl md:text-4xl mb-6 pb-2 border-b border-lavenderGray text-purple">
        {title}
      </h2>
      <div className="font-body text-black/80">
        {children}
      </div>
    </motion.section>
  );
};

export default NotebookSection;
