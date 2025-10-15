"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 text-center">
        <div>
          <h1 className="text-6xl font-bold text-gray-900">Error</h1>
          <h2 className="mt-4 text-2xl font-semibold text-gray-700">
            Something went wrong
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            We apologize for the inconvenience. An error occurred while processing your request.
          </p>
        </div>

        <div className="mt-6 space-y-4">
          <button
            onClick={reset}
            className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Try again
          </button>
          <Link
            href="/dashboard"
            className="block w-full rounded-md bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-200"
          >
            Go to dashboard
          </Link>
        </div>

        {process.env.NODE_ENV === "development" && (
          <div className="mt-8 rounded-md bg-red-50 p-4 text-left">
            <p className="text-xs font-mono text-red-800 break-all">
              {error.message}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
