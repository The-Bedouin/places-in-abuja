import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from 'next-themes';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://places-in-abuja.vercel.app'),
  title: {
    template: '%s | Places in Abuja',
    default: 'Places in Abuja — Explore Restaurants, Parks, Events & Hidden Gems',
  },
  description:
    'A modern guide to exploring Abuja, Nigeria — restaurants, parks, events, culture and hidden gems with detailed reviews and photos.',
  openGraph: {
    title: 'Places in Abuja',
    description:
      'Explore and review the best restaurants, parks, events, and hidden gems in Abuja, Nigeria.',
    type: 'website',
    url: 'https://places-in-abuja.vercel.app',
  },
  twitter: { card: 'summary_large_image', creator: '@placesinabuja' }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="lg:hidden">
            <Header />
          </div>
          <main id="main" className="container-responsive py-8">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
        {/* PWA SW registration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `if ('serviceWorker' in navigator) { window.addEventListener('load', () => navigator.serviceWorker.register('/sw.js').catch(()=>{})); }`,
          }}
        />
        {/* Analytics placeholder */}
        {/* <Script src="https://www.googletagmanager.com/gtag/js?id=G-XXXX" strategy="afterInteractive" />
        <Script id="ga" strategy="afterInteractive">{
          `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-XXXX');`
        }</Script> */}
      </body>
    </html>
  );
}


