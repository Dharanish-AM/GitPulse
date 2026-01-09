import Skeleton from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <main className="min-h-screen bg-[#050b16] text-white p-6 space-y-6">
      {/* Header Stats */}
      <Skeleton className="h-12 w-64 mb-8" />

      {/* Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-24 bg-gray-800/50" />
        ))}
        <Skeleton className="h-24 bg-gray-800/50 w-full" />
      </div>

      {/* Main Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Skeleton className="h-[300px] w-full bg-gray-800/50" />
        <Skeleton className="h-[300px] w-full bg-gray-800/50" />
        <Skeleton className="h-[300px] w-full bg-gray-800/50" />
      </div>

      {/* Heatmap */}
      <Skeleton className="h-[200px] w-full bg-gray-800/50" />

      {/* Activity Breakdown */}
      <Skeleton className="h-[300px] w-full bg-gray-800/50" />

      {/* Repo & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Skeleton className="h-[400px] w-full bg-gray-800/50" />
        <Skeleton className="h-[400px] w-full bg-gray-800/50" />
      </div>

      {/* Code Freq & Collaborators */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Skeleton className="h-[400px] w-full bg-gray-800/50" />
        <Skeleton className="h-[400px] w-full bg-gray-800/50" />
      </div>

      {/* Floating Filter Button */}
      <div className="fixed bottom-8 right-8">
        <Skeleton className="h-14 w-14 rounded-full" />
      </div>
    </main>
  );
}
