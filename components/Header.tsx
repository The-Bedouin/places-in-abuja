"use client";
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export default function Header() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => setMounted(true), []);
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);
  useEffect(() => {
    if (!mounted) return;
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen, mounted]);

  return (
    <>
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-950/70 backdrop-blur border-b border-gray-200 dark:border-gray-800">
      <div className="container-responsive flex items-center justify-between py-3">
        <Link href="/" className="font-bold text-lg">Places in Abuja</Link>
        <nav aria-label="Primary" className="hidden sm:flex gap-6 text-sm">
          <Link href="/blog" className="hover:text-brand-600">Blog</Link>
          <Link href="/about" className="hover:text-brand-600">About</Link>
          <Link href="/contact" className="hover:text-brand-600">Contact</Link>
        </nav>
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-drawer"
            className="sm:hidden inline-flex items-center justify-center rounded-md p-2 border border-gray-200 dark:border-gray-800"
            onClick={() => setMobileOpen(v => !v)}
          >
            {mobileOpen ? (
              // X icon
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path fillRule="evenodd" d="M6.225 4.811a1 1 0 0 1 1.414 0L12 9.172l4.361-4.361a1 1 0 1 1 1.414 1.414L13.414 10.586l4.361 4.361a1 1 0 0 1-1.414 1.414L12 12l-4.361 4.361a1 1 0 1 1-1.414-1.414l4.361-4.361-4.361-4.361a1 1 0 0 1 0-1.414Z" clipRule="evenodd" />
              </svg>
            ) : (
              // Hamburger icon
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path d="M4 6.75A.75.75 0 0 1 4.75 6h14.5a.75.75 0 0 1 0 1.5H4.75A.75.75 0 0 1 4 6.75ZM4 12a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H4.75A.75.75 0 0 1 4 12Zm0 5.25a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H4.75a.75.75 0 0 1-.75-.75Z" />
              </svg>
            )}
          </button>
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
    {mounted && typeof document !== 'undefined' && createPortal(
      <div className={(mobileOpen ? 'pointer-events-auto' : 'pointer-events-none') + ' sm:hidden fixed inset-0 z-[100]'}>
        <div
          className={(mobileOpen ? 'opacity-100' : 'opacity-0') + ' absolute inset-0 bg-black/50 transition-opacity duration-200'}
          aria-hidden="true"
          onClick={() => setMobileOpen(false)}
        />
        <nav
          id="mobile-drawer"
          aria-label="Mobile"
          className={(mobileOpen ? 'translate-x-0' : 'translate-x-full') + ' absolute right-0 top-0 h-1/2 w-40 max-w-[42%] bg-white text-black border-l border-gray-200 shadow-xl transition-transform duration-300 ease-out'}
        >
          <div className="px-4 py-3 flex items-center justify-between border-b border-gray-200">
            <span className="font-semibold">Menu</span>
            <button
              type="button"
              aria-label="Close menu"
              className="inline-flex items-center justify-center rounded-md p-2 border border-gray-200"
              onClick={() => setMobileOpen(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path fillRule="evenodd" d="M6.225 4.811a1 1 0 0 1 1.414 0L12 9.172l4.361-4.361a1 1 0 1 1 1.414 1.414L13.414 10.586l4.361 4.361a1 1 0 0 1-1.414 1.414L12 12l-4.361 4.361a1 1 0 1 1-1.414-1.414l4.361-4.361-4.361-4.361a1 1 0 0 1 0-1.414Z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          <div className="p-4 flex flex-col gap-4 text-base">
            <Link href="/blog" className="text-black hover:text-brand-600 font-medium" onClick={() => setMobileOpen(false)}>Blog</Link>
            <Link href="/about" className="text-black hover:text-brand-600 font-medium" onClick={() => setMobileOpen(false)}>About</Link>
            <Link href="/contact" className="text-black hover:text-brand-600 font-medium" onClick={() => setMobileOpen(false)}>Contact</Link>
            <button
              aria-label="Toggle theme"
              className="mt-2 inline-flex items-center justify-center rounded-md px-3 py-2 border border-gray-200 text-sm"
              onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
            >
              {resolvedTheme === 'dark' ? 'Switch to Light' : 'Switch to Dark'}
            </button>
          </div>
        </nav>
      </div>,
      document.body
    )}
    </>
  );
}


