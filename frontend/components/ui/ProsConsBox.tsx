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
        <div className={`${compact ? 'p-4' : 'p-5'} bg-[#ECFDF5] border-l-4 border-success rounded-xl`}>
          <h4 className={`${compact ? 'text-xs' : 'text-sm'} font-body font-semibold text-success uppercase tracking-wide mb-3`}>
            ✓ Pros
          </h4>
          <ul className="space-y-2">
            {pros.map((pro, i) => (
              <li key={i} className={`flex items-start gap-2 ${compact ? 'text-xs' : 'text-sm'} font-body text-green-800`}>
                <span className="text-success mt-0.5 flex-shrink-0">✓</span>
                {pro}
              </li>
            ))}
          </ul>
        </div>
      )}
      {cons?.length > 0 && (
        <div className={`${compact ? 'p-4' : 'p-5'} bg-[#FEF2F2] border-l-4 border-destructive rounded-xl`}>
          <h4 className={`${compact ? 'text-xs' : 'text-sm'} font-body font-semibold text-destructive uppercase tracking-wide mb-3`}>
            ✗ Cons
          </h4>
          <ul className="space-y-2">
            {cons.map((con, i) => (
              <li key={i} className={`flex items-start gap-2 ${compact ? 'text-xs' : 'text-sm'} font-body text-red-800`}>
                <span className="text-destructive mt-0.5 flex-shrink-0">✗</span>
                {con}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
