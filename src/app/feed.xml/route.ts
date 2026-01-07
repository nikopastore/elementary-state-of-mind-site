import { posts } from '@/lib/posts';

export async function GET() {
  const baseUrl = 'https://elementarystateofmind.com';

  const rssItems = posts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map((post) => {
      const postUrl = `${baseUrl}/blog/${post.slug}`;
      const pubDate = new Date(post.date).toUTCString();

      return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <description><![CDATA[${post.excerpt}]]></description>
      <pubDate>${pubDate}</pubDate>
      <category>${post.category}</category>
      <author>Elementary State of Mind</author>
    </item>`;
    })
    .join('');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Elementary State of Mind Blog</title>
    <link>${baseUrl}/blog</link>
    <description>Teaching tips, classroom stories, and educator insights for elementary teachers. Evidence-based practices, engagement strategies, and classroom management.</description>
    <language>en-US</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${baseUrl}/logo.png</url>
      <title>Elementary State of Mind</title>
      <link>${baseUrl}</link>
    </image>
    <copyright>Copyright ${new Date().getFullYear()} Elementary State of Mind. All rights reserved.</copyright>
    <managingEditor>contact@elementarystateofmind.com (Elementary State of Mind)</managingEditor>
    <webMaster>contact@elementarystateofmind.com (Elementary State of Mind)</webMaster>
    <category>Education</category>
    <category>Teaching</category>
    <category>Elementary Education</category>
    <ttl>60</ttl>
    ${rssItems}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
