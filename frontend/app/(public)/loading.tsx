export default function PublicLoading() {
  return (
    <div className="min-h-[60vh] w-full">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="animate-pulse bg-warm-200 rounded-xl h-64"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
