import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="text-center py-24">
      <h1 className="text-3xl font-bold">Page not found</h1>
      <p className="mt-2 text-gray-600 dark:text-gray-400">Try searching the blog or go back home.</p>
      <div className="mt-6">
        <Link href="/blog" className="mr-3 underline">Search Posts</Link>
        <Link href="/" className="underline">Home</Link>
      </div>
    </div>
  );
}


