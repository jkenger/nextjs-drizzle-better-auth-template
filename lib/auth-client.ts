'use client';

import { createAuthClient } from "better-auth/react";

// Get base URL with proper fallback for build time
const getBaseURL = () => {
  // First try NEXT_PUBLIC_ prefixed env var (available at build time)
  if (process.env.NEXT_PUBLIC_BETTER_AUTH_URL) {
    return process.env.NEXT_PUBLIC_BETTER_AUTH_URL;
  }
  // In browser, use window.location.origin
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  // Fallback for server-side/build time
  return '';
};

export const authClient = createAuthClient({
  baseURL: getBaseURL(),
});
