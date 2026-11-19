import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import ProductCard from '@/components/ProductCard';
import { products } from '@/lib/products';
import { galleryPhotos } from '@/lib/galleryPhotos';
import { posts } from '@/lib/posts';
import { ORG_ID, SITE_URL, WEBSITE_ID } from '@/lib/seo';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Award, BookOpen, GraduationCap, Sparkles, Star } from 'lucide-react';

export const metadata: Metadata = {
  title: {
    absolute: 'Elementary State of Mind | Elementary ELA & PBL Teacher Resources',
  },
  description:
    'Classroom-tested ELA, mock trial, and project-based learning resources for grades 3–8 created by Dr. Zoe Pastore, Ed.D., 2026 ASU Prep District Teacher of the Year.',
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: 'Elementary State of Mind | Elementary ELA & PBL Teacher Resources',
    description:
      'Discover classroom-tested novel studies, OREO & CER writing frameworks, anchor charts, and free graphic organizers for upper elementary teachers.',
    url: SITE_URL,
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/logo.png`,
        width: 1200,
        height: 1200,
        alt: 'Elementary State of Mind',
      },
    ],
  },
};

const showcasePhotoIds = ['space-case-8', 'friendsgiving-2', 'kpop-1'];

export default function Home() {
  const showcasePhotos = showcasePhotoIds
    .map((id) => galleryPhotos.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const latestPosts = [...posts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 2);

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}/#webpage`,
    url: SITE_URL,
    name: 'Elementary State of Mind | Elementary ELA & PBL Teacher Resources',
    description:
      'Classroom-tested digital teaching resources for grades 3–8 by Dr. Zoe Pastore, Ed.D., 2026 ASU Prep District Teacher of the Year.',
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': ORG_ID },
    inLanguage: 'en-US',
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', 'h2', '.hero-copy p'],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <Hero />

      {/* Editorial Highlights Strip */}
      <section className="home-highlights" aria-label="Educator highlights">
        <div className="site-width highlights-grid">
          <div className="highlight-tile" data-reveal="card" data-stagger="0">
            <span className="highlight-icon tint-lavender" aria-hidden="true">
              <Star size={18} />
            </span>
            <div>
              <strong>4.95 / 5 Rating</strong>
              <span>43+ five-star educator reviews on TPT</span>
            </div>
          </div>
          <div className="highlight-tile" data-reveal="card" data-stagger="1">
            <span className="highlight-icon tint-mint" aria-hidden="true">
              <Sparkles size={18} />
            </span>
            <div>
              <strong>Grades 3–8 ELA</strong>
              <span>Standards-aligned PBL &amp; writing tools</span>
            </div>
          </div>
          <div className="highlight-tile" data-reveal="card" data-stagger="2">
            <span className="highlight-icon tint-mustard" aria-hidden="true">
              <Award size={18} />
            </span>
            <div>
              <strong>Teacher of the Year</strong>
              <span>2026 ASU Prep District honoree</span>
            </div>
          </div>
          <div className="highlight-tile" data-reveal="card" data-stagger="3">
            <span className="highlight-icon tint-peach" aria-hidden="true">
              <GraduationCap size={18} />
            </span>
            <div>
              <strong>Research-Backed</strong>
              <span>Created by Dr. Zoe Pastore, Ed.D.</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Resources */}
      <section className="home-featured">
        <div className="site-width">
          <div className="section-heading" data-reveal="heading">
            <div>
              <span className="section-kicker">Curated for Your Classroom</span>
              <h2>Featured Resources</h2>
              <p>Handpicked digital resources to make your classroom shine</p>
            </div>
            <Link href="/shop" className="button button-outline button-primary-arrow">
              <span>View All Products</span>
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <div className="product-grid feature-grid">
            {products.slice(0, 3).map((product, index) => (
              <ProductCard key={product.id} {...product} staggerIndex={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Classroom Gallery Photo Book Teaser */}
      <section className="home-gallery-preview" aria-labelledby="classroom-preview-heading">
        <div className="site-width gallery-preview-grid">
          <div className="gallery-preview-copy" data-reveal="heading">
            <span className="section-kicker">Products in Action</span>
            <h2 id="classroom-preview-heading">
              See lessons come alive on real student desks.
            </h2>
            <p>
              Step inside real elementary classrooms—from lunar mock trials and
              evidence packets to Friendsgiving tables and music-driven writing
              workshops.
            </p>
            <Link href="/gallery" className="button button-primary-arrow">
              <BookOpen size={17} aria-hidden="true" />
              <span>Open the Photo Book</span>
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>

          <div className="gallery-preview-collage">
            {showcasePhotos.map((photo, index) => (
              <Link
                key={photo.id}
                href="/gallery"
                className={`preview-frame preview-frame-${index + 1}`}
                data-parallax={index === 0 ? '-18' : index === 1 ? '20' : '-10'}
                aria-label={`View classroom photo: ${photo.caption || photo.alt}`}
              >
                <div className="preview-frame-inner">
                  <Image
                    src={photo.image}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 820px) 46vw, 240px"
                  />
                </div>
                {photo.caption && <span>{photo.caption}</span>}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Teacher & Latest Journal Entries */}
      <section className="home-spotlight" aria-label="Meet Dr. Zoe Pastore and latest blog posts">
        <div className="site-width spotlight-grid">
          <div className="spotlight-teacher" data-reveal="panel">
            <div className="spotlight-portrait" data-parallax="-12">
              <Image
                src="/profile.png"
                alt="Dr. Zoe Pastore"
                fill
                sizes="(max-width: 700px) 45vw, 180px"
              />
            </div>
            <div className="spotlight-teacher-copy">
              <span className="section-kicker">Meet the Educator</span>
              <h2>Dr. Zoe Pastore, Ed.D.</h2>
              <p>
                Sixth-grade Transformational Teacher Leader at ASU Preparatory
                Academy and 2026 District Teacher of the Year, designing
                inquiry-driven resources that blend structure with creativity.
              </p>
              <Link href="/about" className="product-link">
                Read full bio &amp; teaching philosophy →
              </Link>
            </div>
          </div>

          <div className="spotlight-journal" data-reveal="panel" data-stagger="1">
            <div className="spotlight-journal-head">
              <span className="section-kicker">From the Blog</span>
              <Link href="/blog" className="product-link">
                All articles →
              </Link>
            </div>
            <div className="spotlight-posts">
              {latestPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="spotlight-post-card"
                >
                  <span className="spotlight-post-meta">
                    {new Date(post.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
