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
    <div className="bg-warm-50 rounded-2xl p-6 border border-warm-300">
      <div className="flex items-start gap-4">
        {photo ? (
          <img src={photo} alt={name} className="w-12 h-12 rounded-full object-cover flex-shrink-0 border-2 border-warm-300" />
        ) : (
          <div className="w-12 h-12 rounded-full bg-warm-200 flex items-center justify-center flex-shrink-0 border-2 border-warm-300">
            <span className="text-lg font-semibold text-navy-500">{name.charAt(0)}</span>
          </div>
        )}
        <div className="flex-1 min-w-0">
          <p className="text-lg font-semibold text-navy-900 font-display">{name}</p>
          {credentials && <p className="text-sm font-body text-navy-500 mb-1">{credentials}</p>}
          {bio && <p className="text-sm font-body text-navy-700 leading-relaxed">{bio}</p>}
          <div className="flex items-center gap-3 mt-1">
            {fmt(publishedAt) && <span className="text-xs font-body text-navy-500">{fmt(publishedAt)}</span>}
            {readTime && <span className="text-xs font-body text-navy-500">{readTime} min read</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
