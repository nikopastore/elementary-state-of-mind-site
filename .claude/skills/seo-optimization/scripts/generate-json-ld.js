#!/usr/bin/env node
/**
 * JSON-LD Structured Data Generator
 * Generates Schema.org structured data for common use cases
 *
 * Usage:
 *   ./generate-json-ld.js organization "Site Name" "https://example.com"
 *   ./generate-json-ld.js product "Product Name" 29.99 "https://example.com/product"
 *   ./generate-json-ld.js article "Article Title" "Author Name" "2024-01-15"
 *   ./generate-json-ld.js blog "Blog Post" "Author" "2024-01-15"
 *   ./generate-json-ld.js breadcrumb "Home,Products,Product Name" "https://example.com,https://example.com/products"
 */

const [,, type, ...args] = process.argv;

if (!type) {
  console.error('Usage: ./generate-json-ld.js <type> [...args]');
  console.error('');
  console.error('Available types:');
  console.error('  organization <name> <url> [logo]');
  console.error('  product <name> <price> <url> [image] [currency]');
  console.error('  article <title> <author> <date> [url] [image]');
  console.error('  blog <title> <author> <date> [url] [image]');
  console.error('  breadcrumb <names> <urls>');
  console.error('  website <name> <url> [searchUrl]');
  process.exit(1);
}

// Generator functions
const generators = {
  organization: ([name, url, logo]) => ({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": name,
    "url": url,
    "logo": logo || `${url}/logo.png`,
    "sameAs": [
      // Add social media URLs here
    ]
  }),

  product: ([name, price, url, image, currency = 'USD']) => ({
    "@context": "https://schema.org",
    "@type": "Product",
    "name": name,
    "image": image || `${url}/image.jpg`,
    "description": `${name} - Product description here`,
    "offers": {
      "@type": "Offer",
      "url": url,
      "priceCurrency": currency,
      "price": parseFloat(price),
      "availability": "https://schema.org/InStock"
    }
  }),

  article: ([title, author, date, url, image]) => ({
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "author": {
      "@type": "Person",
      "name": author
    },
    "datePublished": date,
    "dateModified": date,
    "image": image || undefined,
    "url": url || undefined
  }),

  blog: ([title, author, date, url, image]) => ({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title,
    "author": {
      "@type": "Person",
      "name": author
    },
    "datePublished": date,
    "dateModified": date,
    "image": image || undefined,
    "url": url || undefined
  }),

  breadcrumb: ([names, urls]) => {
    const nameArray = names.split(',');
    const urlArray = urls.split(',');

    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": nameArray.map((name, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": name.trim(),
        "item": urlArray[index] ? urlArray[index].trim() : undefined
      }))
    };
  },

  website: ([name, url, searchUrl]) => ({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": name,
    "url": url,
    "potentialAction": searchUrl ? {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${searchUrl}?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    } : undefined
  })
};

// Generate schema
const generator = generators[type];
if (!generator) {
  console.error(`Unknown type: ${type}`);
  console.error(`Available types: ${Object.keys(generators).join(', ')}`);
  process.exit(1);
}

const schema = generator(args);

// Output
console.log('// Add this to your HTML/JSX:');
console.log('<script type="application/ld+json">');
console.log(JSON.stringify(schema, null, 2));
console.log('</script>');
console.log('');
console.log('// Or for Next.js/React:');
console.log('<script');
console.log('  type="application/ld+json"');
console.log('  dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}');
console.log('/>');
console.log('');
console.log('// Validate at: https://validator.schema.org/');
