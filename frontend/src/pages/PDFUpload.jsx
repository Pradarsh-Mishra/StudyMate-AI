import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import UploadDropzone from '../components/UploadDropzone';
import { uploadStudyMaterial } from '../services/api';

const initialFiles = [
  { name: 'dbms_notes.pdf', size: '2.4MB', status: 'Processed' },
  { name: 'os_summary.pdf', size: '1.8MB', status: 'Waiting' }
];

export default function PDFUpload() {
  const [uploadProgress, setUploadProgress] = useState(null);
  const [uploadResult, setUploadResult] = useState(null);
  const [files, setFiles] = useState(initialFiles);
  const [activeFile, setActiveFile] = useState(null);

  const handleFileSelect = async (file) => {
    setActiveFile(file.name);
    setUploadProgress(0);
    try {
      const response = await uploadStudyMaterial(file, (event) => {
        setUploadProgress(Math.round((event.loaded / event.total) * 100));
      });
      const uploadData = {
        ...response,
        filename: response.filename || file.name,
        status: response.status || 'Uploaded'
      };
      setUploadResult(uploadData);
      setFiles((prev) => [
        {
          name: uploadData.filename,
          size: response.chunks ? `${response.chunks} chunks` : `${(file.size / 1024 / 1024).toFixed(1)}MB`,
          status: uploadData.status
        },
        ...prev
      ]);
    } catch (error) {
      setUploadResult({ error: error.message || 'Upload failed' });
    } finally {
      setUploadProgress(null);
      setActiveFile(null);
    }
  };

  const handleDelete = (index) => {
    setFiles((prev) => prev.filter((_, idx) => idx !== index));
  };

  const fileSummary = useMemo(
    () => (
      <div className="rounded-3xl border border-slate-700 bg-slate-900/70 p-5">
        <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Upload summary</p>
        <p className="mt-3 text-xl font-semibold text-white">{uploadResult?.filename || 'No upload yet'}</p>
        <p className="mt-2 text-slate-400">{uploadResult?.status ? `Status: ${uploadResult.status}` : 'Upload a PDF to analyze your study material.'}</p>
      </div>
    ), [uploadResult]
  );

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid gap-6 lg:grid-cols-[1.5fr_1fr]"
      >
        <UploadDropzone onFileSelect={handleFileSelect} uploadProgress={uploadProgress}>
          {activeFile && <p className="mt-4 text-sm text-slate-400">Uploading {activeFile}…</p>}
        </UploadDropzone>
        {fileSummary}
      </motion.div>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-panel rounded-3xl border border-white/10 p-6 shadow-glass"
      >
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Uploaded documents</p>
            <h3 className="text-2xl font-semibold text-white">Recent files</h3>
          </div>
          <span className="rounded-3xl bg-slate-800/80 px-4 py-2 text-sm text-slate-300">Total {files.length}</span>
        </div>
        <div className="space-y-4">
          {files.map((file, index) => (
            <div key={`${file.name}-${index}`} className="flex flex-col gap-3 rounded-3xl border border-slate-700/70 bg-slate-900/70 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-semibold text-white">{file.name}</p>
                <p className="mt-1 text-sm text-slate-400">{file.size}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-slate-800 px-3 py-2 text-xs uppercase tracking-[0.24em] text-slate-300">{file.status}</span>
                <button
                  type="button"
                  onClick={() => handleDelete(index)}
                  className="rounded-3xl bg-rose-500/10 px-4 py-2 text-sm text-rose-300 transition hover:bg-rose-500/20"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
