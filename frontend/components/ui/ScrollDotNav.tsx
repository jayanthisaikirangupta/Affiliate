'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface NavSection {
  id: string;
  label: string;
}

interface ScrollDotNavProps {
  sections: NavSection[];
}

export default function ScrollDotNav({ sections }: ScrollDotNavProps) {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? '');
  const [visible, setVisible] = useState(false);

  // Show nav after scrolling past the very top
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 120);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // IntersectionObserver to track active section
  useEffect(() => {
    if (sections.length === 0) return;

    const observers: IntersectionObserver[] = [];

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(id);
        },
        {
          rootMargin: '-40% 0px -40% 0px',
          threshold: 0,
        }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [sections]);

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          aria-label="Page sections"
          className="fixed right-5 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-center gap-3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {sections.map(({ id, label }) => {
            const isActive = activeId === id;
            return (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                aria-label={`Go to ${label}`}
                aria-current={isActive ? 'true' : undefined}
                className="relative group flex items-center justify-end gap-2.5 p-1"
              >
                {/* Tooltip label */}
                <span
                  className="absolute right-full mr-3 opacity-0 group-hover:opacity-100 transition-all duration-200
                             text-xs font-body font-semibold whitespace-nowrap pointer-events-none
                             px-2.5 py-1 rounded-full bg-white border border-warm-200 shadow-sm text-navy-700
                             translate-x-1 group-hover:translate-x-0"
                >
                  {label}
                </span>

                {/* Dot */}
                <motion.div
                  className="rounded-full"
                  style={{ backgroundColor: isActive ? '#D4763C' : 'rgba(0,0,0,0.18)' }}
                  animate={{
                    width: isActive ? 10 : 6,
                    height: isActive ? 10 : 6,
                    backgroundColor: isActive ? '#D4763C' : 'rgba(0,0,0,0.18)',
                  }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                />
              </button>
            );
          })}
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
