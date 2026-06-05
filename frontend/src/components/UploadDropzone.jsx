import { HiOutlineCloudArrowUp } from 'react-icons/hi2';

export default function UploadDropzone({ onFileSelect, uploadProgress, children }) {
  return (
    <div className="glass-card rounded-3xl border border-dashed border-slate-600 p-6 text-center">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-slate-900/80 text-sky-300">
        <HiOutlineCloudArrowUp className="h-8 w-8" />
      </div>
      <div className="mt-6 space-y-4">
        <p className="text-lg font-semibold text-white">Drop a file or browse from your device</p>
        <p className="text-sm text-slate-400">Upload PDFs or images to power your study assistant.</p>
        <input
          type="file"
          onChange={(event) => event.target.files?.[0] && onFileSelect(event.target.files[0])}
          className="mx-auto block w-full cursor-pointer rounded-3xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-sm text-slate-200 transition hover:border-sky-400"
        />
        {uploadProgress != null && (
          <div className="rounded-full bg-slate-900/80 p-1">
            <div className="h-2 rounded-full bg-sky-500 transition-all" style={{ width: `${uploadProgress}%` }} />
          </div>
        )}
      </div>
      {children}
    </div>
  );
}
