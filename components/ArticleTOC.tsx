"use client";

import { useEffect, useMemo, useState } from 'react';

type TocItem = {
  id: string;
  text: string;
  level: 2 | 3;
};

export default function ArticleTOC({ rootSelector = '#article-content' }: { rootSelector?: string }) {
  const [items, setItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const root = document.querySelector(rootSelector) as HTMLElement | null;
    if (!root) return;
    const headings = Array.from(root.querySelectorAll('h2')) as HTMLHeadingElement[];
    const toc: TocItem[] = headings
      .filter((h) => h.id)
      .map((h) => ({ id: h.id, text: h.innerText, level: 2 as 2 }));
    setItems(toc);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.target.getBoundingClientRect().top - b.target.getBoundingClientRect().top);
        if (visible[0]) setActiveId((visible[0].target as HTMLElement).id);
      },
      // Make the active section update sooner and persist longer in view
      { rootMargin: '0px 0px -60% 0px', threshold: [0, 0.1, 0.5, 1] }
    );
    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [rootSelector]);

  // Auto-scroll the active TOC link into view within the scrollable TOC container
  useEffect(() => {
    if (!activeId) return;
    const activeLink = document.querySelector(`a[href="#${activeId}"]`);
    if (activeLink) activeLink.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }, [activeId]);

  const hasItems = useMemo(() => items.length > 0, [items]);
  
  // Always render, but conditionally show content
  if (!hasItems) {
    return null;
  }

  return (
    <nav aria-label="Table of contents" className="text-sm">
      <h2 className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">On this page</h2>
      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`block rounded px-2 py-1 transition-colors ${
                activeId === item.id
                  ? 'text-brand-600 dark:text-brand-300 bg-brand-50/60 dark:bg-brand-900/30'
                  : 'text-gray-700 dark:text-gray-200 hover:text-brand-600 dark:hover:text-brand-300'
              }`}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}


