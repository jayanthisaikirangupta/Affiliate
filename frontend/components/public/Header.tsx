'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import api from '@/lib/api';
import type { Category } from '@/lib/types';
import { PawIcon } from '@/components/PawIcon';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [navCategories, setNavCategories] = useState<Category[]>([]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Fetch up to 3 categories to show in the nav
    api
      .getCategories()
      .then((cats) => setNavCategories(cats.slice(0, 3)))
      .catch(() => {});
  }, []);

  const staticLinks = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-border-light'
          : 'bg-transparent'
      }`}
    >
      <div className="editorial-container">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 gold-gradient rounded-sm flex items-center justify-center">
              <PawIcon className="w-5 h-5 text-white" />
            </div>
            <span className="font-display text-xl font-semibold tracking-tight text-primary">
              PetGearHub
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-10">
            {staticLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-body font-medium text-text-secondary
                           hover:text-primary transition-colors duration-200
                           relative after:absolute after:bottom-[-4px] after:left-0
                           after:w-0 after:h-[1.5px] after:bg-accent
                           after:transition-all after:duration-300
                           hover:after:w-full"
              >
                {link.label}
              </Link>
            ))}
            {navCategories.map((cat) => (
              <Link
                key={cat.id}
                href={`/categories/${cat.slug}`}
                className="text-sm font-body font-medium text-text-secondary
                           hover:text-primary transition-colors duration-200
                           relative after:absolute after:bottom-[-4px] after:left-0
                           after:w-0 after:h-[1.5px] after:bg-accent
                           after:transition-all after:duration-300
                           hover:after:w-full"
              >
                {cat.name}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-6">
            <Link
              href="/admin"
              className="text-xs font-body font-semibold tracking-widest uppercase
                         text-text-muted hover:text-accent transition-colors duration-200"
            >
              Admin
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="w-6 h-[1.5px] bg-primary block"
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-6 h-[1.5px] bg-primary block"
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="w-6 h-[1.5px] bg-primary block"
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white border-t border-border-light overflow-hidden"
          >
            <nav aria-label="Mobile navigation" className="editorial-container py-6 flex flex-col gap-4">
              {staticLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-lg font-display text-primary hover:text-accent transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              {navCategories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/categories/${cat.slug}`}
                  onClick={() => setMobileOpen(false)}
                  className="text-lg font-display text-primary hover:text-accent transition-colors"
                >
                  {cat.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-border-light">
                <Link href="/admin" className="text-sm text-text-muted hover:text-accent">
                  Admin Dashboard →
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
