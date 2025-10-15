import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { LandingPage } from "@/components/landing-page";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Redirect authenticated users to dashboard
  if (session) {
    redirect("/dashboard");
  }

  // Show landing page for unauthenticated users
  return <LandingPage />;
}
