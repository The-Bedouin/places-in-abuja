"use client";

import React, { useMemo } from 'react';
import { useTheme } from 'next-themes';
import CardNav, { CardNavItem } from './CardNav';

export default function HeroNav() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const items: CardNavItem[] = useMemo(() => {
    if (isDark) {
      return [
        {
          label: 'Social',
          bgColor: '#170D27',
          textColor: '#ffffff',
          links: [
            { label: 'Twitter', ariaLabel: 'Twitter', href: 'https://twitter.com/placesinabuja' },
            { label: 'LinkedIn', ariaLabel: 'LinkedIn', href: 'https://linkedin.com' },
            { label: 'Email', ariaLabel: 'Email us', href: '/contact' }
          ]
        },
        {
          label: 'Navigate',
          bgColor: '#0D0716',
          textColor: '#ffffff',
          links: [
            { label: 'Blog', ariaLabel: 'Go to Blog', href: '/blog' },
            { label: 'About', ariaLabel: 'About page', href: '/about' },
            { label: 'Contact', ariaLabel: 'Contact page', href: '/contact' }
          ]
        }
      ];
    }
    return [
      {
        label: 'Social',
        bgColor: '#EDE9FE',
        textColor: '#111827',
        links: [
          { label: 'Twitter', ariaLabel: 'Twitter', href: 'https://twitter.com/placesinabuja' },
          { label: 'LinkedIn', ariaLabel: 'LinkedIn', href: 'https://linkedin.com' },
          { label: 'Email', ariaLabel: 'Email us', href: '/contact' }
        ]
      },
      {
        label: 'Navigate',
        bgColor: '#F3F0FF',
        textColor: '#111827',
        links: [
          { label: 'Blog', ariaLabel: 'Go to Blog', href: '/blog' },
          { label: 'About', ariaLabel: 'About page', href: '/about' },
          { label: 'Contact', ariaLabel: 'Contact page', href: '/contact' }
        ]
      }
    ];
  }, [isDark]);

  return (
    <div className="hidden lg:block px-4">
      <CardNav
        logo="/logo.svg"
        logoAlt="Places in Abuja"
        brandName="Places in Abuja"
        items={items}
        baseColor={isDark ? 'rgba(17,24,39,0.85)' : 'rgba(255,255,255,0.9)'}
        menuColor={isDark ? '#fff' : '#000'}
        buttonBgColor={isDark ? '#111827' : '#111'}
        buttonTextColor="#fff"
        ease="power3.out"
      />
    </div>
  );
}


