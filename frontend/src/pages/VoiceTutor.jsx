import { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { motion } from 'framer-motion';
import { voiceTutor } from '../services/api';

export default function VoiceTutor() {
  const [transcriptText, setTranscriptText] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  useEffect(() => {
    setTranscriptText(transcript);
  }, [transcript]);

  const startListening = () => {
    resetTranscript();
    SpeechRecognition.startListening({ continuous: true, language: 'en-US' });
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
  };

  const submitTranscript = async () => {
    if (!transcriptText.trim()) return;
    setIsLoading(true);
    setResponse('');
    try {
      const result = await voiceTutor(transcriptText);
      const responseText =
        result?.answer ||
        result?.response ||
        result?.text ||
        result?.result ||
        JSON.stringify(result, null, 2);
      setResponse(responseText);
      const utterance = new SpeechSynthesisUtterance(responseText);
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    } catch (error) {
      setResponse(error.message || 'Voice tutor failed.');
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
        <div className="grid gap-6 xl:grid-cols-2">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Voice Tutor</p>
            <h3 className="text-2xl font-semibold text-white">Speak your study questions</h3>
            <p className="mt-3 text-slate-400">
              Start recording and send a transcript to the AI tutor. Responses can also be played back using text-to-speech.
            </p>
          </div>
          <div className="rounded-3xl bg-slate-900/80 p-5 text-slate-200">
            <p className="text-sm text-slate-400">Status</p>
            <p className="mt-3 text-lg font-semibold text-white">{listening ? 'Listening...' : 'Idle'}</p>
            <p className="mt-2 text-sm text-slate-400">Transcript length: {transcriptText.length} chars</p>
          </div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel rounded-3xl border border-white/10 p-6 shadow-glass"
      >
        <div className="space-y-4">
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={startListening}
              className="rounded-3xl bg-sky-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-400"
            >
              Start Recording
            </button>
            <button
              type="button"
              onClick={stopListening}
              className="rounded-3xl bg-slate-800/90 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:bg-slate-700"
            >
              Stop Recording
            </button>
            <button
              type="button"
              onClick={submitTranscript}
              disabled={isLoading || !transcriptText.trim()}
              className="rounded-3xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? 'Processing...' : 'Send to AI'}
            </button>
          </div>
          <div className="rounded-3xl border border-slate-700 bg-slate-900/80 p-4 text-slate-200">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Transcript</p>
            <p className="mt-3 min-h-[120px] whitespace-pre-wrap text-sm leading-6 text-slate-100">{transcriptText || 'Speak now to capture your question.'}</p>
          </div>
          <div className="rounded-3xl border border-slate-700 bg-slate-900/80 p-4 text-slate-200">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">AI Response</p>
            <p className="mt-3 min-h-[120px] whitespace-pre-wrap text-sm leading-6 text-slate-100">{response || 'AI responses will appear here.'}</p>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
