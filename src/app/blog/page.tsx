import { Metadata } from 'next';
import { posts } from '@/lib/posts';
import BlogCard from '@/components/BlogCard';
import EmailSubscribe from '@/components/EmailSubscribe';
import { ORG_ID, PERSON_ID, SITE_URL, WEBSITE_ID } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Elementary Teaching Blog — ELA, Writing & PBL Tips',
  description:
    'Classroom-tested ELA teaching tips, OREO & informative writing guides, mock trial PBL walkthroughs, and student-led conference strategies from Dr. Zoe Pastore, Ed.D.',
  keywords: [
    'teaching tips',
    'classroom management',
    'ELA instruction',
    'OREO opinion writing',
    'mock trial lesson plans',
    'elementary education blog',
    'educator resources',
  ],
  openGraph: {
    title: 'Elementary Teaching Blog — ELA, Writing & PBL Tips',
    description:
      'Teaching tips, classroom stories, and evidence-based ELA strategies for grades 3–8 teachers.',
    type: 'website',
    url: `${SITE_URL}/blog`,
    images: [
      {
        url: `${SITE_URL}/logo.png`,
        width: 1200,
        height: 1200,
        alt: 'Elementary State of Mind Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Elementary Teaching Blog — ELA, Writing & PBL Tips',
    description:
      'Teaching tips, classroom stories, and educator insights for elementary teachers.',
    images: [`${SITE_URL}/logo.png`],
  },
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
};

export default function BlogPage() {
  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
  const [leadPost, ...restPosts] = sortedPosts;

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': `${SITE_URL}/blog#blog`,
    url: `${SITE_URL}/blog`,
    name: 'Elementary State of Mind Teaching Blog',
    description:
      'Practical classroom guides on OREO opinion writing, graphic organizers, novel study mock trials, debate prep, and student-led conferences.',
    inLanguage: 'en-US',
    isPartOf: { '@id': WEBSITE_ID },
    publisher: { '@id': ORG_ID },
    author: { '@id': PERSON_ID },
    blogPost: sortedPosts.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt,
      datePublished: post.date,
      url: `${SITE_URL}/blog/${post.slug}`,
      author: { '@id': PERSON_ID },
    })),
  };

  return (
    <div className="site-width content-page blog-index">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <div className="page-title">
        <span className="section-kicker">Educator Journal</span>
        <h1>Blog</h1>
        <p>Teaching tips, classroom stories, and educator insights</p>
      </div>

      {leadPost && (
        <div className="blog-lead">
          <BlogCard {...leadPost} featured />
        </div>
      )}

      <div className="blog-list">
        {restPosts.map((post, index) => (
          <BlogCard key={post.slug} {...post} staggerIndex={index} />
        ))}
      </div>

      <div className="subscribe-block" data-reveal="panel">
        <EmailSubscribe />
      </div>
    </div>
  );
}
