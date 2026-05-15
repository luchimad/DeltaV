export default function CollectionLoading() {
  return (
    <>
      {/* Header Skeleton */}
      <div className="pt-20 pb-12 px-6 max-w-7xl mx-auto border-b border-white/10">
        <div className="w-16 h-3 bg-white/5 animate-pulse rounded mb-8" />
        <div className="w-20 h-3 bg-white/5 animate-pulse rounded mb-3" />
        <div className="w-72 h-10 bg-white/5 animate-pulse rounded" />
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto px-6 mt-10">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="aspect-[3/4] bg-white/[0.03] border border-white/[0.08] animate-pulse"
          />
        ))}
      </div>
    </>
  );
}
