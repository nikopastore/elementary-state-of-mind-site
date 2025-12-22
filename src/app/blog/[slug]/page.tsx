import { notFound } from 'next/navigation';
import Link from 'next/link';
import { posts } from '@/lib/posts';
import { Calendar, Tag, ArrowLeft } from 'lucide-react';

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

// Simple markdown-like content renderer
function renderContent(content: string) {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let inList = false;
  let listItems: string[] = [];

  const flushList = () => {
    if (listItems.length > 0) {
      elements.push(
        <ul key={`list-${elements.length}`} className="list-disc list-inside space-y-2 mb-6 text-gray">
          {listItems.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );
      listItems = [];
    }
    inList = false;
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
    } else if (trimmed.startsWith('- **') || trimmed.startsWith('- ')) {
      inList = true;
      let item = trimmed.slice(2);
      // Handle bold text
      item = item.replace(/\*\*(.*?)\*\*/g, '$1');
      listItems.push(item);
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
          {trimmed}
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

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="bg-gradient-to-b from-lavender to-white min-h-screen py-10 md:py-14 lg:py-16">
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
          </article>
        </div>
      </div>
    </div>
  );
}
