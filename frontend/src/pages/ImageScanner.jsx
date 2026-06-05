import { useState } from 'react';
import Webcam from 'react-webcam';
import { motion } from 'framer-motion';
import { uploadImageNotes } from '../services/api';
import UploadDropzone from '../components/UploadDropzone';

export default function ImageScanner() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [ocrText, setOcrText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [webcamMode, setWebcamMode] = useState(false);

  const handleUploadFile = async (file) => {
    setSelectedFile(file);
    setIsLoading(true);
    try {
      const result = await uploadImageNotes(file);
      setOcrText(result.text);
    } catch (error) {
      setOcrText(error.message || 'Unable to scan this image.');
    } finally {
      setIsLoading(false);
    }
  };

  const captureAndScan = async (image) => {
    const response = await fetch(image);
    const blob = await response.blob();
    const file = new File([blob], 'webcam-scan.png', { type: 'image/png' });
    handleUploadFile(file);
  };

  return (
    <div className="space-y-6">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel rounded-3xl border border-white/10 p-6 shadow-glass"
      >
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Image notes scanner</p>
            <h3 className="text-2xl font-semibold text-white">Scan lecture images or capture whiteboards.</h3>
            <p className="mt-3 text-slate-400">
              Upload an image or capture one from your webcam, then extract text using OCR and save notes for revision.
            </p>
          </div>
          <div className="space-y-3 rounded-3xl border border-slate-700 bg-slate-900/70 p-4">
            <button
              type="button"
              onClick={() => setWebcamMode((prev) => !prev)}
              className="w-full rounded-3xl bg-sky-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-400"
            >
              {webcamMode ? 'Hide Webcam' : 'Use Webcam'}
            </button>
            <p className="text-sm text-slate-400">
              {webcamMode
                ? 'Capture a live photo and scan it immediately.'
                : 'Or upload a lecture image for OCR conversion.'}
            </p>
          </div>
        </div>
      </motion.section>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <UploadDropzone onFileSelect={handleUploadFile} uploadProgress={isLoading ? 60 : null} />
        <div className="glass-panel rounded-3xl border border-white/10 p-6 shadow-glass">
          <div className="space-y-4">
            <div className="rounded-3xl border border-slate-700 bg-slate-900/80 p-4 text-slate-200">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-400">OCR output</p>
              <p className="mt-3 min-h-[180px] whitespace-pre-wrap text-sm leading-6 text-slate-100">
                {isLoading ? 'Scanning your image...' : ocrText || 'Upload or capture an image to see extracted text here.'}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOcrText('')}
              className="rounded-3xl bg-slate-800/90 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:bg-slate-700"
            >
              Clear results
            </button>
          </div>
        </div>
      </motion.div>
      {webcamMode && (
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-panel rounded-3xl border border-white/10 p-6 shadow-glass">
          <Webcam className="rounded-3xl bg-slate-950/80" audio={false} screenshotFormat="image/png" mirrored={true} />
          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={async () => {
                const webcam = document.querySelector('video');
                if (!webcam) return;
                const canvas = document.createElement('canvas');
                canvas.width = webcam.videoWidth;
                canvas.height = webcam.videoHeight;
                canvas.getContext('2d').drawImage(webcam, 0, 0);
                const image = canvas.toDataURL('image/png');
                await captureAndScan(image);
              }}
              className="rounded-3xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
            >
              Capture & Scan
            </button>
          </div>
        </motion.section>
      )}
    </div>
  );
}
