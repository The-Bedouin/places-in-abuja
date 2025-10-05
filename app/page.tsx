// Main homepage component for Places in Abuja
// This page displays featured content and recent posts about places in Abuja
import Image from 'next/image';
import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';
import PostCard from '@/components/PostCard';
import CategorySidebar from '@/components/CategorySidebar';

export default async function HomePage() {
  const posts = await getAllPosts();
  const featured = posts.slice(0, 3);
  const recent = posts.slice(0, 9);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <section className="lg:col-span-9 space-y-8">
        <div className="relative h-72 sm:h-96 w-full overflow-hidden rounded-xl">
          <Image
            src="/hero-abuja.jpg"
            alt="Aerial view of Abuja cityscape"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-6 left-6 text-white max-w-2xl">
            <h1 className="text-3xl sm:text-4xl font-bold">Discover Places in Abuja</h1>
            <p className="mt-2 text-sm sm:text-base opacity-90">
              Restaurants, parks, events and hidden gems — curated guides and honest reviews.
            </p>
            <div className="mt-4 flex gap-3">
              <Link href="/blog" className="bg-brand-500 hover:bg-brand-600 text-white px-4 py-2 rounded-md">
                Explore Posts
              </Link>
              <Link href="/about" className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-md">
                About
              </Link>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((p) => (
            <PostCard key={p.slug} post={p} featured />
          ))}
        </div>

        <h2 className="text-xl font-semibold">Latest Reviews</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recent.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
      </section>

      <aside className="lg:col-span-3">
        <CategorySidebar />
      </aside>
    </div>
  );
}


