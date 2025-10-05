import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';

export default async function CategorySidebar() {
  const posts = await getAllPosts();
  const tagToCount = new Map<string, number>();
  for (const p of posts) {
    for (const t of p.tags || []) {
      tagToCount.set(t, (tagToCount.get(t) || 0) + 1);
    }
  }
  const tags = [...tagToCount.entries()].sort((a, b) => b[1] - a[1]).slice(0, 12);

  return (
    <aside className="card p-4">
      <h2 className="font-semibold">Popular Categories</h2>
      <ul className="mt-3 grid grid-cols-2 gap-2">
        {tags.map(([t, c]) => (
          <li key={t}>
            <Link href={`/blog?tag=${encodeURIComponent(t)}`} className="chip w-full justify-between">
              <span>{t}</span>
              <span className="opacity-70">{c}</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}


