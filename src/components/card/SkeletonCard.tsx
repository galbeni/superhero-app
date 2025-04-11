export const SkeletonCard = () => (
  <div className="w-full h-full bg-white shadow rounded-xl p-4 animate-pulse flex flex-col gap-3">
    <div className="bg-gray-300 rounded h-48 w-full" />
    <div className="bg-gray-300 rounded h-6 w-3/4" />
    <div className="bg-gray-300 rounded h-4 w-1/2" />
  </div>
);