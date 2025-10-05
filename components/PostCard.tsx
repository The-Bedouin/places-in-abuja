import Image from 'next/image';
import Link from 'next/link';
import type { BlogPost } from '@/types/content';

export default function PostCard({ post, featured = false }: { post: BlogPost; featured?: boolean }) {
  return (
    <article className={`card ${featured ? 'ring-2 ring-brand-500' : ''}`}>
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="relative aspect-[16/9]">
          <Image
            src={post.image || '/placeholder.jpg'}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
        <div className="p-4">
          <div className="mb-2 flex flex-wrap gap-2">
            {post.tags?.slice(0, 2).map((t) => (
              <span key={t} className="chip">{t}</span>
            ))}
          </div>
          <h3 className="text-lg font-semibold leading-snug">{post.title}</h3>
          {post.excerpt && (
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-3">{post.excerpt}</p>
          )}
          <p className="mt-3 text-sm text-brand-700 dark:text-brand-300">Read more →</p>
        </div>
      </Link>
    </article>
  );
}


