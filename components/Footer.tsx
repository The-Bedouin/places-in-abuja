import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-200 dark:border-gray-800">
      <div className="container-responsive py-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className="font-semibold">Places in Abuja</h3>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Reviews and guides to restaurants, parks, events and hidden gems in Abuja.
          </p>
        </div>
        <div>
          <h4 className="font-semibold">Explore</h4>
          <ul className="mt-2 space-y-2 text-sm">
            <li><Link href="/blog" className="hover:text-brand-600">All Posts</Link></li>
            <li><Link href="/about" className="hover:text-brand-600">About</Link></li>
            <li><Link href="/contact" className="hover:text-brand-600">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold">Legal</h4>
          <ul className="mt-2 space-y-2 text-sm">
            <li><Link href="/privacy" className="hover:text-brand-600">Privacy</Link></li>
            <li><Link href="/terms" className="hover:text-brand-600">Terms</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold">Subscribe</h4>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Get new posts in your inbox.</p>
          <form className="mt-2 flex gap-2">
            <input aria-label="Email" type="email" required className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 text-sm" placeholder="you@example.com" />
            <button className="rounded-md bg-brand-600 text-white px-3 py-2 text-sm">Join</button>
          </form>
        </div>
      </div>
      <div className="border-t border-gray-200 dark:border-gray-800">
        <div className="container-responsive py-4 text-xs text-gray-500 flex justify-between">
          <span>© {new Date().getFullYear()} Places in Abuja</span>
          <span>Built with Next.js</span>
        </div>
      </div>
    </footer>
  );
}


