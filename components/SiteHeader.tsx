'use client';

import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';

const StaggeredMenu = dynamic(() => import('./StaggeredMenu'), { ssr: false });

export default function SiteHeader() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const menuItems = [
    { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
    { label: 'Blog', ariaLabel: 'View all blog posts', link: '/blog' },
    { label: 'Food & Drink', ariaLabel: 'Explore food and drink places', link: '/food-drink' },
    { label: 'Things to Do', ariaLabel: 'Discover things to do in Abuja', link: '/things-to-do' },
    { label: 'Abuja Guide', ariaLabel: 'View Abuja city guide', link: '/abuja-guide' },
    { label: 'About', ariaLabel: 'Learn about Places in Abuja', link: '/about' },
    { label: 'Contact', ariaLabel: 'Get in touch with us', link: '/contact' }
  ];

  const socialItems = [
    { label: 'Email', link: 'mailto:placesinabuja@gmail.com' }
  ];

  return (
    <div className="staggered-menu-header-wrapper">
      <StaggeredMenu
        position="right"
        items={menuItems}
        socialItems={socialItems}
        displaySocials={true}
        displayItemNumbering={true}
        menuButtonColor={isDark ? '#fff' : '#000'}
        openMenuButtonColor="#fff"
        changeMenuColorOnOpen={true}
        colors={isDark ? ['#1a1a1a', '#2a2a2a'] : ['#f0f0f0', '#e0e0e0']}
        logoUrl="/logo.svg"
        accentColor="#008751"
        isFixed={false}
        onMenuOpen={() => {
          // Prevent body scroll when menu is open
          if (typeof document !== 'undefined') {
            document.body.style.overflow = 'hidden';
          }
        }}
        onMenuClose={() => {
          // Restore body scroll when menu is closed
          if (typeof document !== 'undefined') {
            document.body.style.overflow = '';
          }
        }}
      />
    </div>
  );
}


