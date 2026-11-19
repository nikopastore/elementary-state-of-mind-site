import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  FileText,
  GraduationCap,
  Layers,
  Plus,
  Sparkles,
  Star,
} from 'lucide-react';
import { products } from '@/lib/products';
import { galleryPhotos } from '@/lib/galleryPhotos';
import { posts } from '@/lib/posts';
import { categoryLabels } from '@/components/ProductCard';
import {
  SITE_URL,
  buildProductSchema,
  getProductMeta,
  getRelatedProducts,
  getReviewsForProduct,
} from '@/lib/seo';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = products.find((p) => p.id === id);

  if (!product) {
    return {
      title: 'Resource Not Found',
      description: 'The requested teaching resource could not be found.',
    };
  }

  const meta = getProductMeta(product);
  const free = Boolean(product.isFree || product.price === 0);
  const priceTag = free ? 'Free Download' : `$${(product.price / 100).toFixed(2)}`;
  const categoryName = categoryLabels[product.category] ?? product.category;
  const pageTitle = `${product.name} — ${meta.gradeLevels} ${categoryName}`;
  const canonicalUrl = `${SITE_URL}/shop/${product.id}`;

  return {
    title: pageTitle,
    description: `${product.description} (${meta.gradeLevels} · ${meta.format} · ${priceTag}) by Dr. Zoe Pastore, Ed.D.`,
    keywords: [
      product.name,
      meta.subject,
      meta.gradeLevels,
      meta.learningResourceType,
      ...meta.teaches,
      'Elementary State of Mind',
      'Dr. Zoe Pastore',
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: pageTitle,
      description: product.description,
      type: 'website',
      url: canonicalUrl,
      images: [
        {
          url: `${SITE_URL}${product.image}`,
          width: 1200,
          height: 1200,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: product.description,
      images: [`${SITE_URL}${product.image}`],
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  const free = Boolean(product.isFree || product.price === 0);
  const formattedPrice = free ? 'FREE' : `$${(product.price / 100).toFixed(2)}`;
  const meta = getProductMeta(product);
  const matchingPhotos = galleryPhotos.filter((photo) => photo.productId === product.id);
  const matchingReviews = getReviewsForProduct(product.id);
  const relatedPosts = meta.relatedBlogSlugs
    .map((slug) => posts.find((post) => post.slug === slug))
    .filter((post): post is NonNullable<typeof post> => Boolean(post));
  const relatedProducts = getRelatedProducts(product, 3);

  const faqSchema = {
    '@type': 'FAQPage',
    '@id': `${SITE_URL}/shop/${product.id}#faq`,
    mainEntity: meta.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  const pageGraph = {
    '@context': 'https://schema.org',
    '@graph': [buildProductSchema(product), faqSchema],
  };

  return (
    <div className="site-width content-page product-detail-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageGraph) }}
      />

      <Link href="/shop" className="article-back-link">
        <ArrowLeft size={16} aria-hidden="true" />
        <span>Back to The Shop</span>
      </Link>

      {/* Main Product Hero */}
      <section className="product-detail-hero">
        <div className="product-detail-art">
          <Image
            src={product.image}
            alt={`${product.name} preview`}
            fill
            priority
            sizes="(max-width: 820px) 92vw, 480px"
          />
        </div>

        <div className="product-detail-copy">
          <div className="product-detail-badges">
            <span className="product-category-pill">
              {categoryLabels[product.category] ?? product.category}
            </span>
            <span className="product-grade-pill">{meta.gradeLevels}</span>
            <span className={free ? 'product-price is-free' : 'product-price'}>
              {formattedPrice}
            </span>
          </div>

          <h1>{product.name}</h1>
          <p className="product-detail-summary">{product.description}</p>

          <div className="product-detail-actions">
            <a
              href={product.tptUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="button"
            >
              <span>{free ? 'Download Free on TPT' : `Get on TPT (${formattedPrice})`}</span>
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
            {matchingPhotos.length > 0 && (
              <Link href="/gallery" className="button button-outline">
                <BookOpen size={17} aria-hidden="true" />
                <span>See in Classroom Gallery</span>
              </Link>
            )}
          </div>

          <div className="product-facts-grid" aria-label="Resource specifications">
            <div className="product-fact-card">
              <GraduationCap size={17} aria-hidden="true" />
              <div>
                <span>Grade Levels</span>
                <strong>{meta.gradeLevels}</strong>
              </div>
            </div>
            <div className="product-fact-card">
              <Layers size={17} aria-hidden="true" />
              <div>
                <span>Subject &amp; Focus</span>
                <strong>{meta.subject}</strong>
              </div>
            </div>
            <div className="product-fact-card">
              <FileText size={17} aria-hidden="true" />
              <div>
                <span>Digital Format</span>
                <strong>{meta.format}</strong>
              </div>
            </div>
            <div className="product-fact-card">
              <Sparkles size={17} aria-hidden="true" />
              <div>
                <span>Prep Level</span>
                <strong>{meta.prepLevel}</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights & Skills */}
      <section className="product-detail-grid">
        <div className="product-detail-panel" data-reveal="panel">
          <span className="section-kicker">Classroom Value</span>
          <h2>Why Teachers Love This Resource</h2>
          <ul className="product-highlights-list">
            {meta.highlights.map((item) => (
              <li key={item}>
                <CheckCircle2 size={18} aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="product-author-credit">
            Created by{' '}
            <Link href="/about" className="product-link">
              Dr. Zoe Pastore, Ed.D.
            </Link>{' '}
            — 2026 ASU Prep District Teacher of the Year.
          </p>
        </div>

        <div className="product-detail-panel" data-reveal="panel" data-stagger="1">
          <span className="section-kicker">Instructional Alignment</span>
          <h2>Skills &amp; Frameworks Covered</h2>
          <ul className="product-skills-pills">
            {meta.teaches.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
          <div className="product-type-note">
            <span>Resource Type</span>
            <strong>{meta.learningResourceType}</strong>
          </div>
        </div>
      </section>

      {/* Classroom Photos if available */}
      {matchingPhotos.length > 0 && (
        <section className="product-detail-section" data-reveal="heading">
          <div className="section-heading">
            <div>
              <span className="section-kicker">Real Classroom Evidence</span>
              <h2>See It in Action</h2>
            </div>
            <Link href="/gallery" className="button button-outline button-primary-arrow">
              <span>Open Photo Book</span>
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <div className="product-classroom-photos">
            {matchingPhotos.slice(0, 4).map((photo) => (
              <Link key={photo.id} href="/gallery" className="product-classroom-photo">
                <div className="product-classroom-frame">
                  <Image
                    src={photo.image}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 700px) 46vw, 280px"
                  />
                </div>
                {photo.caption && <span>{photo.caption}</span>}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Matching Teacher Reviews */}
      {matchingReviews.length > 0 && (
        <section className="product-detail-section" data-reveal="panel">
          <span className="section-kicker">Verified Educator Feedback</span>
          <h2 className="product-section-title">Teacher Reviews</h2>
          <div className="product-reviews-grid">
            {matchingReviews.map((review) => (
              <blockquote key={review.id} className="product-review-card">
                <div className="rating" aria-label="5 out of 5 stars">
                  {Array.from({ length: review.rating }, (_, i) => (
                    <Star key={i} size={15} fill="currentColor" aria-hidden="true" />
                  ))}
                </div>
                <p>&ldquo;{review.review}&rdquo;</p>
                <footer>
                  <strong>{review.reviewer}</strong> · <span>{review.date}</span>
                </footer>
              </blockquote>
            ))}
          </div>
        </section>
      )}

      {/* Product FAQs */}
      <section className="product-detail-section" data-reveal="heading">
        <span className="section-kicker">Questions &amp; Answers</span>
        <h2 className="product-section-title">Resource FAQ</h2>
        <div className="faq-list">
          {meta.faqs.map((faq) => (
            <details key={faq.question} className="faq-item">
              <summary>
                <span>{faq.question}</span>
                <Plus className="faq-plus" size={18} aria-hidden="true" />
              </summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Related Teaching Guides */}
      {relatedPosts.length > 0 && (
        <section className="product-detail-section" data-reveal="heading">
          <span className="section-kicker">Teaching Strategies</span>
          <h2 className="product-section-title">Related Guides from the Blog</h2>
          <div className="product-related-guides">
            {relatedPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="spotlight-post-card"
              >
                <span className="spotlight-post-meta">Teaching Guide</span>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* More Resources */}
      <section className="product-detail-section" data-reveal="heading">
        <span className="section-kicker">Keep Exploring</span>
        <h2 className="product-section-title">More Classroom Resources</h2>
        <div className="product-related-grid">
          {relatedProducts.map((related) => {
            const relFree = Boolean(related.isFree || related.price === 0);
            return (
              <Link
                key={related.id}
                href={`/shop/${related.id}`}
                className="product-mini-card"
              >
                <div className="product-mini-art">
                  <Image
                    src={related.image}
                    alt=""
                    fill
                    sizes="(max-width: 700px) 90vw, 280px"
                  />
                </div>
                <div className="product-mini-copy">
                  <span className="product-category-pill">
                    {relFree ? 'FREE' : `$${(related.price / 100).toFixed(2)}`}
                  </span>
                  <h3>{related.name}</h3>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
