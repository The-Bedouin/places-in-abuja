import type { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/posts';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = 'https://places-in-abuja.vercel.app';
  const posts = await getAllPosts();
  const postEntries = posts.map((p) => ({ url: `${base}/blog/${p.slug}`, lastModified: new Date(p.date) }));
  return [
    { url: `${base}/`, lastModified: new Date() },
    { url: `${base}/blog`, lastModified: new Date() },
    { url: `${base}/about`, lastModified: new Date() },
    { url: `${base}/contact`, lastModified: new Date() },
    ...postEntries
  ];
}


