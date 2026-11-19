import Image from 'next/image';
import Link from 'next/link';
import SocialBento from './SocialBento';

export default function Hero() {
  return (
    <section className="home-hero">
      <div className="site-width hero-grid">
        <div className="hero-copy">
          <h1><span className="welcome-line">Welcome to</span>Elementary<br className="hero-break" /> State of Mind<span className="hero-period" aria-hidden="true">.</span></h1>
          <p>A dedicated elementary teacher sharing resources, insights, and a passion for engaging education. Discover tools to inspire young minds!</p>
          <div className="hero-actions">
            <Link href="/shop" className="button">Shop Now</Link>
            <Link href="/about" className="button button-outline">Meet the Teacher</Link>
          </div>
        </div>
        <div className="hero-board">
          <div className="hero-photo">
            <Image src="/zoe-usc-graduation.webp" alt="Zoe Pastore in USC graduation regalia, holding her diploma cover" fill priority sizes="(max-width: 820px) 73vw, 400px" />
          </div>
          <Link className="hero-resource" href="/shop#space-case-mock-trial" aria-label="Find Space Case Mock Trial in the shop">
            <Image src="/products/space-case-mock-trial.jpg" alt="" width={320} height={320} />
            <span>Space Case Mock Trial</span>
          </Link>
        </div>
      </div>
      <div className="site-width"><SocialBento /></div>
    </section>
  );
}
