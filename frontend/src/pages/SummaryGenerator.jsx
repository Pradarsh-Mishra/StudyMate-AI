import { useState } from 'react';
import { motion } from 'framer-motion';
import { generateSummary } from '../services/api';

export default function SummaryGenerator() {
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    setIsLoading(true);
    setSummary('');
    try {
      const response = await generateSummary();
      const generatedSummary =
        response?.summary ||
        response?.text ||
        response?.result ||
        response?.data?.summary ||
        JSON.stringify(response, null, 2);
      setSummary(generatedSummary);
    } catch (error) {
      setSummary(error.message || 'Unable to generate summary.');
    } finally {
      setIsLoading(false);
    }
  };

  const copySummary = () => {
    navigator.clipboard.writeText(summary || '');
  };

  const downloadSummary = () => {
    const blob = new Blob([summary], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'summary.txt';
    link.click();
  };

  return (
    <div className="space-y-6">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel rounded-3xl border border-white/10 p-6 shadow-glass"
      >
        <div className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Summary generator</p>
            <h3 className="text-2xl font-semibold text-white">Create concise revision summaries</h3>
            <p className="mt-3 text-slate-400">Generate a quick study summary from your uploaded materials in one click.</p>
          </div>
          <button
            type="button"
            onClick={handleGenerate}
            disabled={isLoading}
            className="h-fit rounded-3xl bg-sky-500 px-6 py-4 text-sm font-semibold text-slate-950 transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? 'Generating...' : 'Generate Summary'}
          </button>
        </div>
      </motion.section>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel rounded-3xl border border-white/10 p-6 shadow-glass"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Summary output</p>
            <h3 className="text-2xl font-semibold text-white">Your AI summary</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={copySummary}
              disabled={!summary}
              className="rounded-3xl bg-slate-800/90 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Copy
            </button>
            <button
              type="button"
              onClick={downloadSummary}
              disabled={!summary}
              className="rounded-3xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Download
            </button>
          </div>
        </div>
        <div className="mt-6 rounded-3xl border border-slate-700 bg-slate-900/80 p-6 text-slate-200 min-h-[220px]">
          <p className="whitespace-pre-wrap text-sm leading-7 text-slate-100">{summary || 'Press the button above to generate a polished summary based on your study content.'}</p>
        </div>
      </motion.section>
    </div>
  );
}
