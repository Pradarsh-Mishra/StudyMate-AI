export default function ChatBubble({ message, isUser }) {
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[92%] rounded-3xl p-4 text-sm leading-6 ${isUser ? 'bg-sky-500/15 text-slate-100' : 'bg-slate-900/90 text-slate-200'}`}>
        <p>{message}</p>
      </div>
    </div>
  );
}
