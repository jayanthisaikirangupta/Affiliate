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
        <h3 className="text-sm font-body font-semibold text-text-secondary uppercase tracking-wide mb-3">{title}</h3>
      )}
      <dl className="border border-border-light rounded-xl overflow-hidden">
        {entries.map(([key, val], i) => (
          <div
            key={i}
            className={`flex justify-between py-3 px-4 ${i % 2 === 0 ? 'bg-background' : 'bg-white'} ${i < entries.length - 1 ? 'border-b border-border-light' : ''}`}
          >
            <dt className="text-sm font-body text-text-secondary">{key}</dt>
            <dd className="text-sm font-body font-medium text-primary text-right ml-4">{val}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
