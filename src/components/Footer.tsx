'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Music2, Heart, Facebook, PinIcon } from 'lucide-react';

// Custom Spotify icon
const SpotifyIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
  </svg>
);

const Footer = () => {
  return (
    <footer className="bg-purple text-white font-body rounded-t-3xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12 mt-auto">
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
          <nav className="flex flex-wrap justify-center md:justify-end gap-4 sm:gap-6 lg:gap-8">
            <Link href="/shop" className="hover:text-softPink transition-colors">Shop</Link>
            <Link href="/blog" className="hover:text-softPink transition-colors">Blog</Link>
            <Link href="/about" className="hover:text-softPink transition-colors">About</Link>
            <Link href="/gallery" className="hover:text-softPink transition-colors">Gallery</Link>
          </nav>
        </div>
        <div className="mt-8 border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-center md:text-left mb-4 md:mb-0 flex items-center gap-1 text-white/80">
            Made with <Heart className="w-4 h-4 text-coral" fill="#f59f80" /> &copy; {new Date().getFullYear()} Elementary State of Mind
          </p>
          <div className="flex space-x-6">
            <a href="https://www.instagram.com/elementarystateofmind/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-softPink transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="https://www.facebook.com/elementarystateofmind/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-softPink transition-colors">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="https://www.tiktok.com/@elementarystateofmindd" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="hover:text-softPink transition-colors">
              <Music2 className="w-5 h-5" />
            </a>
            <a href="https://www.pinterest.com/elementarystateofmindd/" target="_blank" rel="noopener noreferrer" aria-label="Pinterest" className="hover:text-softPink transition-colors">
              <PinIcon className="w-5 h-5" />
            </a>
            <a href="https://open.spotify.com/playlist/5FoJvH0raHXq4MS3tUJEAw?si=7Ww2bw5_Qr6VThmWRFWEmw&nd=1&dlsi=5b61906af5a44045" target="_blank" rel="noopener noreferrer" aria-label="Spotify" className="hover:text-softPink transition-colors">
              <SpotifyIcon className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
