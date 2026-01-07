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
    url: "https://elementarystateofmind.com/blog",
    images: [
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
    title: "Blog | Elementary State of Mind",
    description: "Teaching tips, classroom stories, and educator insights for elementary teachers.",
    images: ["https://elementarystateofmind.com/logo.png"],
  },
  alternates: {
    canonical: "https://elementarystateofmind.com/blog",
  },
};

export default function BlogPage() {
  return (
    <div className="bg-gradient-to-b from-lavender to-white min-h-screen py-10 md:py-14 lg:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-center text-black mb-3 md:mb-4">
          Blog
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-center text-gray mb-8 md:mb-12 max-w-2xl mx-auto">
          Teaching tips, classroom stories, and educator insights
        </p>

        {/* Email Subscribe */}
        <div className="max-w-2xl mx-auto mb-10 md:mb-14">
          <EmailSubscribe />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
          {posts.map((post) => (
            <BlogCard key={post.slug} {...post} />
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray text-lg">No posts yet. Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  );
}
