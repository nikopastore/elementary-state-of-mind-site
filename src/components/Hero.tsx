import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Award, Sparkles, Star } from 'lucide-react';
import SocialBento from './SocialBento';

export default function Hero() {
  return (
    <section className="home-hero">
      <div className="site-width hero-grid">
        <div className="hero-copy">
          <Link href="/about#teacher-of-the-year" className="hero-eyebrow">
            <Award size={15} aria-hidden="true" />
            <span>2026 ASU Prep District Teacher of the Year</span>
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
          <h1>
            <span className="welcome-line">Welcome to</span>
            Elementary<br className="hero-break" /> State of Mind
            <span className="hero-period" aria-hidden="true">.</span>
          </h1>
          <p>
            A dedicated elementary teacher sharing resources, insights, and a
            passion for engaging education. Discover tools to inspire young
            minds!
          </p>
          <div className="hero-actions">
            <Link href="/shop" className="button button-primary-arrow">
              <span>Shop Now</span>
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link href="/about" className="button button-outline">
              Meet the Teacher
            </Link>
          </div>
        </div>

        <div className="hero-board">
          <div className="hero-pin-note" aria-hidden="true">
            <div className="hero-pin-stars">
              <Star size={12} fill="currentColor" />
              <Star size={12} fill="currentColor" />
              <Star size={12} fill="currentColor" />
              <Star size={12} fill="currentColor" />
              <Star size={12} fill="currentColor" />
            </div>
            <strong>4.95 on TPT</strong>
            <span>43+ teacher reviews</span>
          </div>

          <div className="hero-photo">
            <Image
              src="/zoe-usc-graduation.webp"
              alt="Zoe Pastore in USC graduation regalia, holding her diploma cover"
              fill
              priority
              sizes="(max-width: 820px) 73vw, 440px"
            />
          </div>

          <Link
            className="hero-resource"
            href="/shop#space-case-mock-trial"
            aria-label="Find Space Case Mock Trial in the shop"
          >
            <span className="hero-resource-tag">
              <Sparkles size={11} aria-hidden="true" /> Featured
            </span>
            <Image
              src="/products/space-case-mock-trial.jpg"
              alt=""
              width={320}
              height={320}
            />
            <span>Space Case Mock Trial</span>
          </Link>
        </div>
      </div>

      <div className="site-width">
        <SocialBento />
      </div>
    </section>
  );
}
