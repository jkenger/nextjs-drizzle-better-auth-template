import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import ProfileForm from "@/components/account/profile-form";
import PasswordForm from "@/components/account/password-form";
import DeleteAccountSection from "@/components/account/delete-account-section";

export default async function AccountPage() {
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
              <Link href="/dashboard">
                <h1 className="text-xl font-bold text-gray-900">My App</h1>
              </Link>
              <nav className="flex gap-4">
                <Link
                  href="/dashboard"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Dashboard
                </Link>
                <Link
                  href="/account"
                  className="text-sm font-medium text-gray-900"
                >
                  Account
                </Link>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-700">{session.user.name}</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Account Settings</h2>
            <p className="mt-1 text-sm text-gray-600">
              Manage your account information and security settings.
            </p>
          </div>

          {/* Profile Section */}
          <div className="rounded-lg bg-white p-6 shadow">
            <h3 className="text-lg font-semibold text-gray-900">Profile Information</h3>
            <p className="mt-1 text-sm text-gray-600">
              Update your account&apos;s profile information and email address.
            </p>
            <div className="mt-6">
              <ProfileForm user={session.user} />
            </div>
          </div>

          {/* Password Section */}
          <div className="rounded-lg bg-white p-6 shadow">
            <h3 className="text-lg font-semibold text-gray-900">Change Password</h3>
            <p className="mt-1 text-sm text-gray-600">
              Ensure your account is using a strong password.
            </p>
            <div className="mt-6">
              <PasswordForm />
            </div>
          </div>

          {/* Delete Account Section */}
          <div className="rounded-lg bg-white p-6 shadow">
            <h3 className="text-lg font-semibold text-red-900">Delete Account</h3>
            <p className="mt-1 text-sm text-gray-600">
              Permanently delete your account and all associated data.
            </p>
            <div className="mt-6">
              <DeleteAccountSection />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
