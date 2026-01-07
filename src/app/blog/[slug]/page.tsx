import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { posts } from '@/lib/posts';
import { Calendar, Tag, ArrowLeft } from 'lucide-react';
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

// Parse inline formatting (bold, italic, links)
function parseInline(text: string): React.ReactNode {
  // Handle links [text](url)
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;

  while ((match = linkRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(formatText(text.slice(lastIndex, match.index)));
    }
    parts.push(
      <Link key={match.index} href={match[2]} className="text-purple hover:text-dustyRose underline transition-colors">
        {match[1]}
      </Link>
    );
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(formatText(text.slice(lastIndex)));
  }

  return parts.length === 1 ? parts[0] : parts;
}

// Format bold and italic text
function formatText(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1');
}

// Simple markdown-like content renderer
function renderContent(content: string) {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let inList = false;
  let inNumberedList = false;
  let listItems: string[] = [];
  let numberedItems: string[] = [];

  const flushList = () => {
    if (listItems.length > 0) {
      elements.push(
        <ul key={`list-${elements.length}`} className="list-disc list-inside space-y-2 mb-6 text-gray">
          {listItems.map((item, i) => (
            <li key={i}>{parseInline(item)}</li>
          ))}
        </ul>
      );
      listItems = [];
    }
    if (numberedItems.length > 0) {
      elements.push(
        <ol key={`olist-${elements.length}`} className="list-decimal list-inside space-y-2 mb-6 text-gray">
          {numberedItems.map((item, i) => (
            <li key={i}>{parseInline(item)}</li>
          ))}
        </ol>
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
      elements.push(
        <h1 key={index} className="text-3xl md:text-4xl font-heading font-bold text-black mb-6">
          {trimmed.slice(2)}
        </h1>
      );
    } else if (trimmed.startsWith('## ')) {
      flushList();
      elements.push(
        <h2 key={index} className="text-2xl md:text-3xl font-heading font-bold text-black mt-8 mb-4">
          {trimmed.slice(3)}
        </h2>
      );
    } else if (trimmed.startsWith('### ')) {
      flushList();
      elements.push(
        <h3 key={index} className="text-xl md:text-2xl font-heading font-semibold text-black mt-6 mb-3">
          {trimmed.slice(4)}
        </h3>
      );
    } else if (/^\d+\.\s/.test(trimmed)) {
      // Numbered list item
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
        <p key={index} className="text-gray italic mb-4">
          {trimmed.slice(1, -1)}
        </p>
      );
    } else if (trimmed === '') {
      flushList();
    } else {
      flushList();
      elements.push(
        <p key={index} className="text-gray text-base md:text-lg leading-relaxed mb-4">
          {parseInline(trimmed)}
        </p>
      );
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

  const canonicalUrl = `https://elementarystateofmind.com/blog/${post.slug}`;

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
              url: `https://elementarystateofmind.com${post.images[0]}`,
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ]
        : [
            {
              url: "https://elementarystateofmind.com/logo.png",
              width: 1200,
              height: 630,
              alt: "Elementary State of Mind",
            },
          ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: post.images && post.images.length > 0
        ? [`https://elementarystateofmind.com${post.images[0]}`]
        : ["https://elementarystateofmind.com/logo.png"],
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

  // BlogPosting Schema for SEO
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.images && post.images.length > 0
      ? `https://elementarystateofmind.com${post.images[0]}`
      : "https://elementarystateofmind.com/logo.png",
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: "Elementary State of Mind",
      url: "https://elementarystateofmind.com/about",
    },
    publisher: {
      "@type": "Organization",
      name: "Elementary State of Mind",
      logo: {
        "@type": "ImageObject",
        url: "https://elementarystateofmind.com/logo.png",
      },
    },
  };

  return (
    <div className="bg-gradient-to-b from-lavender to-white min-h-screen py-10 md:py-14 lg:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-purple hover:text-dustyRose transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Blog</span>
          </Link>

          {/* Post header */}
          <div className="mb-8 md:mb-10">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <div className="flex items-center">
                <Tag className="h-4 w-4 text-purple mr-1.5" />
                <span className="bg-lightPurple text-purple text-sm font-semibold px-3 py-1 rounded-full">
                  {getCategoryLabel(post.category)}
                </span>
              </div>
              <div className="flex items-center text-gray text-sm">
                <Calendar className="h-4 w-4 mr-1.5" />
                {formatDate(post.date)}
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-black">
              {post.title}
            </h1>
          </div>

          {/* Post content */}
          <article className="bg-white rounded-2xl md:rounded-3xl shadow-soft p-6 sm:p-8 md:p-10">
            {renderContent(post.content)}

            {/* Image Gallery */}
            {post.images && post.images.length > 0 && (
              <div className="mt-10 pt-8 border-t border-gray/20">
                <h3 className="text-xl md:text-2xl font-heading font-bold text-black mb-6">
                  From the Classroom
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {post.images.map((img, index) => (
                    <div key={index} className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-md">
                      <Image
                        src={img}
                        alt={`Classroom photo ${index + 1}`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </article>

          {/* Email Subscribe */}
          <div className="mt-8 md:mt-10">
            <EmailSubscribe />
          </div>
        </div>
      </div>
    </div>
  );
}
