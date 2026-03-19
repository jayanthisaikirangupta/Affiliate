interface AuthorBioProps {
  name: string;
  photo?: string;
  bio?: string;
  credentials?: string;
  publishedAt?: string;
  readTime?: number;
}

export default function AuthorBio({ name, photo, bio, credentials, publishedAt, readTime }: AuthorBioProps) {
  const fmt = (d?: string) => d ? new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : null;

  return (
    <div className="flex items-start gap-4">
      {photo ? (
        <img src={photo} alt={name} className="w-12 h-12 rounded-full object-cover flex-shrink-0" />
      ) : (
        <div className="w-12 h-12 rounded-full bg-border flex items-center justify-center flex-shrink-0">
          <span className="text-lg font-semibold text-text-muted">{name.charAt(0)}</span>
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="font-body font-semibold text-primary text-sm">{name}</p>
        {credentials && <p className="text-xs font-body text-accent mb-1">{credentials}</p>}
        {bio && <p className="text-xs font-body text-text-secondary leading-relaxed">{bio}</p>}
        <div className="flex items-center gap-3 mt-1">
          {fmt(publishedAt) && <span className="text-xs font-body text-text-muted">{fmt(publishedAt)}</span>}
          {readTime && <span className="text-xs font-body text-text-muted">{readTime} min read</span>}
        </div>
      </div>
    </div>
  );
}
