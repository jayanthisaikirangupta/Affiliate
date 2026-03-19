interface ProsConsBoxProps {
  pros: string[];
  cons: string[];
  variant?: 'default' | 'compact';
}

export default function ProsConsBox({ pros, cons, variant = 'default' }: ProsConsBoxProps) {
  if (!pros?.length && !cons?.length) return null;
  const compact = variant === 'compact';

  return (
    <div className={`grid grid-cols-1 ${pros.length && cons.length ? 'sm:grid-cols-2' : ''} gap-4`}>
      {pros?.length > 0 && (
        <div className={`${compact ? 'p-4' : 'p-5'} bg-green-50 border border-green-100 rounded-xl`}>
          <h4 className={`${compact ? 'text-xs' : 'text-sm'} font-body font-semibold text-green-700 uppercase tracking-wide mb-3`}>
            ✓ Pros
          </h4>
          <ul className="space-y-2">
            {pros.map((pro, i) => (
              <li key={i} className={`flex items-start gap-2 ${compact ? 'text-xs' : 'text-sm'} font-body text-green-800`}>
                <span className="text-green-600 mt-0.5 flex-shrink-0">✓</span>
                {pro}
              </li>
            ))}
          </ul>
        </div>
      )}
      {cons?.length > 0 && (
        <div className={`${compact ? 'p-4' : 'p-5'} bg-red-50 border border-red-100 rounded-xl`}>
          <h4 className={`${compact ? 'text-xs' : 'text-sm'} font-body font-semibold text-red-700 uppercase tracking-wide mb-3`}>
            ✗ Cons
          </h4>
          <ul className="space-y-2">
            {cons.map((con, i) => (
              <li key={i} className={`flex items-start gap-2 ${compact ? 'text-xs' : 'text-sm'} font-body text-red-800`}>
                <span className="text-red-500 mt-0.5 flex-shrink-0">✗</span>
                {con}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
