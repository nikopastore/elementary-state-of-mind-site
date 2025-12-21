'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Music2, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-purple text-white font-body rounded-t-3xl px-8 py-12 mt-auto">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <div className="mb-8 md:mb-0">
            <Link href="/" className="flex items-center justify-center md:justify-start gap-3">
              <Image
                src="/logo.png"
                alt="Elementary State of Mind"
                width={50}
                height={50}
                className="rounded-full border-2 border-white/30"
              />
              <span className="text-xl font-bold">
                Elementary State of Mind
              </span>
            </Link>
          </div>
          <nav className="flex space-x-8">
            <Link href="/shop" className="hover:text-softPink transition-colors">Shop</Link>
            <Link href="/about" className="hover:text-softPink transition-colors">About</Link>
            <Link href="/gallery" className="hover:text-softPink transition-colors">Gallery</Link>
          </nav>
        </div>
        <div className="mt-8 border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-center md:text-left mb-4 md:mb-0 flex items-center gap-1 text-white/80">
            Made with <Heart className="w-4 h-4 text-coral" fill="#f59f80" /> &copy; {new Date().getFullYear()} Elementary State of Mind
          </p>
          <div className="flex space-x-6">
            <a href="#" aria-label="Instagram" className="hover:text-softPink transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" aria-label="TikTok" className="hover:text-softPink transition-colors">
              <Music2 className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
