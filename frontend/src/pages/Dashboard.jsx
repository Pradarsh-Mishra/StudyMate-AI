import { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import StatusCard from '../components/StatusCard';
import SectionHeader from '../components/SectionHeader';
import { motion } from 'framer-motion';

const stats = [
  { title: 'Uploaded Documents', value: '18', description: '+24%', accent: 'bg-emerald-500/15 text-emerald-200' },
  { title: 'Quizzes Generated', value: '12', description: '+18%', accent: 'bg-sky-500/15 text-sky-200' },
  { title: 'Weak Topics', value: '3', description: 'AI insight', accent: 'bg-amber-500/15 text-amber-200' },
  { title: 'Daily Focus', value: '4h', description: 'Target', accent: 'bg-violet-500/15 text-violet-200' }
];

const lineData = [
  { day: 'Mon', progress: 35 },
  { day: 'Tue', progress: 50 },
  { day: 'Wed', progress: 66 },
  { day: 'Thu', progress: 82 },
  { day: 'Fri', progress: 90 },
  { day: 'Sat', progress: 96 },
  { day: 'Sun', progress: 100 }
];

const pieData = [
  { name: 'DBMS', value: 40 },
  { name: 'OS', value: 25 },
  { name: 'Java', value: 35 }
];

const COLORS = ['#38bdf8', '#818cf8', '#f472b6'];

export default function Dashboard() {
  const recentActions = useMemo(
    () => [
      'Uploaded Advanced DBMS notes',
      'Generated OS quiz',
      'Received progress analysis',
      'Created 15-day study plan'
    ],
    []
  );

  return (
    <div className="space-y-6">
      <SectionHeader title="Performance overview" subtitle="Your AI-powered study assistant" />
      <div className="grid gap-6 xl:grid-cols-4">
        {stats.map((item) => (
          <StatusCard key={item.title} {...item} />
        ))}
      </div>
      <div className="grid gap-6 xl:grid-cols-2">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-panel rounded-3xl border border-white/10 p-6 shadow-glass"
        >
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Study streak</p>
              <h3 className="text-2xl font-semibold text-white">Learning curve</h3>
            </div>
            <span className="rounded-3xl bg-slate-800/80 px-4 py-2 text-sm text-slate-300">
              5 sessions this week
            </span>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={lineData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="progressGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.65} />
                    <stop offset="95%" stopColor="#0284c7" stopOpacity={0.08} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ background: '#0f172a', borderRadius: 16, border: '1px solid #334155' }} />
                <Area type="monotone" dataKey="progress" stroke="#38bdf8" strokeWidth={3} fill="url(#progressGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="glass-panel rounded-3xl border border-white/10 p-6 shadow-glass"
        >
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Subject mix</p>
              <h3 className="text-2xl font-semibold text-white">Weak-topic distribution</h3>
            </div>
            <span className="rounded-3xl bg-slate-800/80 px-4 py-2 text-sm text-slate-300">Focus areas</span>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} innerRadius={60} outerRadius={110} dataKey="value" stroke="transparent">
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.section>
      </div>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass-panel rounded-3xl border border-white/10 p-6 shadow-glass"
      >
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Recent activity</p>
            <h3 className="text-2xl font-semibold text-white">What you did last</h3>
          </div>
          <button className="rounded-3xl bg-slate-800/90 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:bg-slate-700">
            View full log
          </button>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {recentActions.map((item) => (
            <div key={item} className="rounded-3xl border border-slate-700/70 bg-slate-900/70 p-4 text-slate-200">
              {item}
            </div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
