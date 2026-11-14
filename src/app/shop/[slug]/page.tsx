import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { products } from "@/lib/products";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

const siteUrl = "https://www.elementarystateofmind.com";

function getProduct(slug: string) {
  return products.find((product) => product.id === slug);
}

function getTptUrl(productUrl: string, slug: string) {
  const url = new URL(productUrl);
  url.searchParams.set("utm_source", "esom_site");
  url.searchParams.set("utm_medium", "shop");
  url.searchParams.set("utm_campaign", slug);
  return url.toString();
}

function formatPrice(priceInCents: number, isFree?: boolean) {
  if (isFree || priceInCents === 0) return "Free";
  return `$${(priceInCents / 100).toFixed(2)}`;
}

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.id }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) return {};

  return {
    title: product.name,
    description: product.description,
    keywords: [
      product.name,
      "elementary teacher resources",
      "Teachers Pay Teachers",
      "digital classroom resources",
    ],
    alternates: {
      canonical: `${siteUrl}/shop/${product.id}`,
    },
    openGraph: {
      type: "website",
      url: `${siteUrl}/shop/${product.id}`,
      title: product.name,
      description: product.description,
      images: [
        {
          url: product.image,
          width: 1200,
          height: 630,
          alt: `${product.name} cover image`,
        },
      ],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) notFound();

  const onSiteUrl = `${siteUrl}/shop/${product.id}`;
  const tptUrl = getTptUrl(product.tptUrl, product.id);
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: `${siteUrl}${product.image}`,
    url: onSiteUrl,
    brand: {
      "@type": "Brand",
      name: "Elementary State of Mind",
    },
    category: product.category,
    offers: {
      "@type": "Offer",
      price: product.isFree ? "0.00" : (product.price / 100).toFixed(2),
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: tptUrl,
      seller: {
        "@type": "Organization",
        name: "Elementary State of Mind",
        url: siteUrl,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-lavender to-white py-10 md:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <div className="container mx-auto px-4 sm:px-6">
        <Link
          href="/shop"
          className="font-body text-sm font-semibold text-purple underline underline-offset-4 hover:text-dustyRose"
        >
          ← Back to the shop
        </Link>
        <main className="mx-auto mt-8 grid max-w-5xl gap-8 overflow-hidden rounded-3xl bg-white p-5 shadow-soft md:grid-cols-2 md:gap-12 md:p-10">
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-lavender/30">
            <Image
              src={product.image}
              alt={`${product.name} cover image`}
              fill
              priority
              className="object-contain p-4"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="flex flex-col justify-center">
            <p className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-purple">
              {product.category.replace("-", " ")}
            </p>
            <h1 className="mt-4 font-heading text-3xl font-bold text-black md:text-5xl">
              {product.name}
            </h1>
            <p className="mt-6 font-body text-base leading-8 text-gray md:text-lg">
              {product.description}
            </p>
            <p className="mt-6 font-heading text-2xl font-bold text-dustyRose">
              {formatPrice(product.price, product.isFree)}
            </p>
            <a
              href={tptUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center justify-center rounded-2xl bg-purple px-6 py-4 font-body text-base font-semibold text-white transition hover:bg-dustyRose"
            >
              {product.isFree ? "Get this free resource on TPT" : "View this resource on TPT"} →
            </a>
            <p className="mt-4 font-body text-xs leading-5 text-gray/70">
              You&apos;ll complete your purchase or download on Teachers Pay Teachers.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
