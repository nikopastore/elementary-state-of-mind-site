'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Apple, Menu, X } from 'lucide-react';

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

  const menuVariants = {
    hidden: {
      x: '100%',
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
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
      <nav className="bg-warmWhite/80 backdrop-blur-sm shadow-soft">
        <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Apple className="h-8 w-8 text-charcoal" />
            <span className="font-heading text-xl font-bold text-charcoal">
              Elementary State of Mind
            </span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-body text-charcoal transition-colors duration-300 hover:text-sage"
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
              className="rounded-full p-2 text-charcoal transition-colors hover:bg-sage/20"
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
            className="fixed right-0 top-0 z-50 h-full w-4/5 max-w-sm bg-warmWhite p-6 shadow-lg md:hidden"
          >
            <div className="flex items-center justify-between">
               <div className="flex items-center gap-2">
                 <Apple className="h-8 w-8 text-charcoal" />
                 <span className="font-heading text-lg font-bold text-charcoal">
                    ESM
                 </span>
               </div>
              <button
                onClick={toggleMenu}
                aria-label="Close menu"
                className="rounded-full p-2 text-charcoal transition-colors hover:bg-sage/20"
              >
                <X size={28} />
              </button>
            </div>
            <ul className="mt-12 flex flex-col items-center gap-8">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-2xl text-charcoal transition-colors duration-300 hover:text-sage"
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
