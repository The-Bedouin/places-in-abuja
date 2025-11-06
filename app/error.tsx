"use client";

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <html>
      <body className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-black text-red-700 dark:text-red-300">
        <div className="py-12 px-6 max-w-xl w-full text-center">
          <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
          <p className="mb-6">{error.message}</p>
          <button
            className="px-4 py-2 rounded bg-green-600 text-white font-semibold hover:bg-green-700"
            onClick={() => reset()}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}




