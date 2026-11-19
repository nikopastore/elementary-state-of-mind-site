import Link from 'next/link';
import Image from 'next/image';
import { Heart } from 'lucide-react';
import SocialBento from './SocialBento';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-width">
        <div className="footer-top">
          <Link href="/" className="wordmark">
            <Image src="/logo.png" alt="" width={43} height={43} />
            <span>Elementary<br />State of Mind</span>
          </Link>
          <nav aria-label="Footer navigation">
            <Link href="/shop">Shop</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/about">About</Link>
            <Link href="/gallery">Gallery</Link>
          </nav>
        </div>
        <SocialBento />
        <p className="footer-credit">Made with <Heart size={14} fill="#f8cebf" color="#f8cebf" aria-label="love" /> &copy; {new Date().getFullYear()} Elementary State of Mind</p>
      </div>
    </footer>
  );
}
