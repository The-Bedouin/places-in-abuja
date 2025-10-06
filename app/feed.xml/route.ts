import { NextResponse } from 'next/server';
import RSS from 'rss';
import { getAllPosts } from '@/lib/posts';

export async function GET() {
  const siteUrl = 'https://places-in-abuja.vercel.app';
  const feed = new RSS({
    title: 'Places in Abuja',
    site_url: siteUrl,
    feed_url: `${siteUrl}/feed.xml`,
    description: 'Discover the best places to visit in Abuja, Nigeria. Complete guides to parks, malls, landmarks, and attractions in Nigeria\'s capital city.',
    language: 'en',
    copyright: `© ${new Date().getFullYear()} Places in Abuja. All rights reserved.`,
    managingEditor: 'abuja-places@example.com',
    webMaster: 'abuja-places@example.com',
    lastBuildDate: new Date(),
    ttl: 60
  });

  try {
    const posts = await getAllPosts();
    
    posts.forEach((post) => {
      feed.item({
        title: post.title,
        url: `${siteUrl}/blog/${post.slug}`,
        date: new Date(post.date),
        description: post.excerpt || '',
        author: post.author || 'Abuja Places Guide',
        categories: post.tags || [],
        guid: `${siteUrl}/blog/${post.slug}`,
        custom_elements: [
          {
            'content:encoded': {
              _cdata: post.content || ''
            }
          }
        ]
      });
    });

    const xml = feed.xml({ indent: true });
    return new NextResponse(xml, { 
      headers: { 
        'Content-Type': 'application/rss+xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600'
      } 
    });
  } catch (error) {
    console.error('Error generating RSS feed:', error);
    return new NextResponse('Error generating feed', { status: 500 });
  }
}


