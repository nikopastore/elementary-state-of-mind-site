'use client';

import React, { useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface ModernSectionProps {
  children: React.ReactNode;
  title: string;
  icon?: LucideIcon;
  variant?: 'default' | 'glass' | 'gradient';
}

const ModernSection: React.FC<ModernSectionProps> = ({
  children,
  title,
  icon: Icon,
  variant = 'default'
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const variants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'glass':
        return 'bg-white/70 backdrop-blur-lg border border-white/50';
      case 'gradient':
        return 'bg-gradient-to-br from-white to-lightPurple/30 border border-lavenderGray/20';
      default:
        return 'bg-white border border-lavenderGray/30';
    }
  };

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      className={`w-full rounded-2xl shadow-soft overflow-hidden p-6 md:p-8 ${getVariantStyles()}`}
    >
      <div className="flex items-center gap-3 mb-6">
        {Icon && (
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple to-dustyRose flex items-center justify-center">
            <Icon className="w-5 h-5 text-white" />
          </div>
        )}
        <h2 className="font-heading text-2xl md:text-3xl text-black">
          {title}
        </h2>
      </div>
      <div className="font-body text-gray">
        {children}
      </div>
    </motion.section>
  );
};

export default ModernSection;
