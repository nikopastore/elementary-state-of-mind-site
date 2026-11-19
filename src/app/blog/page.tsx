import { Metadata } from 'next';
import { posts } from '@/lib/posts';
import BlogCard from '@/components/BlogCard';
import EmailSubscribe from '@/components/EmailSubscribe';

export const metadata: Metadata = {
  title: "Blog | Elementary State of Mind",
  description: "Teaching tips, classroom stories, and educator insights for elementary teachers. Read about evidence-based practices, engagement strategies, and classroom management.",
  keywords: ["teaching tips", "classroom management", "ELA instruction", "elementary education", "teaching blog", "educator resources"],
  openGraph: {
    title: "Blog | Elementary State of Mind",
    description: "Teaching tips, classroom stories, and educator insights for elementary teachers.",
    type: "website",
    url: "https://www.elementarystateofmind.com/blog",
    images: [
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
    title: "Blog | Elementary State of Mind",
    description: "Teaching tips, classroom stories, and educator insights for elementary teachers.",
    images: ["https://www.elementarystateofmind.com/logo.png"],
  },
  alternates: {
    canonical: "https://www.elementarystateofmind.com/blog",
  },
};

export default function BlogPage() {
  const sortedPosts = [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return (
    <div className="site-width content-page blog-index">
      <div className="page-title">
        <h1>Blog</h1>
        <p>Teaching tips, classroom stories, and educator insights</p>
      </div>
      <div className="blog-list">
        {sortedPosts.map((post) => <div key={post.slug} data-reveal="card"><BlogCard {...post} /></div>)}
      </div>
      <div className="subscribe-block" data-reveal="panel"><EmailSubscribe /></div>
    </div>
  );
}
