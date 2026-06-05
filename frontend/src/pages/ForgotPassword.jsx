import { Link } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.12),transparent_25%),radial-gradient(circle_at_bottom,rgba(168,85,247,0.14),transparent_20%),#020617] text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-4xl items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="w-full rounded-[2rem] border border-white/10 bg-slate-950/90 p-10 shadow-glass backdrop-blur-xl"
        >
          <div className="mb-10 space-y-2 text-center">
            <p className="text-sm uppercase tracking-[0.4em] text-sky-400/70">Reset password</p>
            <h1 className="text-4xl font-semibold">Recover your account</h1>
            <p className="text-slate-400">Enter the email address connected to your account.</p>
          </div>
          {submitted ? (
            <div className="rounded-3xl border border-slate-700 bg-slate-900/80 p-8 text-center text-slate-200">
              <p className="text-xl font-semibold text-sky-200">Check your inbox</p>
              <p className="mt-3 text-slate-400">A recovery link has been sent to {email} (mocked UI).</p>
            </div>
          ) : (
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
              <button className="w-full rounded-3xl bg-sky-500 px-5 py-3 text-base font-semibold text-slate-950 transition hover:bg-sky-400">
                Send reset link
              </button>
            </form>
          )}
          <p className="mt-8 text-center text-sm text-slate-400">
            Remembered it?{' '}
            <Link to="/auth/login" className="font-semibold text-sky-300 hover:text-sky-200">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
