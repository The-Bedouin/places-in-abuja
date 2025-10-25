import { notFound } from 'next/navigation';
import { getAllPosts, getPostBySlug } from '@/lib/posts';
import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkGfm from 'remark-gfm';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { buildArticleJsonLd } from '@/lib/seo';
import Script from 'next/script';
import dynamic from 'next/dynamic';
const ArticleTOC = dynamic(() => import('@/components/ArticleTOC'), { ssr: false });
import RightRail from '@/components/RightRail';
import AbujaMap from '@/components/AbujaMap';

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

  const all = await getAllPosts();
  const others = all.filter((p) => p.slug !== post.slug);
  const related = (post.tags && post.tags.length > 0)
    ? others.filter((p) => p.tags?.some((t) => post.tags?.includes(t))).slice(0, 5)
    : others.slice(0, 5);

  const hasToc = /(^|\n)##\s+|(^|\n)###\s+/m.test(post.content);

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
      <Script id="post-jsonld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(jsonLd)}
      </Script>

       {/* Left TOC - hidden below lg */}
       {hasToc ? (
        <aside className="hidden lg:block lg:col-span-2">
          <div className="sticky top-20 rounded-lg border border-white/10 dark:border-white/10 bg-white/5 dark:bg-white/5 backdrop-blur-sm shadow-2xl dark:shadow-lg p-4 max-h-[calc(100vh-5rem)] overflow-y-auto">
             <ArticleTOC />
           </div>
         </aside>
       ) : null}

       {/* Center content */}
       <main className={`${hasToc ? 'md:col-span-12 lg:col-span-7' : 'md:col-span-12 lg:col-span-9'}`}>
        <div className="mx-auto w-full max-w-3xl">
          <article id="article-content" className="prose dark:prose-invert max-w-none">
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
          <section aria-label="Related posts" className="mt-12">
            <h2 className="text-xl font-semibold mb-4">Related posts</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {related.slice(0, 4).map((p) => (
                <article key={p.slug} className="group rounded-lg overflow-hidden backdrop-blur-[1px] bg-white/5 dark:bg-white/5 border border-white/10 dark:border-white/10 hover:border-2 hover:border-green-500 dark:hover:border-green-500 shadow-md hover:shadow-lg transition-all duration-300">
                  <Link href={`/blog/${p.slug}`} className="block">
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <Image
                        src={p.image || '/placeholder.jpg'}
                        alt={p.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 50vw"
                      />
                      <div className="absolute inset-0 pointer-events-none bg-white/10 dark:bg-black/20 backdrop-blur-[1px]" />
                      <div className="absolute -inset-y-10 -left-1/3 w-2/3 rotate-12 pointer-events-none 
                                      bg-gradient-to-r from-transparent via-white/30 to-transparent 
                                      opacity-0 group-hover:opacity-100 transform -translate-x-1/2 
                                      group-hover:translate-x-[120%] transition duration-700 ease-out" />
                      <div className="absolute inset-0 p-4 flex flex-col justify-end">
                        <div className="mb-2 flex flex-wrap gap-2">
                          {p.tags?.slice(0, 1).map((t) => (
                            <span key={t} className="text-sm px-2 py-1 bg-white/90 text-gray-800 rounded">{t}</span>
                          ))}
                        </div>
                        <h3 className="text-lg font-semibold leading-snug text-white drop-shadow-2xl shadow-black/70 line-clamp-2">{p.title}</h3>
                        {p.excerpt && (
                          <p className="mt-2 text-sm text-white/90 drop-shadow-xl shadow-black/60 line-clamp-2">{p.excerpt}</p>
                        )}
                        <p className="mt-3 text-sm text-white font-medium drop-shadow-2xl shadow-black/70">Read more →</p>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </section>
          <div className="mt-12">
            <AbujaMap />
          </div>
        </div>
      </main>

       {/* Right rail */}
       <aside className={`${hasToc ? 'md:col-span-12 lg:col-span-3' : 'md:col-span-12 lg:col-span-3'}`}>
         <div className="lg:sticky lg:top-20 rounded-lg border border-white/10 dark:border-white/10 bg-white/5 dark:bg-white/5 backdrop-blur-sm shadow-2xl dark:shadow-lg p-4">
           <RightRail related={related.map((p) => ({ slug: p.slug, title: p.title }))} />
         </div>
       </aside>
    </div>
  );
}


