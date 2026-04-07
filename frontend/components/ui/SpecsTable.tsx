interface Spec { key: string; value: string; }

interface SpecsTableProps {
  specs: Spec[] | Record<string, string>;
  title?: string;
}

export default function SpecsTable({ specs, title = 'Specifications' }: SpecsTableProps) {
  const entries: [string, string][] = Array.isArray(specs)
    ? specs.map(s => [s.key, s.value])
    : Object.entries(specs);

  if (!entries.length) return null;

  return (
    <div>
      {title && (
        <h3 className="bg-warm-200 text-navy-900 font-semibold text-sm font-body uppercase tracking-wide px-4 py-3 rounded-t-xl">{title}</h3>
      )}
      <dl className={`border border-warm-300 ${title ? 'rounded-b-xl' : 'rounded-xl'} overflow-hidden`}>
        {entries.map(([key, val], i) => (
          <div
            key={i}
            className={`flex justify-between py-3 px-4 ${i % 2 === 0 ? 'bg-white' : 'bg-warm-50'} ${i < entries.length - 1 ? 'border-b border-warm-300' : ''}`}
          >
            <dt className="text-sm font-body text-navy-800">{key}</dt>
            <dd className="text-sm font-body font-medium text-navy-800 text-right ml-4">{val}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
