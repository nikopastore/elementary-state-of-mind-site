'use client';

import { motion, Variants } from 'framer-motion';
import { Instagram, Music2, PinIcon, Store, Facebook } from 'lucide-react';
import React from 'react';

// Custom Spotify icon since lucide-react doesn't have one
const SpotifyIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
  </svg>
);

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
  {
    platform: 'Spotify',
    icon: <SpotifyIcon className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-white" />,
    href: 'https://open.spotify.com/playlist/5FoJvH0raHXq4MS3tUJEAw?si=7Ww2bw5_Qr6VThmWRFWEmw&nd=1&dlsi=5b61906af5a44045',
    className: 'bg-gradient-to-br from-dustyRose to-purple',
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
  hidden: { y: 10, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 120,
      damping: 12,
    },
  },
};

const SocialBento = () => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3 md:gap-4 p-2 sm:p-4 pb-4 max-w-xs sm:max-w-xl md:max-w-2xl mx-auto"
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
