import { useState } from 'react';
import { motion } from 'framer-motion';
import { generateQuiz } from '../services/api';

const difficulties = ['easy', 'medium', 'hard'];

export default function QuizGenerator() {
  const [topic, setTopic] = useState('DBMS');
  const [difficulty, setDifficulty] = useState('medium');
  const [questions, setQuestions] = useState(5);
  const [quiz, setQuiz] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    setIsLoading(true);
    setQuiz('');
    try {
      const response = await generateQuiz({ topic, difficulty, questions });
      setQuiz(response.quiz);
    } catch (error) {
      setQuiz(error.message || 'Unable to generate quiz content.');
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
            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Quiz generator</p>
            <h3 className="text-2xl font-semibold text-white">Build practice questions fast</h3>
            <p className="mt-3 text-slate-400">Choose a topic, difficulty level, and the number of questions for instant quiz generation.</p>
          </div>
          <div className="grid gap-3 rounded-3xl border border-slate-700 bg-slate-900/80 p-4">
            <label className="text-sm text-slate-300">
              Topic
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-slate-100 outline-none focus:border-sky-400"
              />
            </label>
            <label className="text-sm text-slate-300">
              Difficulty
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-slate-100 outline-none focus:border-sky-400"
              >
                {difficulties.map((level) => (
                  <option key={level} value={level} className="bg-slate-950 text-slate-100">
                    {level}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-sm text-slate-300">
              Questions
              <input
                type="number"
                min={1}
                max={20}
                value={questions}
                onChange={(e) => setQuestions(Number(e.target.value))}
                className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-slate-100 outline-none focus:border-sky-400"
              />
            </label>
            <button
              type="button"
              onClick={handleGenerate}
              disabled={isLoading}
              className="rounded-3xl bg-sky-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? 'Generating...' : 'Generate Quiz'}
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
            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Quiz preview</p>
            <h3 className="text-2xl font-semibold text-white">Questions generated</h3>
          </div>
          <p className="text-sm text-slate-400">Topic: {topic}, Difficulty: {difficulty}, Questions: {questions}</p>
        </div>
        <div className="mt-6 rounded-3xl border border-slate-700 bg-slate-900/80 p-6 text-slate-200 min-h-[260px] whitespace-pre-wrap text-sm leading-7">
          {quiz || 'Your quiz will appear here after generation.'}
        </div>
      </motion.section>
    </div>
  );
}
