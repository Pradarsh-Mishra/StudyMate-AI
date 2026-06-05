import { useState } from 'react';
import { motion } from 'framer-motion';
import { generateStudyPlan } from '../services/api';

export default function StudyPlanner() {
  const [subjects, setSubjects] = useState('DBMS, OS, Java');
  const [examDays, setExamDays] = useState(15);
  const [hoursPerDay, setHoursPerDay] = useState(4);
  const [plan, setPlan] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    setIsLoading(true);
    setPlan('');
    try {
      const response = await generateStudyPlan({
        subjects: subjects.split(',').map((subject) => subject.trim()).filter(Boolean),
        exam_days: examDays,
        hours_per_day: hoursPerDay
      });
      setPlan(response.plan);
    } catch (error) {
      setPlan(error.message || 'Unable to create study plan.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel rounded-3xl border border-white/10 p-6 shadow-glass"
      >
        <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Study planner</p>
            <h3 className="text-2xl font-semibold text-white">Generate your exam roadmap</h3>
            <p className="mt-3 text-slate-400">Build a structured timetable based on subjects, remaining days, and daily study time.</p>
          </div>
          <div className="grid gap-3 rounded-3xl border border-slate-700 bg-slate-900/80 p-4">
            <label className="text-sm text-slate-300">
              Subjects
              <input
                type="text"
                value={subjects}
                onChange={(e) => setSubjects(e.target.value)}
                className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-slate-100 outline-none focus:border-sky-400"
              />
            </label>
            <label className="text-sm text-slate-300">
              Exam days
              <input
                type="number"
                min={1}
                value={examDays}
                onChange={(e) => setExamDays(Number(e.target.value))}
                className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-slate-100 outline-none focus:border-sky-400"
              />
            </label>
            <label className="text-sm text-slate-300">
              Hours/day
              <input
                type="number"
                min={1}
                value={hoursPerDay}
                onChange={(e) => setHoursPerDay(Number(e.target.value))}
                className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-slate-100 outline-none focus:border-sky-400"
              />
            </label>
            <button
              type="button"
              onClick={handleGenerate}
              disabled={isLoading}
              className="rounded-3xl bg-sky-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? 'Creating plan...' : 'Generate Plan'}
            </button>
          </div>
        </div>
      </motion.section>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel rounded-3xl border border-white/10 p-6 shadow-glass"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Timetable preview</p>
            <h3 className="text-2xl font-semibold text-white">Generated study plan</h3>
          </div>
          <p className="text-sm text-slate-400">Subjects: {subjects}</p>
        </div>
        <div className="mt-6 rounded-3xl border border-slate-700 bg-slate-900/80 p-6 text-slate-200 min-h-[260px] whitespace-pre-wrap text-sm leading-7">
          {plan || 'Generate a plan to see your personalized study roadmap.'}
        </div>
      </motion.section>
    </div>
  );
}
