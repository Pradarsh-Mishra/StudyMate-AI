import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-center text-slate-100">
      <div className="glass-panel max-w-xl rounded-[2rem] border border-white/10 p-12 shadow-glass">
        <p className="text-sm uppercase tracking-[0.4em] text-sky-400/80">404 error</p>
        <h1 className="mt-6 text-5xl font-semibold">Page not found</h1>
        <p className="mt-4 text-slate-400">The page you are looking for does not exist, but your study assistant is still here.</p>
        <Link
          to="/dashboard"
          className="mt-8 inline-flex rounded-3xl bg-sky-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-400"
        >
          Return to dashboard
        </Link>
      </div>
    </div>
  );
}
