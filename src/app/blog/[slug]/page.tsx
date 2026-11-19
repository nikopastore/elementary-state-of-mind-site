import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { posts } from '@/lib/posts';
import { Calendar, ArrowLeft } from 'lucide-react';
import EmailSubscribe from '@/components/EmailSubscribe';

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
      title: "Post Not Found | Elementary State of Mind",
      description: "The blog post you're looking for could not be found.",
    };
  }

  const canonicalUrl = `https://www.elementarystateofmind.com/blog/${post.slug}`;

  return {
    title: `${post.title} | Elementary State of Mind Blog`,
    description: post.excerpt,
    keywords: [
      "elementary education",
      "teaching",
      "classroom management",
      "ELA instruction",
      post.category,
    ],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: canonicalUrl,
      publishedTime: post.date,
      images: post.images && post.images.length > 0
        ? [
            {
              url: `https://www.elementarystateofmind.com${post.images[0]}`,
              width: 1200,
              height: 1200,
              alt: post.title,
            },
          ]
        : [
            {
              url: "https://www.elementarystateofmind.com/logo.png",
              width: 1200,
              height: 1200,
              alt: "Elementary State of Mind",
            },
          ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: post.images && post.images.length > 0
        ? [`https://www.elementarystateofmind.com${post.images[0]}`]
        : ["https://www.elementarystateofmind.com/logo.png"],
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

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.images && post.images.length > 0
      ? `https://www.elementarystateofmind.com${post.images[0]}`
      : "https://www.elementarystateofmind.com/logo.png",
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: "Elementary State of Mind",
      url: "https://www.elementarystateofmind.com/about",
    },
    publisher: {
      "@type": "Organization",
      name: "Elementary State of Mind",
      logo: {
        "@type": "ImageObject",
        url: "https://www.elementarystateofmind.com/logo.png",
      },
    },
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
                      alt={`Classroom photo ${index + 1}`}
                      fill
                      sizes="(max-width: 700px) 90vw, 380px"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </article>

        <div className="subscribe-block" data-reveal="panel">
          <EmailSubscribe />
        </div>
      </div>
    </div>
  );
}
