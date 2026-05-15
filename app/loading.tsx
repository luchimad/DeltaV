export default function HomeLoading() {
  return (
    <>
      {/* Hero Skeleton */}
      <div className="relative h-[85vh] w-full bg-black flex flex-col justify-center items-center">
        <div className="w-full max-w-2xl h-16 bg-white/5 animate-pulse rounded mx-auto" />
        <div className="absolute bottom-12 left-12 flex flex-col gap-2 hidden sm:flex">
          <div className="w-24 h-3 bg-white/5 animate-pulse rounded" />
          <div className="w-32 h-3 bg-white/5 animate-pulse rounded" />
        </div>
      </div>

      {/* Carousel Skeleton */}
      <div className="py-20 border-t border-white/10">
        <div className="px-6 md:px-12 mb-10">
          <div className="w-20 h-3 bg-white/5 animate-pulse rounded mb-3" />
          <div className="w-48 h-8 bg-white/5 animate-pulse rounded" />
        </div>
        <div className="flex gap-4 px-6 md:px-12 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="flex-none w-[260px] sm:w-[300px] aspect-[3/4] bg-white/[0.03] border border-white/[0.08] animate-pulse"
            />
          ))}
        </div>
      </div>

      {/* Banners Skeleton */}
      <div className="border-t border-white/10 grid grid-cols-1 md:grid-cols-2">
        <div className="aspect-square sm:aspect-[4/3] bg-white/[0.02] animate-pulse border-b border-white/10" />
        <div className="aspect-square sm:aspect-[4/3] bg-white/[0.02] animate-pulse border-b border-white/10" />
      </div>
    </>
  );
}
