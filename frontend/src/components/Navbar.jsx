import { useLocation, Link } from 'react-router-dom';
import { HiOutlineBellAlert, HiOutlineMagnifyingGlass } from 'react-icons/hi2';
import ThemeToggle from './ThemeToggle';

const labels = {
  '/dashboard': 'Dashboard',
  '/pdf-upload': 'PDF Upload',
  '/ai-tutor': 'AI Tutor',
  '/voice-tutor': 'Voice Tutor',
  '/image-scanner': 'Image Scanner',
  '/summary': 'Summary Generator',
  '/quiz': 'Quiz Generator',
  '/study-planner': 'Study Planner',
  '/progress': 'Progress Tracker'
};

export default function Navbar() {
  const location = useLocation();
  const pageTitle = labels[location.pathname] || 'AI Study Assistant';

  return (
    <div className="glass-panel flex flex-col gap-4 border-white/10 p-4 shadow-glass md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-sm uppercase tracking-[0.24em] text-sky-400/80">Welcome back</p>
        <h2 className="text-2xl font-semibold text-white">{pageTitle}</h2>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex w-full items-center rounded-3xl bg-slate-900/70 px-4 py-3 text-slate-400 shadow-inner shadow-slate-950/40 sm:w-auto">
          <HiOutlineMagnifyingGlass className="mr-2 h-5 w-5" />
          <input
            type="search"
            placeholder="Search features"
            className="w-full bg-transparent outline-none placeholder:text-slate-500"
          />
        </div>
        <ThemeToggle />
        <Link
          to="/dashboard"
          className="inline-flex items-center rounded-3xl bg-slate-800/90 px-4 py-3 text-sm font-medium text-slate-100 transition hover:bg-slate-700"
        >
          <HiOutlineBellAlert className="mr-2 h-5 w-5" />
          Alerts
        </Link>
      </div>
    </div>
  );
}
