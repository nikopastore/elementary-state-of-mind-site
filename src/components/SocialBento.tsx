'use client';

import { motion, Variants } from 'framer-motion';
import { Instagram, Music2, PinIcon } from 'lucide-react';
import React from 'react';

const socials = [
  {
    platform: 'Instagram',
    icon: <Instagram className="h-8 w-8 text-white" />,
    href: '#',
    className: 'bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500',
  },
  {
    platform: 'TikTok',
    icon: <Music2 className="h-8 w-8 text-white" />,
    href: '#',
    className: 'bg-gray-900',
  },
  {
    platform: 'Pinterest',
    icon: <PinIcon className="h-8 w-8 text-white" />,
    href: '#',
    className: 'bg-red-600',
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
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
      className="grid grid-cols-3 gap-4 p-4"
    >
      {socials.map((social) => (
        <motion.a
          key={social.platform}
          href={social.href}
          variants={itemVariants}
          className={`relative flex flex-col items-center justify-center p-6 sm:p-8 rounded-3xl shadow-lg transition-transform hover:scale-105 aspect-square ${social.className}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="flex flex-col items-center justify-center text-center">
            {social.icon}
            <span className="mt-2 text-sm font-semibold text-white sm:text-base">
              {social.platform}
            </span>
          </div>
        </motion.a>
      ))}
    </motion.div>
  );
};

export default SocialBento;
