"use client";
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function Header() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-950/70 backdrop-blur border-b border-gray-200 dark:border-gray-800">
      <div className="container-responsive flex items-center justify-between py-3">
        <Link href="/" className="font-bold text-lg">Places in Abuja</Link>
        <nav aria-label="Primary" className="hidden sm:flex gap-6 text-sm">
          <Link href="/blog" className="hover:text-brand-600">Blog</Link>
          <Link href="/about" className="hover:text-brand-600">About</Link>
          <Link href="/contact" className="hover:text-brand-600">Contact</Link>
        </nav>
        <div className="flex items-center gap-3">
          {mounted && (
            <button
              aria-label="Toggle theme"
              className="rounded-md px-3 py-1.5 border border-gray-200 dark:border-gray-800 text-sm"
              onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
            >
              {resolvedTheme === 'dark' ? 'Light' : 'Dark'}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}


