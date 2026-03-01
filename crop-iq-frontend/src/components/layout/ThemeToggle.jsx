import React, { useEffect, useState } from 'react';

const ThemeToggle = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="w-12 h-12 rounded-2xl bg-[var(--bg-card)] border border-black/5 dark:border-white/10 shadow-sm transition-all hover:scale-110 active:scale-95 flex items-center justify-center group"
      aria-label="Toggle Theme"
    >
      {theme === 'dark' ? (
        <span className="text-xl transition-transform group-hover:rotate-12">☀️</span>
      ) : (
        <span className="text-xl transition-transform group-hover:-rotate-12">🌙</span>
      )}
    </button>
  );
};

export default ThemeToggle;