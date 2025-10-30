import Link from 'next/link';

export default function SiteHeader() {
  return (
    <header className="border-b border-gray-200 dark:border-gray-800">
      <div className="container-responsive py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <img src="/logo.svg" alt="Places in Abuja" className="h-7 w-7" />
          <span className="font-semibold tracking-tight">Places in Abuja</span>
        </Link>
        <nav className="text-sm flex items-center gap-4">
          <Link href="/blog" className="hover:text-brand-600">Blog</Link>
          <Link href="/about" className="hover:text-brand-600">About</Link>
          <Link href="/contact" className="hover:text-brand-600">Contact</Link>
        </nav>
      </div>
    </header>
  );
}


