'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/shop', label: 'The Shop' },
  { href: '/about', label: 'Meet the Teacher' },
  { href: '/gallery', label: 'Gallery' },
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuVariants: Variants = {
    hidden: {
      x: '100%',
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 300,
        damping: 30,
      },
    },
    exit: {
      x: '100%',
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <header className="sticky top-0 z-50 w-full">
      <nav className="bg-white/90 backdrop-blur-md shadow-soft border-b border-lavenderGray/30">
        <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Elementary State of Mind"
              width={50}
              height={50}
              className="rounded-full"
            />
            <span className="font-heading text-lg font-bold text-black hidden sm:block">
              Elementary State of Mind
            </span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-body text-black transition-colors duration-300 hover:text-purple relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-purple after:transition-all hover:after:w-full"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              aria-label="Open menu"
              className="rounded-full p-2 text-black transition-colors hover:bg-purple/20"
            >
              <Menu size={28} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50 md:hidden"
            onClick={toggleMenu}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed right-0 top-0 z-50 h-full w-4/5 max-w-sm bg-white p-6 shadow-lg md:hidden"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Image
                  src="/logo.png"
                  alt="Elementary State of Mind"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <span className="font-heading text-lg font-bold text-black">
                  ESM
                </span>
              </div>
              <button
                onClick={toggleMenu}
                aria-label="Close menu"
                className="rounded-full p-2 text-black transition-colors hover:bg-purple/20"
              >
                <X size={28} />
              </button>
            </div>
            <ul className="mt-12 flex flex-col items-center gap-8">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-2xl text-black transition-colors duration-300 hover:text-purple"
                    onClick={toggleMenu}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navigation;
