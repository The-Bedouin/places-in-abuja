import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import type { BlogPost } from '@/types/content';

const CONTENT_DIR = path.join(process.cwd(), 'content', 'posts');

function extractFirstImageFromMarkdown(markdown: string): string | undefined {
  // Match markdown image syntax ![alt](url)
  const mdMatch = markdown.match(/!\[[^\]]*]\(([^)]+)\)/);
  if (mdMatch?.[1]) return mdMatch[1].trim();
  // Match basic HTML <img src="...">
  const htmlMatch = markdown.match(/<img[^>]*src=["']([^"']+)["'][^>]*>/i);
  if (htmlMatch?.[1]) return htmlMatch[1].trim();
  return undefined;
}

function withDerivedImage(post: BlogPost): BlogPost {
  if (!post.image) {
    const derived = extractFirstImageFromMarkdown(post.content);
    // Ensure absolute public path fallback
    post.image = derived?.startsWith('http') || derived?.startsWith('/')
      ? derived
      : derived ? `/${derived.replace(/^\.?\/*/, '')}` : '/iloveabujasign.png';
  }
  return post;
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const files = await fs.readdir(CONTENT_DIR);
  const posts: BlogPost[] = [];
  for (const file of files.filter((f) => f.endsWith('.md') || f.endsWith('.mdx'))) {
    const slug = file.replace(/\.(md|mdx)$/i, '');
    const fullPath = path.join(CONTENT_DIR, file);
    const source = await fs.readFile(fullPath, 'utf8');
    const { data, content } = matter(source);
    posts.push(withDerivedImage({ slug, content, ...(data as any) } as BlogPost));
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
    return withDerivedImage({ slug, content, ...(data as any) } as BlogPost);
  } catch {}
  try {
    const file = await fs.readFile(mdxPath, 'utf8');
    const { data, content } = matter(file);
    return withDerivedImage({ slug, content, ...(data as any) } as BlogPost);
  } catch {}
  return null;
}


