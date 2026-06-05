import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Form is mock-only for UI.
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.15),transparent_30%),radial-gradient(circle_at_bottom,rgba(168,85,247,0.18),transparent_20%),#020617] text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="w-full rounded-[2rem] border border-white/10 bg-slate-950/90 p-10 shadow-glass backdrop-blur-xl"
        >
          <div className="mb-10 space-y-2 text-center">
            <p className="text-sm uppercase tracking-[0.4em] text-sky-400/70">AI Study Assistant</p>
            <h1 className="text-4xl font-semibold">Welcome back</h1>
            <p className="text-slate-400">Sign in to access your personalized study dashboard.</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <label className="block">
              <span className="mb-2 block text-sm text-slate-300">Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-3xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-400"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm text-slate-300">Password</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-3xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-400"
              />
            </label>
            <div className="flex items-center justify-between text-sm text-slate-400">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="h-4 w-4 rounded border-slate-600 bg-slate-900 text-sky-500" />
                Remember me
              </label>
              <Link to="/auth/forgot" className="text-sky-300 hover:text-sky-200">
                Forgot password?
              </Link>
            </div>
            <button className="w-full rounded-3xl bg-sky-500 px-5 py-3 text-base font-semibold text-slate-950 transition hover:bg-sky-400">
              Continue
            </button>
          </form>
          <p className="mt-8 text-center text-sm text-slate-400">
            New here?{' '}
            <Link to="/auth/register" className="font-semibold text-sky-300 hover:text-sky-200">
              Create an account
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
