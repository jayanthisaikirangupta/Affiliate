const configs = {
  info: { bg: 'bg-[#F0F9FF]', border: 'border-info', title: 'text-info', text: 'text-navy-700', icon: 'ℹ️' },
  tip: { bg: 'bg-[#ECFDF5]', border: 'border-success', title: 'text-success', text: 'text-navy-700', icon: '💡' },
  warning: { bg: 'bg-[#FFFBEB]', border: 'border-warning', title: 'text-warning', text: 'text-navy-700', icon: '⚠️' },
  success: { bg: 'bg-[#ECFDF5]', border: 'border-success', title: 'text-success', text: 'text-navy-700', icon: '✅' },
};

export default function CalloutBox({ type, title, children }: { type: keyof typeof configs; title?: string; children: React.ReactNode }) {
  const c = configs[type];
  return (
    <div className={`${c.bg} border-l-4 ${c.border} rounded-xl p-5 my-6`}>
      <div className="flex items-start gap-3">
        <span className="text-[20px] flex-shrink-0 mt-0.5" aria-hidden="true">{c.icon}</span>
        <div>
          {title && <p className={`font-body font-semibold text-sm ${c.title} mb-1`}>{title}</p>}
          <div className={`font-body text-sm ${c.text} leading-relaxed`}>{children}</div>
        </div>
      </div>
    </div>
  );
}
