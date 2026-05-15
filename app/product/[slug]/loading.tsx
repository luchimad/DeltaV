export default function ProductLoading() {
  return (
    <div className="max-w-7xl mx-auto border-b border-l border-r border-white/10 flex flex-col md:flex-row min-h-[70vh]">
      {/* Image Skeleton */}
      <div className="w-full md:w-3/5 border-b md:border-b-0 border-white/10 aspect-square md:aspect-auto bg-neutral-900 animate-pulse" />

      {/* Details Skeleton */}
      <div className="w-full md:w-2/5 p-8 md:p-12 flex flex-col gap-4">
        <div className="w-16 h-3 bg-white/5 animate-pulse rounded mb-4" />
        <div className="w-3/4 h-8 bg-white/5 animate-pulse rounded" />
        <div className="w-1/4 h-6 bg-white/5 animate-pulse rounded mt-2" />
        <div className="flex flex-col gap-2 mt-8">
          <div className="w-full h-3 bg-white/5 animate-pulse rounded" />
          <div className="w-full h-3 bg-white/5 animate-pulse rounded" />
          <div className="w-2/3 h-3 bg-white/5 animate-pulse rounded" />
        </div>
        <div className="mt-auto pt-8 border-t border-white/10">
          <div className="flex gap-3 mb-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-8 h-8 rounded-full bg-white/5 animate-pulse" />
            ))}
          </div>
          <div className="flex gap-2 mb-6">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-12 h-10 bg-white/5 animate-pulse border border-white/10" />
            ))}
          </div>
          <div className="w-full h-14 bg-white/5 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
