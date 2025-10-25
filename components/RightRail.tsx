import Link from 'next/link';

type RelatedPost = { slug: string; title: string };

export default function RightRail({ related }: { related: RelatedPost[] }) {
  return (
    <div className="space-y-6">
      {/* Newsletter */}
      <section className="relative overflow-hidden rounded-xl border border-white/10 dark:border-white/10 bg-gradient-to-br from-white/10 to-white/5 dark:from-white/10 dark:to-white/5 backdrop-blur-md shadow-2xl dark:shadow-lg p-5">
        <div className="pointer-events-none absolute -top-20 -right-24 h-48 w-48 rounded-full bg-brand-500/20 blur-3xl" />
        <h3 className="font-semibold mb-2">Newsletter</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">Get new Abuja places and guides in your inbox.</p>
        <form className="flex gap-2">
          <input type="email" placeholder="you@example.com" className="w-full rounded-md border border-white/10 bg-white/80 dark:bg-white/10 px-3 py-2 text-sm focus:outline-none" />
          <button type="button" className="rounded-md bg-gradient-to-r from-brand-500 to-emerald-500 hover:from-brand-600 hover:to-emerald-600 text-white px-4 py-2 text-sm shadow-md">Subscribe</button>
        </form>
      </section>

      {/* Socials */}
      <section className="rounded-xl border border-white/10 dark:border-white/10 bg-white/5 dark:bg-white/5 backdrop-blur-md shadow-2xl dark:shadow-lg p-5">
        <h3 className="font-semibold mb-3">Follow</h3>
        <div className="flex gap-3 flex-wrap">
          <Link href="#" className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/70 dark:bg-white/10 text-gray-800 dark:text-gray-200 hover:scale-105 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200">
            <i className="fab fa-twitter text-blue-500"></i>
          </Link>
          <Link href="#" className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/70 dark:bg-white/10 text-gray-800 dark:text-gray-200 hover:scale-105 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200">
            <i className="fab fa-facebook text-blue-600"></i>
          </Link>
          <Link href="#" className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/70 dark:bg-white/10 text-gray-800 dark:text-gray-200 hover:scale-105 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200">
            <i className="fab fa-linkedin text-blue-700"></i>
          </Link>
          <Link href="#" className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/70 dark:bg-white/10 text-gray-800 dark:text-gray-200 hover:scale-105 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200">
            <i className="fas fa-envelope text-red-500"></i>
          </Link>
        </div>
      </section>

      {/* Related */}
      <section className="rounded-xl border border-white/10 dark:border-white/10 bg-white/5 dark:bg-white/5 backdrop-blur-md shadow-2xl dark:shadow-lg p-5">
        <h3 className="font-semibold mb-3">Related</h3>
        <ul className="space-y-2 text-sm">
          {related.slice(0, 5).map((p) => (
            <li key={p.slug} className="group">
              <Link href={`/blog/${p.slug}`} className="inline-flex items-center gap-2 rounded px-2 py-1 hover:bg-white/10">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-500 group-hover:scale-125 transition" />
                <span className="group-hover:text-brand-600 dark:group-hover:text-brand-300">{p.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Ad */}
      <section className="relative overflow-hidden rounded-xl border border-dashed border-white/20 dark:border-white/20 bg-white/5 dark:bg-white/5 backdrop-blur-md shadow-2xl dark:shadow-lg p-5">
        <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(135deg,transparent,transparent_20px,rgba(255,255,255,0.06)_20px,rgba(255,255,255,0.06)_40px)]" />
        <div className="relative w-full h-48 rounded flex items-center justify-center text-gray-600 dark:text-gray-300">
          Ad placeholder
        </div>
      </section>
    </div>
  );
}


