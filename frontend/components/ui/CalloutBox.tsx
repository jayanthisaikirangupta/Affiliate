const configs = {
  info: { bg: 'bg-blue-50', border: 'border-blue-200', title: 'text-blue-800', text: 'text-blue-700', icon: 'ℹ️' },
  tip: { bg: 'bg-amber-50/50', border: 'border-accent/20', title: 'text-accent-dark', text: 'text-accent-dark/80', icon: '💡' },
  warning: { bg: 'bg-amber-50', border: 'border-amber-200', title: 'text-amber-800', text: 'text-amber-700', icon: '⚠️' },
  success: { bg: 'bg-green-50', border: 'border-green-200', title: 'text-green-800', text: 'text-green-700', icon: '✅' },
};

export default function CalloutBox({ type, title, children }: { type: keyof typeof configs; title?: string; children: React.ReactNode }) {
  const c = configs[type];
  return (
    <div className={`${c.bg} border ${c.border} rounded-xl p-5 my-6`}>
      <div className="flex items-start gap-3">
        <span className="text-xl flex-shrink-0 mt-0.5" aria-hidden="true">{c.icon}</span>
        <div>
          {title && <p className={`font-body font-semibold text-sm ${c.title} mb-1`}>{title}</p>}
          <div className={`font-body text-sm ${c.text} leading-relaxed`}>{children}</div>
        </div>
      </div>
    </div>
  );
}
