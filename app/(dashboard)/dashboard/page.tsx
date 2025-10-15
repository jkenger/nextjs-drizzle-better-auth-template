import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import LogoutButton from "@/components/logout-button";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-8">
              <h1 className="text-xl font-bold text-gray-900">My App</h1>
              <nav className="flex gap-4">
                <Link
                  href="/dashboard"
                  className="text-sm font-medium text-gray-900"
                >
                  Dashboard
                </Link>
                <Link
                  href="/account"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Account
                </Link>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-700">{session.user.name}</span>
              <LogoutButton />
            </div>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="text-2xl font-bold text-gray-900">
            Welcome to your Dashboard
          </h2>
          <p className="mt-2 text-gray-600">
            You&apos;re successfully authenticated with Better Auth!
          </p>

          <div className="mt-6 grid gap-4">
            <div className="rounded-md bg-blue-50 p-4">
              <h3 className="font-semibold text-blue-900">Your Profile</h3>
              <dl className="mt-2 space-y-1 text-sm text-blue-800">
                <div>
                  <dt className="inline font-medium">Name: </dt>
                  <dd className="inline">{session.user.name}</dd>
                </div>
                <div>
                  <dt className="inline font-medium">Email: </dt>
                  <dd className="inline">{session.user.email}</dd>
                </div>
                <div>
                  <dt className="inline font-medium">User ID: </dt>
                  <dd className="inline">{session.user.id}</dd>
                </div>
                <div>
                  <dt className="inline font-medium">Email Verified: </dt>
                  <dd className="inline">
                    {session.user.emailVerified ? "Yes" : "No"}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="rounded-md bg-green-50 p-4">
              <h3 className="font-semibold text-green-900">Session Info</h3>
              <dl className="mt-2 space-y-1 text-sm text-green-800">
                <div>
                  <dt className="inline font-medium">Session ID: </dt>
                  <dd className="inline">{session.session.id}</dd>
                </div>
                <div>
                  <dt className="inline font-medium">Expires: </dt>
                  <dd className="inline">
                    {new Date(session.session.expiresAt).toLocaleString()}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
