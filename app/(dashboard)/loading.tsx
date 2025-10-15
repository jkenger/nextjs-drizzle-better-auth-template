export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Nav skeleton */}
      <nav className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="h-6 w-24 animate-pulse rounded bg-gray-200"></div>
            <div className="flex items-center gap-4">
              <div className="h-4 w-32 animate-pulse rounded bg-gray-200"></div>
              <div className="h-9 w-20 animate-pulse rounded bg-gray-200"></div>
            </div>
          </div>
        </div>
      </nav>

      {/* Content skeleton */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {/* Title skeleton */}
          <div className="h-8 w-64 animate-pulse rounded bg-gray-200"></div>

          {/* Card skeletons */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-32 animate-pulse rounded-lg bg-gray-200"
              ></div>
            ))}
          </div>

          {/* Large content skeleton */}
          <div className="h-64 animate-pulse rounded-lg bg-gray-200"></div>
        </div>
      </main>
    </div>
  );
}
