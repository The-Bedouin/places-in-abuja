import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-200 dark:border-gray-800">
      {/* Top: Brand + Quick Sections */}
      <div className="container-responsive py-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3">
            <img src="/logo.svg" alt="Places in Abuja" className="h-8 w-8" />
            <h3 className="font-semibold text-base">Places in Abuja</h3>
          </div>
          <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            Discover restaurants, parks, events and hidden gems across Abuja with honest reviews and curated guides.
          </p>
        </div>

        {/* Explore */}
        <div>
          <h4 className="font-semibold tracking-tight">Explore</h4>
          <ul className="mt-3 space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <li><Link href="/blog" className="hover:text-brand-600">All Posts</Link></li>
            <li><Link href="/about" className="hover:text-brand-600">About</Link></li>
            <li><Link href="/contact" className="hover:text-brand-600">Contact</Link></li>
          </ul>
        </div>

        {/* Contribute */}
        <div>
          <h4 className="font-semibold tracking-tight">Contribute</h4>
          <ul className="mt-3 space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <li>
              <a
                href="mailto:placesinabuja@gmail.com?subject=Write%20for%20Places%20in%20Abuja"
                className="hover:text-brand-600"
              >
                Write for us
              </a>
            </li>
          </ul>
        </div>

        {/* Subscribe */}
        <div>
          <h4 className="font-semibold tracking-tight">Subscribe</h4>
          <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">Get new posts in your inbox.</p>
          <form className="mt-3 flex gap-2">
            <input
              aria-label="Email address"
              type="email"
              required
              className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 text-sm"
              placeholder="you@example.com"
            />
            <button className="rounded-md bg-brand-600 text-white px-3 py-2 text-sm">Join</button>
          </form>
        </div>
      </div>

      {/* Middle: Contact strip */}
      <div className="border-t border-gray-200 dark:border-gray-800">
        <div className="container-responsive py-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between text-sm">
          <div className="text-gray-700 dark:text-gray-300">
            <span className="font-medium">Email:</span>{' '}
            <a href="mailto:placesinabuja@gmail.com" className="hover:text-brand-600">placesinabuja@gmail.com</a>
          </div>
          <div className="text-gray-500 dark:text-gray-400 text-xs">
            Prefer to pitch a story?{' '}
            <a
              href="mailto:placesinabuja@gmail.com?subject=Story%20Pitch%20for%20Places%20in%20Abuja"
              className="font-medium hover:text-brand-600"
            >
              Write for us
            </a>
          </div>
        </div>
      </div>

      {/* Bottom: Copyright */}
      <div className="border-t border-gray-200 dark:border-gray-800">
        <div className="container-responsive py-4 text-xs text-gray-500 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Places in Abuja</span>
          <span className="inline-flex items-center gap-3">
            <span className="hidden sm:inline">Built with Next.js</span>
            <a href="mailto:placesinabuja@gmail.com" className="hover:text-brand-600">Email us</a>
          </span>
        </div>
      </div>
    </footer>
  );
}


