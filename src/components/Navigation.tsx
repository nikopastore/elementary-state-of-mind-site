'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

const links = [
  { href: '/', label: 'Home' },
  { href: '/shop', label: 'The Shop' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'Meet the Teacher' },
  { href: '/gallery', label: 'Gallery' },
];

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="site-header">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div className="site-width site-header-inner" onKeyDown={(event) => {
        if (event.key === 'Escape' && open) {
          setOpen(false);
          document.getElementById('menu-toggle')?.focus();
        }
      }}>
        <Link href="/" className="wordmark" onClick={() => setOpen(false)}>
          <Image src="/logo.png" alt="" width={43} height={43} />
          <span>Elementary<br />State of Mind</span>
        </Link>
        <button id="menu-toggle" type="button" className="menu-toggle" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="primary-nav" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
        <nav id="primary-nav" className={open ? 'primary-nav is-open' : 'primary-nav'} aria-label="Main navigation">
          {links.map(({ href, label }) => {
            const active = pathname === href || (href !== '/' && pathname.startsWith(href + '/'));
            return (
              <Link key={href} href={href} aria-current={active ? 'page' : undefined} onClick={() => setOpen(false)}>
                {label}
              </Link>
            );
          })}
        </nav>
        <Link className="button header-shop" href="/shop">Shop resources</Link>
      </div>
    </header>
  );
}
