import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { products } from '@/lib/products';
import { posts } from '@/lib/posts';
import { classroomIdeas } from '@/lib/resourceIdeas';

type Props = { params: Promise<{ id: string }> };
const origin = 'https://www.elementarystateofmind.com';
export const dynamicParams = false;

export function generateStaticParams() {
  return products.map(({ id }) => ({ id }));
}

async function getProduct({ params }: Props) {
  const { id } = await params;
  return products.find(product => product.id === id) ?? notFound();
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const product = await getProduct(props);
  const url = '/shop/' + product.id;
  return {
    title: product.name, description: product.description,
    alternates: { canonical: url },
    openGraph: { title: product.name, description: product.description, url, images: [product.image] },
    twitter: { card: 'summary_large_image', title: product.name, description: product.description, images: [product.image] },
  };
}

export default async function ResourcePage(props: Props) {
  const product = await getProduct(props);
  const path = '/shop/' + product.id;
  const guides = posts.filter(post => post.content.includes('](' + path + ')'));
  const price = (product.price / 100).toFixed(2);
  const schema = {
    '@context': 'https://schema.org', '@type': 'Product',
    name: product.name, description: product.description, image: origin + product.image,
    url: origin + path, brand: { '@type': 'Brand', name: 'Elementary State of Mind' },
    offers: { '@type': 'Offer', url: product.tptUrl, price, priceCurrency: 'USD' },
  };
  return (
    <article className="site-width content-page blog-post-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
      <div className="blog-post-shell">
        <header className="article-header">
          <Link className="article-back-link" href="/shop">All teaching resources</Link>
          <h1>{product.name}</h1>
          <p className="article-lead">{product.description}</p>
        </header>
        <div className="article-canvas resource-details">
          <div className="resource-cover"><Image src={product.image} fill sizes="(max-width: 650px) 75vw, 260px" alt={product.name + ' resource cover'} style={{ objectFit: 'contain' }} /></div>
          <div className="article-prose">
            {classroomIdeas[product.id] && <><h2>Try it in your classroom</h2><p>{classroomIdeas[product.id]}</p></>}
            <p><a className="product-link" href={product.tptUrl}>{product.isFree ? 'Get the free download' : 'View resource · $' + price} on Teachers Pay Teachers</a></p>
            {guides.length > 0 && <><h2>Related teaching guides</h2><ul>{guides.map(guide => <li key={guide.slug}><Link href={'/blog/' + guide.slug}>{guide.title}</Link></li>)}</ul></>}
          </div>
        </div>
      </div>
    </article>
  );
}
