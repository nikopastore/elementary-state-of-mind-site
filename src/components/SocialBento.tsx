'use client';

import { motion, Variants } from 'framer-motion';
import { Instagram, Music2, PinIcon, Store } from 'lucide-react';
import React from 'react';

const socials = [
  {
    platform: 'Instagram',
    icon: <Instagram className="h-7 w-7 sm:h-8 sm:w-8 text-white" />,
    href: '#',
    className: 'bg-gradient-to-br from-dustyRose to-coral',
  },
  {
    platform: 'TikTok',
    icon: <Music2 className="h-7 w-7 sm:h-8 sm:w-8 text-white" />,
    href: '#',
    className: 'bg-gradient-to-br from-purple to-dustyRose',
  },
  {
    platform: 'Pinterest',
    icon: <PinIcon className="h-7 w-7 sm:h-8 sm:w-8 text-white" />,
    href: '#',
    className: 'bg-gradient-to-br from-coral to-dustyRose',
  },
  {
    platform: 'TPT Store',
    icon: <Store className="h-7 w-7 sm:h-8 sm:w-8 text-white" />,
    href: 'https://www.teacherspayteachers.com/store/elementary-state-of-mind',
    className: 'bg-gradient-to-br from-purple to-coral',
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 100,
    },
  },
};

const SocialBento = () => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-4 gap-3 sm:gap-4 p-4 max-w-lg mx-auto"
    >
      {socials.map((social) => (
        <motion.a
          key={social.platform}
          href={social.href}
          variants={itemVariants}
          className={`relative flex flex-col items-center justify-center p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-soft transition-all hover:scale-105 hover:shadow-glow aspect-square ${social.className}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="flex flex-col items-center justify-center text-center">
            {social.icon}
            <span className="mt-1.5 sm:mt-2 text-xs font-semibold text-white sm:text-sm whitespace-nowrap">
              {social.platform}
            </span>
          </div>
        </motion.a>
      ))}
    </motion.div>
  );
};

export default SocialBento;
