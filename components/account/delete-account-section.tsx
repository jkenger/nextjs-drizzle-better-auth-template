"use client";

import { useState } from "react";
import { deleteAccount } from "@/lib/actions/account";
import { useRouter } from "next/navigation";

export default function DeleteAccountSection() {
  const router = useRouter();
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleDelete() {
    if (confirmText !== "DELETE") {
      setError('Please type "DELETE" to confirm');
      return;
    }

    setLoading(true);
    setError("");

    try {
      await deleteAccount();
      // Force a hard redirect to login page
      window.location.href = "/login";
    } catch (err: any) {
      setError(err.message || "Failed to delete account");
      setLoading(false);
    }
  }

  if (!showConfirm) {
    return (
      <div>
        <button
          onClick={() => setShowConfirm(true)}
          className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
        >
          Delete Account
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4 rounded-md border-2 border-red-200 bg-red-50 p-4">
      <div>
        <p className="text-sm font-semibold text-red-900">
          Are you sure you want to delete your account?
        </p>
        <p className="mt-1 text-sm text-red-700">
          This action cannot be undone. All your data will be permanently deleted.
        </p>
      </div>

      <div>
        <label htmlFor="confirm" className="block text-sm font-medium text-red-900">
          Type &quot;DELETE&quot; to confirm
        </label>
        <input
          type="text"
          id="confirm"
          value={confirmText}
          onChange={(e) => setConfirmText(e.target.value)}
          className="mt-1 block w-full rounded-md border border-red-300 px-3 py-2 text-gray-900 shadow-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
          placeholder="DELETE"
        />
      </div>

      {error && (
        <div className="rounded-md bg-red-100 p-3">
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      <div className="flex gap-3">
        <button
          onClick={handleDelete}
          disabled={loading || confirmText !== "DELETE"}
          className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Deleting..." : "Confirm Delete"}
        </button>
        <button
          onClick={() => {
            setShowConfirm(false);
            setConfirmText("");
            setError("");
          }}
          disabled={loading}
          className="rounded-md bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
