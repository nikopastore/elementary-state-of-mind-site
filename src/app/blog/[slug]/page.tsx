import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { posts } from '@/lib/posts';
import { products } from '@/lib/products';
import { Calendar, ArrowLeft, ArrowRight, Award } from 'lucide-react';
import EmailSubscribe from '@/components/EmailSubscribe';
import { ORG_ID, PERSON_ID, SITE_URL, WEBSITE_ID } from '@/lib/seo';

type Props = {
  params: Promise<{ slug: string }>;
};

const getCategoryLabel = (category: string) => {
  switch (category) {
    case 'classroom':
      return 'Classroom';
    case 'tips':
      return 'Tips & Tricks';
    case 'resources':
      return 'Resources';
    case 'personal':
      return 'Personal';
    default:
      return category;
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const POST_RECOMMENDED_PRODUCTS: Record<string, string[]> = {
  'opinion-writing-elementary-oreo-strategy': [
    'oreo-opinion-writing',
    'opinion-essay-packet',
    'opinion-tree-map',
  ],
  'informative-essay-graphic-organizer-guide': [
    'informative-essay-packet',
    'informative-tree-map',
    'essay-brain-dump',
  ],
  'narrative-writing-structure-tips': [
    'narrative-writing-packet',
    'story-elements',
    'plot-diagram',
  ],
  'debate-activities-middle-school': [
    'any-text-debate',
    'space-case-mock-trial',
    'kpop-demonhunters',
  ],
  'anchor-charts-ela-classroom': [
    'ela-anchor-charts',
    'math-notes-fractions',
    'oreo-opinion-writing',
  ],
  'student-led-conferences-guide': [
    'slc-guide',
    'goal-setting-bingo',
    'letter-to-teacher',
  ],
  'teaching-fractions-visually': ['math-notes-fractions', 'ela-anchor-charts'],
  'endangered-species-reading-activities': ['article-a-week', 'any-text-debate'],
  'holiday-classroom-activities-thanksgiving': [
    'friendsgiving',
    'letter-to-teacher',
    '67th-day',
  ],
  'mock-trial-lesson-plan-novel-study': [
    'space-case-mock-trial',
    'space-case-complete',
    'space-case-test',
  ],
  'turning-novel-study-into-mock-trial': [
    'space-case-complete',
    'space-case-mock-trial',
    'any-text-debate',
  ],
  'what-is-an-elementary-state-of-mind': [
    'space-case-complete',
    'oreo-opinion-writing',
    'letter-to-teacher',
  ],
};

// Render inline **bold** and *italic* formatting cleanly
function renderStyledText(text: string, keyPrefix: string): React.ReactNode {
  const tokenRegex = /(\*\*[^*]+\*\*|\*[^*]+\*)/g;
  const segments = text.split(tokenRegex);
  return segments.map((segment, idx) => {
    if (segment.startsWith('**') && segment.endsWith('**')) {
      return <strong key={`${keyPrefix}-b-${idx}`}>{segment.slice(2, -2)}</strong>;
    }
    if (segment.startsWith('*') && segment.endsWith('*')) {
      return <em key={`${keyPrefix}-i-${idx}`}>{segment.slice(1, -1)}</em>;
    }
    return segment;
  });
}

// Parse inline links [text](url) alongside bold/italic formatting
function parseInline(text: string): React.ReactNode {
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;

  while ((match = linkRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(renderStyledText(text.slice(lastIndex, match.index), `t-${lastIndex}`));
    }
    parts.push(
      <Link key={match.index} href={match[2]} className="product-link">
        {match[1]}
      </Link>,
    );
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(renderStyledText(text.slice(lastIndex), `e-${lastIndex}`));
  }

  return parts.length === 1 ? parts[0] : parts;
}

function renderContent(content: string, postTitle: string) {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let inList = false;
  let inNumberedList = false;
  let listItems: string[] = [];
  let numberedItems: string[] = [];
  let skippedDuplicateTitle = false;

  const flushList = () => {
    if (listItems.length > 0) {
      elements.push(
        <ul key={`list-${elements.length}`} className="article-list">
          {listItems.map((item, i) => (
            <li key={i}>{parseInline(item)}</li>
          ))}
        </ul>,
      );
      listItems = [];
    }
    if (numberedItems.length > 0) {
      elements.push(
        <ol key={`olist-${elements.length}`} className="article-list article-list-ordered">
          {numberedItems.map((item, i) => (
            <li key={i}>{parseInline(item)}</li>
          ))}
        </ol>,
      );
      numberedItems = [];
    }
    inList = false;
    inNumberedList = false;
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    if (trimmed.startsWith('# ')) {
      flushList();
      const headingText = trimmed.slice(2).trim();
      if (!skippedDuplicateTitle && headingText.toLowerCase() === postTitle.trim().toLowerCase()) {
        skippedDuplicateTitle = true;
        return;
      }
      elements.push(<h2 key={index}>{headingText}</h2>);
    } else if (trimmed.startsWith('## ')) {
      flushList();
      elements.push(<h2 key={index}>{trimmed.slice(3)}</h2>);
    } else if (trimmed.startsWith('### ')) {
      flushList();
      elements.push(<h3 key={index}>{trimmed.slice(4)}</h3>);
    } else if (/^\d+\.\s/.test(trimmed)) {
      if (inList) flushList();
      inNumberedList = true;
      numberedItems.push(trimmed.replace(/^\d+\.\s/, ''));
    } else if (trimmed.startsWith('- ')) {
      if (inNumberedList) flushList();
      inList = true;
      listItems.push(trimmed.slice(2));
    } else if (trimmed.startsWith('*') && trimmed.endsWith('*') && !trimmed.startsWith('**')) {
      flushList();
      elements.push(
        <p key={index} className="article-aside">
          {trimmed.slice(1, -1)}
        </p>,
      );
    } else if (trimmed === '') {
      flushList();
    } else {
      flushList();
      elements.push(<p key={index}>{parseInline(trimmed)}</p>);
    }
  });

  flushList();
  return elements;
}

export async function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: 'Post Not Found',
      description: "The blog post you're looking for could not be found.",
    };
  }

  const canonicalUrl = `${SITE_URL}/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.excerpt,
    keywords: [
      'elementary education',
      'teaching',
      'classroom management',
      'ELA instruction',
      'Dr. Zoe Pastore',
      post.category,
    ],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      url: canonicalUrl,
      publishedTime: post.date,
      authors: ['Dr. Zoe Pastore, Ed.D.'],
      images:
        post.images && post.images.length > 0
          ? [
              {
                url: `${SITE_URL}${post.images[0]}`,
                width: 1200,
                height: 1200,
                alt: post.title,
              },
            ]
          : [
              {
                url: `${SITE_URL}/logo.png`,
                width: 1200,
                height: 1200,
                alt: 'Elementary State of Mind',
              },
            ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images:
        post.images && post.images.length > 0
          ? [`${SITE_URL}${post.images[0]}`]
          : [`${SITE_URL}/logo.png`],
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const wordCount = post.content.trim().split(/\s+/).length;
  const canonicalUrl = `${SITE_URL}/blog/${post.slug}`;

  const recommendedProducts = (POST_RECOMMENDED_PRODUCTS[post.slug] ?? [])
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const relatedPosts = posts
    .filter((p) => p.slug !== post.slug)
    .sort((a, b) => {
      const aMatch = a.category === post.category ? 1 : 0;
      const bMatch = b.category === post.category ? 1 : 0;
      if (aMatch !== bMatch) return bMatch - aMatch;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    })
    .slice(0, 2);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${canonicalUrl}#article`,
    headline: post.title,
    description: post.excerpt,
    image:
      post.images && post.images.length > 0
        ? post.images.map((img) => `${SITE_URL}${img}`)
        : `${SITE_URL}/logo.png`,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: 'en-US',
    wordCount,
    articleSection: getCategoryLabel(post.category),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
    isPartOf: { '@id': WEBSITE_ID },
    author: { '@id': PERSON_ID },
    publisher: { '@id': ORG_ID },
  };

  return (
    <div className="site-width content-page blog-post-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <div className="blog-post-shell">
        <Link href="/blog" className="article-back-link">
          <ArrowLeft size={16} aria-hidden="true" />
          <span>Back to Blog</span>
        </Link>

        <header className="article-header">
          <div className="blog-card-meta">
            <span className={`blog-category-pill cat-${post.category}`}>
              {getCategoryLabel(post.category)}
            </span>
            <time className="blog-card-date" dateTime={post.date}>
              <Calendar size={14} aria-hidden="true" />
              <span>{formatDate(post.date)}</span>
            </time>
          </div>
          <h1>{post.title}</h1>
          <p className="article-lead">{post.excerpt}</p>
        </header>

        <article className="article-canvas" data-reveal="panel">
          <div className="article-prose">{renderContent(post.content, post.title)}</div>

          {post.images && post.images.length > 0 && (
            <div className="article-gallery">
              <h3>From the Classroom</h3>
              <div className="article-gallery-grid">
                {post.images.map((img, index) => (
                  <div key={index} className="article-gallery-item">
                    <Image
                      src={img}
                      alt={`Classroom photo ${index + 1} for ${post.title}`}
                      fill
                      sizes="(max-width: 700px) 90vw, 380px"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Author E-E-A-T Byline Box */}
          <aside className="article-author-box" aria-label="About the author">
            <div className="article-author-avatar">
              <Image src="/profile.png" alt="Dr. Zoe Pastore" fill sizes="72px" />
            </div>
            <div className="article-author-copy">
              <span className="article-author-badge">
                <Award size={13} aria-hidden="true" />
                <span>2026 ASU Prep District Teacher of the Year</span>
              </span>
              <h3>Written by Dr. Zoe Pastore, Ed.D.</h3>
              <p>
                Sixth-grade Transformational Teacher Leader (USC Ed.D., ASU
                M.Ed.) sharing classroom-tested ELA and project-based learning
                strategies.
              </p>
              <Link href="/about" className="product-link">
                Meet the Teacher →
              </Link>
            </div>
          </aside>
        </article>

        {/* Internal Links to Matching Products */}
        {recommendedProducts.length > 0 && (
          <section className="article-related-block" data-reveal="heading">
            <span className="section-kicker">Classroom Resources Mentioned</span>
            <h2>Ready-to-Use Teaching Tools for This Strategy</h2>
            <div className="article-related-products">
              {recommendedProducts.map((item) => {
                const free = Boolean(item.isFree || item.price === 0);
                return (
                  <Link
                    key={item.id}
                    href={`/shop/${item.id}`}
                    className="product-mini-card"
                  >
                    <div className="product-mini-art">
                      <Image src={item.image} alt="" fill sizes="240px" />
                    </div>
                    <div className="product-mini-copy">
                      <span className="product-category-pill">
                        {free ? 'FREE' : `$${(item.price / 100).toFixed(2)}`}
                      </span>
                      <h3>{item.name}</h3>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* Related Blog Posts */}
        {relatedPosts.length > 0 && (
          <section className="article-related-block" data-reveal="heading">
            <span className="section-kicker">Keep Reading</span>
            <h2>Related Teaching Articles</h2>
            <div className="article-related-posts">
              {relatedPosts.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/blog/${rel.slug}`}
                  className="spotlight-post-card"
                >
                  <span className="spotlight-post-meta">
                    {getCategoryLabel(rel.category)} · {formatDate(rel.date)}
                  </span>
                  <h3>{rel.title}</h3>
                  <p>{rel.excerpt}</p>
                </Link>
              ))}
            </div>
            <Link href="/blog" className="product-link article-all-posts-link">
              <span>Browse all 12 articles</span>
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </section>
        )}

        <div className="subscribe-block" data-reveal="panel">
          <EmailSubscribe />
        </div>
      </div>
    </div>
  );
}
