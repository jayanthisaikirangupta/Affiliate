import Link from 'next/link';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: `https://petgearhub.co.uk${item.href}` } : {}),
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-1.5 text-sm font-body text-text-muted">
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-1.5">
            {i > 0 && <span aria-hidden="true" className="text-border">/</span>}
            {item.href && i < items.length - 1 ? (
              <Link href={item.href} className="hover:text-accent transition-colors">{item.label}</Link>
            ) : (
              <span className={i === items.length - 1 ? 'text-text-secondary' : ''}>{item.label}</span>
            )}
          </span>
        ))}
      </nav>
    </>
  );
}
