// Main homepage component for Places in Abuja
// This page displays featured content and recent posts about places in Abuja
import Image from 'next/image';
import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';
import PostCard from '@/components/PostCard';
import CategorySidebar from '@/components/CategorySidebar';
import AbujaMap from '@/components/AbujaMap';
import MagicBento from '@/components/MagicBento';
import dynamic from 'next/dynamic';

const HeroNav = dynamic(() => import('@/components/HeroNav'), { ssr: false });

export default async function HomePage() {
  const posts = await getAllPosts();
  const featured = posts.slice(0, 3);
  const recent = posts.slice(0, 9);

  return (
    <>
      {/* Hero Section - Full Width */}
      <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen -mt-8 mb-16">
        <div className="relative h-[70vh] min-h-[560px] w-full overflow-hidden">
          <Image
            src="/city%20gate%20abuja.png"
            alt="City Gate Abuja - A beautiful landmark in Nigeria's capital"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          {/* Desktop overlay nav */}
          <div className="absolute inset-x-0 top-6 z-50">
            <HeroNav />
          </div>
          
          {/* Modern gradient overlay with multiple layers */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40" />
          
          {/* Animated mesh gradient overlay for modern effect */}
          <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-600/20 via-transparent to-transparent" />
          
          {/* Content */}
          <div className="absolute inset-0 flex items-end">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16">
              <div className="max-w-3xl">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                  Discover Places in Abuja
                </h1>
                <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl">
                  Explore restaurants, parks, events and hidden gems — curated guides and honest reviews from Nigeria&apos;s capital.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link 
                    href="/blog" 
                    className="group bg-brand-500 hover:bg-brand-600 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-lg"
                  >
                    Explore Posts
                    <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                  <Link 
                    href="/about" 
                    className="group backdrop-blur-md bg-white/10 hover:bg-white/20 border border-white/30 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
                  >
                    About Us
                    <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* Floating Popular Categories Card - Glass Effect */}
          <div className="absolute right-8 bottom-24 hidden lg:block">
            <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-2xl p-5 shadow-2xl max-w-[280px] animate-fade-in">
              <h2 className="text-lg font-bold mb-3 text-white">Popular Categories</h2>
              <div className="space-y-2">
                <Link 
                  href={`/blog?tag=${encodeURIComponent('Food & Drink')}`}
                  className="block group hover:bg-white/10 rounded-lg p-3 transition-all duration-200 border border-transparent hover:border-white/20"
                >
                  <span className="font-medium text-sm text-white/90 group-hover:text-white transition-colors">Food & Drink</span>
                </Link>
                <Link 
                  href={`/blog?tag=${encodeURIComponent('Things to Do')}`}
                  className="block group hover:bg-white/10 rounded-lg p-3 transition-all duration-200 border border-transparent hover:border-white/20"
                >
                  <span className="font-medium text-sm text-white/90 group-hover:text-white transition-colors">Things to Do</span>
                </Link>
                <Link 
                  href={`/blog?tag=${encodeURIComponent('Events')}`}
                  className="block group hover:bg-white/10 rounded-lg p-3 transition-all duration-200 border border-transparent hover:border-white/20"
                >
                  <span className="font-medium text-sm text-white/90 group-hover:text-white transition-colors">Events</span>
                </Link>
                <Link 
                  href={`/blog?tag=${encodeURIComponent('Abuja Guide')}`}
                  className="block group hover:bg-white/10 rounded-lg p-3 transition-all duration-200 border border-transparent hover:border-white/20"
                >
                  <span className="font-medium text-sm text-white/90 group-hover:text-white transition-colors">Abuja Guide</span>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <section className="lg:col-span-9 space-y-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6">Featured Places</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {featured.map((p) => (
                  <PostCard key={p.slug} post={p} featured />
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6">Categories</h2>
              <MagicBento 
                textAutoHide={true}
                enableStars={true}
                enableSpotlight={true}
                enableBorderGlow={true}
                enableTilt={false}
                enableMagnetism={true}
                clickEffect={true}
                spotlightRadius={300}
                particleCount={12}
                glowColor="0, 135, 81"
              />
            </div>
          </section>

          <aside className="lg:col-span-3">
            <CategorySidebar />
          </aside>
        </div>

        <div className="mt-16">
          <AbujaMap />
        </div>
      </div>
    </>
  );
}


