import Image from 'next/image';
import Link from 'next/link';
import type { BlogPost } from '@/types/content';

export default function PostCard({ post, featured: _featured = false }: { post: BlogPost; featured?: boolean }) {
  return (
    <article className={`group rounded-lg overflow-hidden backdrop-blur-[1px] bg-white/5 dark:bg-white/5 border border-white/10 dark:border-white/10 hover:border-2 hover:border-green-500 dark:hover:border-green-500 shadow-[0_25px_70px_rgba(0,0,0,0.25)] hover:shadow-[0_35px_80px_-15px_rgba(0,0,0,0.4)] transition-all duration-300`}>
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden">
          <Image
            src={post.image || '/iloveabujasign.png'}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {/* Subtle glass overlay over the image (reduced blur) */}
          <div className="absolute inset-0 pointer-events-none bg-white/10 dark:bg-black/20 backdrop-blur-[1px]" />
          {/* Shine sweep for modern glass look */}
          <div className="absolute -inset-y-10 -left-1/3 w-2/3 rotate-12 pointer-events-none 
                          bg-gradient-to-r from-transparent via-white/30 to-transparent 
                          opacity-0 group-hover:opacity-100 transform -translate-x-1/2 
                          group-hover:translate-x-[120%] transition duration-700 ease-out" />
          {/* Text overlay directly on image */}
          <div className="absolute inset-0 p-4 flex flex-col justify-end">
            <div className="mb-2 flex flex-wrap gap-2">
              {post.tags?.slice(0, 2).map((t) => (
                <span key={t} className="chip bg-white/90 text-gray-800">{t}</span>
              ))}
            </div>
            <h3 className="text-lg font-semibold leading-snug text-white drop-shadow-2xl shadow-black/70">{post.title}</h3>
            {/* excerpt removed from card cover */}
            <p className="mt-3 text-sm text-white font-medium drop-shadow-2xl shadow-black/70">Read more →</p>
          </div>
        </div>
      </Link>
    </article>
  );
}


