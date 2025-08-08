'use client';

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <nav className="fixed top-0 inset-x-0 z-50 glass">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-xl font-semibold gradient-text">Ajeet • Portfolio</Link>
        <div className="flex items-center gap-4">
          <Link href="/about">About</Link>
          <Link href="/projects">Projects</Link>
          <Link href="/jobs">Experience</Link>
          <Link href="/chat">Ask AI</Link>
          <Link href="/admin" className="px-3 py-1 rounded bg-primary text-white">Admin</Link>
          {mounted && (
            <button
              aria-label="Toggle theme"
              className="px-2 py-1 rounded border"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? '🌙' : '☀️'}
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
