'use client';

import { useState, useEffect } from 'react';

interface TOCItem { id: string; text: string; level: number; }

export default function TableOfContents({ items: propItems, contentSelector = '.article-content' }: { items?: TOCItem[]; contentSelector?: string }) {
  const [items, setItems] = useState<TOCItem[]>(propItems || []);
  const [activeId, setActiveId] = useState('');
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (propItems) return;
    const container = document.querySelector(contentSelector);
    if (!container) return;
    const headings = Array.from(container.querySelectorAll('h2, h3'));
    setItems(headings.map((h, i) => {
      if (!h.id) h.id = `heading-${i}`;
      return { id: h.id, text: h.textContent || '', level: parseInt(h.tagName[1]) };
    }));
  }, [propItems, contentSelector]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActiveId(e.target.id); }),
      { rootMargin: '-80px 0px -80% 0px' }
    );
    items.forEach(item => { const el = document.getElementById(item.id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, [items]);

  if (!items.length) return null;

  return (
    <nav className="bg-background border border-border-light rounded-xl p-5" aria-label="Table of contents">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-body text-xs font-semibold uppercase tracking-widest text-text-muted">Contents</h3>
        <button onClick={() => setCollapsed(!collapsed)} className="text-xs font-body text-accent hover:underline" aria-expanded={!collapsed}>
          {collapsed ? 'Show' : 'Hide'}
        </button>
      </div>
      {!collapsed && (
        <ol className="space-y-1.5">
          {items.map(item => (
            <li key={item.id} className={item.level === 3 ? 'ml-4' : ''}>
              <a href={`#${item.id}`}
                className={`text-sm font-body block py-0.5 leading-snug transition-colors duration-150 hover:text-accent ${activeId === item.id ? 'text-accent font-semibold' : 'text-text-secondary'}`}>
                {item.text}
              </a>
            </li>
          ))}
        </ol>
      )}
    </nav>
  );
}
