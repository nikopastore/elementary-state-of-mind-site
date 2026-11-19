import Link from 'next/link';
import { Calendar, ArrowRight } from 'lucide-react';

type BlogCardProps = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  featured?: boolean;
  staggerIndex?: number;
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

export default function BlogCard({
  slug,
  title,
  excerpt,
  date,
  category,
  featured = false,
  staggerIndex = 0,
}: BlogCardProps) {
  return (
    <article
      className={featured ? 'blog-card blog-card-featured' : 'blog-card'}
      data-category={category}
      data-reveal="card"
      data-stagger={staggerIndex % 3}
    >
      <div className="blog-card-body">
        <div className="blog-card-meta">
          <span className={`blog-category-pill cat-${category}`}>
            {getCategoryLabel(category)}
          </span>
          <time className="blog-card-date" dateTime={date}>
            <Calendar size={14} aria-hidden="true" />
            <span>{formatDate(date)}</span>
          </time>
        </div>

        <h3 className="blog-card-title">
          <Link href={`/blog/${slug}`}>{title}</Link>
        </h3>

        <p className="blog-card-excerpt">{excerpt}</p>

        <Link href={`/blog/${slug}`} className="blog-card-link">
          <span>Read Article</span>
          <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
