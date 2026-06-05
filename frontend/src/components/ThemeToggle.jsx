import { useEffect } from 'react';
import { HiOutlineSun, HiOutlineMoon } from 'react-icons/hi2';
import { useLocalStorage } from '../hooks/useLocalStorage';

export default function ThemeToggle() {
  const [theme, setTheme] = useLocalStorage('ai-study-theme', 'dark');

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  return (
    <button
      type="button"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="inline-flex items-center justify-center rounded-3xl bg-slate-800/90 px-4 py-3 text-sm transition hover:bg-slate-700"
    >
      {theme === 'dark' ? (
        <span className="flex items-center gap-2 text-slate-100">
          <HiOutlineSun className="h-5 w-5" /> Light
        </span>
      ) : (
        <span className="flex items-center gap-2 text-slate-900">
          <HiOutlineMoon className="h-5 w-5" /> Dark
        </span>
      )}
    </button>
  );
}
