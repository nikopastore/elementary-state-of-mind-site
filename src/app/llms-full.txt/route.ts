import { products, TPT_STORE_URL } from '@/lib/products';
import { posts } from '@/lib/posts';

export const dynamic = 'force-static';

export function GET() {
  const origin = 'https://www.elementarystateofmind.com';
  const text = [
    '# Elementary State of Mind',
    'Elementary teaching materials by Dr. Zoe Pastore, Ed.D. Read her educator profile at ' + origin + '/about.',
    '## Teaching resources',
    ...products.map(p => [
      '### ' + p.name, p.description, 'Resource page: ' + origin + '/shop/' + p.id,
      'Download and current offer: ' + p.tptUrl,
    ].join('\n')),
    '## Classroom teaching guides',
    ...posts.map(p => p.title + '\n' + p.excerpt + '\n' + origin + '/blog/' + p.slug),
    '## More', origin + '/gallery', TPT_STORE_URL,
  ].join('\n\n');
  return new Response(text + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
