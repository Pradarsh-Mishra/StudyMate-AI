import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { motion } from 'framer-motion';

const scoreData = [
  { subject: 'Java', score: 90 },
  { subject: 'DBMS', score: 40 },
  { subject: 'OS', score: 60 }
];

const topicData = [
  { name: 'DBMS', value: 35 },
  { name: 'OS', value: 20 },
  { name: 'Java', value: 45 }
];

const COLORS = ['#38bdf8', '#f472b6', '#a855f7'];

export default function ProgressTracker() {
  return (
    <div className="space-y-6">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel rounded-3xl border border-white/10 p-6 shadow-glass"
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Progress tracker</p>
            <h3 className="text-2xl font-semibold text-white">Visualize learning performance</h3>
            <p className="mt-3 text-slate-400">See your strength by subject and identify weak topics at a glance.</p>
          </div>
          <div className="rounded-3xl border border-slate-700 bg-slate-900/80 p-5 text-slate-200">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Recommendation</p>
            <p className="mt-3 text-lg font-semibold text-white">Practice DBMS Normalization more to secure your next exam.</p>
          </div>
        </div>
      </motion.section>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel rounded-3xl border border-white/10 p-6 shadow-glass"
      >
        <div className="grid gap-6 xl:grid-cols-2">
          <div className="rounded-3xl border border-slate-700 bg-slate-900/80 p-4">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Recent scores</p>
            <div className="h-72 mt-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={scoreData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                  <XAxis dataKey="subject" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip contentStyle={{ background: '#0f172a', borderRadius: 16, border: '1px solid #334155' }} />
                  <Bar dataKey="score" fill="#38bdf8" radius={[12, 12, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="rounded-3xl border border-slate-700 bg-slate-900/80 p-4">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Weak topic detection</p>
            <div className="h-72 mt-6">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={topicData} innerRadius={55} outerRadius={95} dataKey="value" stroke="transparent">
                    {topicData.map((entry, index) => (
                      <Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend iconType="circle" />
                  <Tooltip contentStyle={{ background: '#0f172a', borderRadius: 16, border: '1px solid #334155' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </motion.section>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel rounded-3xl border border-white/10 p-6 shadow-glass"
      >
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl border border-slate-700 bg-slate-900/80 p-5">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Average score</p>
            <p className="mt-4 text-4xl font-semibold text-white">65%</p>
            <p className="mt-2 text-sm text-slate-400">Your overall progress across the last assessments.</p>
          </div>
          <div className="rounded-3xl border border-slate-700 bg-slate-900/80 p-5">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Weakest topic</p>
            <p className="mt-4 text-4xl font-semibold text-white">DBMS</p>
            <p className="mt-2 text-sm text-slate-400">AI recommends targeted revision sessions for normalization.</p>
          </div>
          <div className="rounded-3xl border border-slate-700 bg-slate-900/80 p-5">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Weekly goal</p>
            <p className="mt-4 text-4xl font-semibold text-white">20h</p>
            <p className="mt-2 text-sm text-slate-400">Keep your streak alive and focus on weaker subjects.</p>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
