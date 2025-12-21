'use client';

import { motion, Variants } from 'framer-motion';
import { Instagram, Music2, PinIcon, Store, Facebook } from 'lucide-react';
import React from 'react';

const socials = [
  {
    platform: 'Instagram',
    icon: <Instagram className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-white" />,
    href: 'https://www.instagram.com/elementarystateofmind/',
    className: 'bg-gradient-to-br from-dustyRose to-coral',
  },
  {
    platform: 'Facebook',
    icon: <Facebook className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-white" />,
    href: 'https://www.facebook.com/elementarystateofmind/',
    className: 'bg-gradient-to-br from-purple to-dustyRose',
  },
  {
    platform: 'TikTok',
    icon: <Music2 className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-white" />,
    href: 'https://www.tiktok.com/@elementarystateofmindd',
    className: 'bg-gradient-to-br from-coral to-purple',
  },
  {
    platform: 'Pinterest',
    icon: <PinIcon className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-white" />,
    href: 'https://www.pinterest.com/elementarystateofmindd/',
    className: 'bg-gradient-to-br from-coral to-dustyRose',
  },
  {
    platform: 'TPT Store',
    icon: <Store className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-white" />,
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
      className="grid grid-cols-3 sm:grid-cols-5 gap-2 sm:gap-3 md:gap-4 p-2 sm:p-4 max-w-xs sm:max-w-lg md:max-w-xl mx-auto"
    >
      {socials.map((social) => (
        <motion.a
          key={social.platform}
          href={social.href}
          variants={itemVariants}
          className={`relative flex flex-col items-center justify-center p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl md:rounded-3xl shadow-soft transition-all hover:scale-105 hover:shadow-glow aspect-square ${social.className}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="flex flex-col items-center justify-center text-center">
            {social.icon}
            <span className="mt-1 sm:mt-1.5 md:mt-2 text-[10px] sm:text-xs md:text-sm font-semibold text-white whitespace-nowrap">
              {social.platform}
            </span>
          </div>
        </motion.a>
      ))}
    </motion.div>
  );
};

export default SocialBento;
