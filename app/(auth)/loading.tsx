export default function AuthLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        {/* Title skeleton */}
        <div className="space-y-2">
          <div className="mx-auto h-8 w-64 animate-pulse rounded bg-gray-200"></div>
          <div className="mx-auto h-4 w-48 animate-pulse rounded bg-gray-200"></div>
        </div>

        {/* Form skeleton */}
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="h-10 w-full animate-pulse rounded-md bg-gray-200"></div>
            <div className="h-10 w-full animate-pulse rounded-md bg-gray-200"></div>
          </div>
          <div className="h-10 w-full animate-pulse rounded-md bg-gray-200"></div>
        </div>
      </div>
    </div>
  );
}
