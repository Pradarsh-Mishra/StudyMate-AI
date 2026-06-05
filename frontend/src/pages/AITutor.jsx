import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { askAItutor } from '../services/api';
import ChatBubble from '../components/ChatBubble';

export default function AITutor() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Hi! Ask me anything about your study materials.' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);

  const submitQuestion = async (event) => {
    event.preventDefault();
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { role: 'user', text: input }]);
    setInput('');
    setIsLoading(true);

    try {
      const { answer } = await askAItutor(input);
      setMessages((prev) => [...prev, { role: 'assistant', text: answer }]);
      setTimeout(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (error) {
      setMessages((prev) => [...prev, { role: 'assistant', text: error.message || 'Unable to fetch answer.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel rounded-3xl border border-white/10 p-6 shadow-glass"
      >
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">AI Tutor</p>
            <h3 className="text-2xl font-semibold text-white">Ask study questions in natural language</h3>
          </div>
          <p className="max-w-xl text-sm leading-6 text-slate-400">
            Use the AI tutor to clarify concepts, review notes, and get instantly generated explanations for your subjects.
          </p>
        </div>
      </motion.div>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel rounded-3xl border border-white/10 p-6 shadow-glass"
      >
        <div className="mb-6 rounded-3xl border border-slate-800 bg-slate-950/80 p-4">
          <div className="max-h-[55vh] overflow-y-auto pr-2 space-y-4">
            {messages.map((message, index) => (
              <ChatBubble key={`${message.role}-${index}`} message={message.text} isUser={message.role === 'user'} />
            ))}
            <div ref={scrollRef} />
          </div>
        </div>
        <form onSubmit={submitQuestion} className="flex flex-col gap-4 sm:flex-row">
          <input
            type="text"
            placeholder="Ask about DBMS normalization, exam strategy, or summary details..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full rounded-3xl border border-slate-700 bg-slate-900/80 px-4 py-4 text-slate-100 outline-none transition focus:border-sky-400"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="rounded-3xl bg-sky-500 px-6 py-4 text-sm font-semibold text-slate-950 transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? 'Thinking...' : 'Send'}
          </button>
        </form>
      </motion.section>
    </div>
  );
}
