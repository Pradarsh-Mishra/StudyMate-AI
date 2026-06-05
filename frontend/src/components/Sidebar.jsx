import { NavLink } from 'react-router-dom';
import { HiOutlineHome, HiOutlineDocumentText, HiOutlineChatBubbleBottomCenterText, HiOutlineMicrophone, HiOutlineCamera, HiOutlineSparkles, HiOutlineClipboardDocumentList, HiOutlineCalendar, HiOutlineChartPie } from 'react-icons/hi2';
import { motion } from 'framer-motion';

const routes = [
  { label: 'Dashboard', path: '/dashboard', icon: HiOutlineHome },
  { label: 'PDF Upload', path: '/pdf-upload', icon: HiOutlineDocumentText },
  { label: 'AI Tutor', path: '/ai-tutor', icon: HiOutlineChatBubbleBottomCenterText },
  { label: 'Voice Tutor', path: '/voice-tutor', icon: HiOutlineMicrophone },
  { label: 'Image Scanner', path: '/image-scanner', icon: HiOutlineCamera },
  { label: 'Summary', path: '/summary', icon: HiOutlineSparkles },
  { label: 'Quiz', path: '/quiz', icon: HiOutlineClipboardDocumentList },
  { label: 'Study Planner', path: '/study-planner', icon: HiOutlineCalendar },
  { label: 'Progress', path: '/progress', icon: HiOutlineChartPie }
];

export default function Sidebar() {
  return (
    <motion.aside
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.45 }}
      className="hidden w-[280px] flex-none flex-col gap-6 overflow-y-auto border-r border-white/10 bg-slate-950/95 px-4 py-6 text-slate-200 shadow-glass lg:flex"
    >
      <div className="mb-4 flex items-center gap-3 rounded-3xl bg-white/5 px-4 py-5">
        <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-sky-500/15 text-sky-300 ring-1 ring-sky-400/20">
          AI
        </div>
        <div>
          <p className="text-sm text-slate-400">AI Study Assistant</p>
          <h1 className="text-lg font-semibold">Study Dashboard</h1>
        </div>
      </div>

      <nav className="space-y-2">
        {routes.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-3xl px-4 py-3 text-sm transition ${
                  isActive
                    ? 'bg-slate-800 text-sky-200 shadow-lg shadow-sky-500/10'
                    : 'text-slate-400 hover:bg-white/5 hover:text-slate-100'
                }`
              }
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      <div className="mt-auto rounded-3xl bg-slate-900/70 p-5 text-sm text-slate-300 shadow-glass">
        <p className="font-semibold text-slate-100">Study assistant tips</p>
        <p className="mt-2 text-xs leading-5 text-slate-400">
          Upload study guides, get AI explanations, create quizzes, and track progress all from one modern workspace.
        </p>
      </div>
    </motion.aside>
  );
}
