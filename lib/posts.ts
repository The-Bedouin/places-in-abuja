import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import type { BlogPost } from '@/types/content';

const CONTENT_DIR = path.join(process.cwd(), 'content', 'posts');

export async function getAllPosts(): Promise<BlogPost[]> {
  const files = await fs.readdir(CONTENT_DIR);
  const posts: BlogPost[] = [];
  for (const file of files.filter((f) => f.endsWith('.md') || f.endsWith('.mdx'))) {
    const slug = file.replace(/\.(md|mdx)$/i, '');
    const fullPath = path.join(CONTENT_DIR, file);
    const source = await fs.readFile(fullPath, 'utf8');
    const { data, content } = matter(source);
    posts.push({ slug, content, ...(data as any) });
  }
  return posts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const mdPath = path.join(CONTENT_DIR, `${slug}.md`);
  const mdxPath = path.join(CONTENT_DIR, `${slug}.mdx`);
  try {
    const file = await fs.readFile(mdPath, 'utf8');
    const { data, content } = matter(file);
    return { slug, content, ...(data as any) };
  } catch {}
  try {
    const file = await fs.readFile(mdxPath, 'utf8');
    const { data, content } = matter(file);
    return { slug, content, ...(data as any) };
  } catch {}
  return null;
}


