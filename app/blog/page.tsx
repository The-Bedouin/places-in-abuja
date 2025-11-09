import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';
import PostCard from '@/components/PostCard';
import AbujaMap from '@/components/AbujaMap';

export const dynamic = 'force-static';

export default async function BlogIndex({ searchParams }: { searchParams: Record<string, string | string[] | undefined> }) {
  const posts = await getAllPosts();
  const q = typeof searchParams.q === 'string' ? searchParams.q.toLowerCase() : '';
  const tag = typeof searchParams.tag === 'string' ? searchParams.tag.toLowerCase() : '';
  const filtered = posts.filter((p) => {
    const matchesQ = !q || p.title.toLowerCase().includes(q) || p.excerpt?.toLowerCase().includes(q);
    const matchesTag = !tag || p.tags?.map((t) => t.toLowerCase()).includes(tag);
    return matchesQ && matchesTag;
  });

  return (
    <div>
      <div className="mb-4">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 hover:underline">
          <span aria-hidden>←</span>
          <span>Back</span>
        </Link>
      </div>
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">All Posts</h1>
        <form className="ml-auto">
          <label htmlFor="q" className="sr-only">Search</label>
          <input id="q" name="q" defaultValue={q} placeholder="Search posts..." className="rounded-md border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 text-sm" />
        </form>
      </div>

      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((p) => (
          <PostCard key={p.slug} post={p} />
        ))}
      </div>

      <div className="mt-8 text-center text-sm">
        <Link className="underline" href="/feed.xml">RSS Feed</Link>
      </div>

      <div className="mt-12">
        <AbujaMap />
      </div>
    </div>
  );
}


