import { notFound } from 'next/navigation';
import { getAllPosts, getPostBySlug } from '@/lib/posts';
import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkGfm from 'remark-gfm';
import Image from 'next/image';
import type { Metadata } from 'next';
import { buildArticleJsonLd } from '@/lib/seo';
import Script from 'next/script';

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      images: post.image ? [post.image] : undefined,
      type: 'article'
    }
  };
}

export default async function PostPage({ params }: Props) {
  const post = await getPostBySlug(params.slug);
  if (!post) return notFound();
  const baseUrl = 'https://places-in-abuja.vercel.app';
  const jsonLd = buildArticleJsonLd(post, baseUrl);
  return (
    <article className="prose dark:prose-invert max-w-none">
      <Script id="post-jsonld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(jsonLd)}
      </Script>
      <h1>{post.title}</h1>
      {post.image && (
        <div className="my-6">
          <Image src={post.image} alt="" width={1200} height={630} className="w-full h-auto rounded-lg" />
        </div>
      )}
      <MDXRemote
        source={post.content}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'wrap' }]],
          },
        }}
      />
    </article>
  );
}


