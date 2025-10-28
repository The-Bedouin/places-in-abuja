import { notFound } from 'next/navigation';
import { getPostBySlug } from '@/lib/posts';
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

export async function generateMetadata(): Promise<Metadata> {
  const post = await getPostBySlug('food-drink-abuja');
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.image ? [post.image] : [],
      type: 'article'
    }
  };
}

export default async function FoodDrinkPage() {
  const post = await getPostBySlug('food-drink-abuja');
  if (!post) return notFound();
  
  const baseUrl = 'https://placesinabuja.com';
  const jsonLd = buildArticleJsonLd(post, baseUrl);

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
       <main
         className={`${hasToc ? 'lg:col-span-8' : 'lg:col-span-10'} col-span-1`}
       >
         <article className="prose prose-lg dark:prose-invert max-w-none">
           <header className="mb-8">
             <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
             {post.excerpt && (
               <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">{post.excerpt}</p>
             )}
             {post.image && (
               <div className="relative aspect-video mb-8 rounded-lg overflow-hidden">
                 <Image
                   src={post.image}
                   alt={post.title}
                   fill
                   className="object-cover"
                   priority
                 />
               </div>
             )}
             <div className="flex flex-wrap gap-2 mb-6">
               {post.tags?.map((tag) => (
                 <Link
                   key={tag}
                   href={`/blog?tag=${encodeURIComponent(tag)}`}
                   className="chip"
                 >
                   {tag}
                 </Link>
               ))}
             </div>
           </header>

           <div className="prose prose-lg dark:prose-invert max-w-none">
             <MDXRemote
               source={post.content}
               options={{
                 mdxOptions: {
                   rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
                   remarkPlugins: [remarkGfm]
                 }
               }}
             />
           </div>
         </article>
       </main>

       {/* Right rail */}
       <aside className="lg:col-span-2 col-span-1">
         <RightRail />
       </aside>
     </div>

     {/* Bottom map */}
     <div className="mt-16">
       <AbujaMap />
     </div>
  );
}
