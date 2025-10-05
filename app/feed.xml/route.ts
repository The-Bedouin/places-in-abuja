import { NextResponse } from 'next/server';
import RSS from 'rss';
import { getAllPosts } from '@/lib/posts';

export async function GET() {
  const siteUrl = 'https://places-in-abuja.vercel.app';
  const feed = new RSS({
    title: 'Places in Abuja',
    site_url: siteUrl,
    feed_url: `${siteUrl}/feed.xml`,
    description: 'Reviews of restaurants, parks, events and hidden gems in Abuja.'
  });
  const posts = await getAllPosts();
  posts.forEach((p) => feed.item({ title: p.title, url: `${siteUrl}/blog/${p.slug}`, date: p.date, description: p.excerpt }));
  return new NextResponse(feed.xml({ indent: true }), { headers: { 'Content-Type': 'application/rss+xml' } });
}


