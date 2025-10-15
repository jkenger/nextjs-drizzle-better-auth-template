"use server";

import { auth } from "@/lib/auth";
import { db } from "@/db/drizzle";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

export async function updateProfile(data: { name: string; email: string }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  // Check if email is already taken by another user
  if (data.email !== session.user.email) {
    const existingUser = await db
      .select()
      .from(user)
      .where(eq(user.email, data.email))
      .limit(1);

    if (existingUser.length > 0 && existingUser[0].id !== session.user.id) {
      throw new Error("Email is already in use");
    }
  }

  // Update user profile
  await db
    .update(user)
    .set({
      name: data.name,
      email: data.email,
      updatedAt: new Date(),
    })
    .where(eq(user.id, session.user.id));

  revalidatePath("/account");
  revalidatePath("/dashboard");

  return { success: true };
}

export async function changePassword(data: {
  currentPassword: string;
  newPassword: string;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  try {
    // Use Better Auth's change password functionality
    await auth.api.changePassword({
      body: {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      },
      headers: await headers(),
    });

    return { success: true };
  } catch (error: any) {
    throw new Error(
      error.message || "Failed to change password. Check your current password."
    );
  }
}

export async function deleteAccount() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  // Sign out first to clear the session
  await auth.api.signOut({
    headers: await headers(),
  });

  // Then delete user (cascade will handle sessions, accounts, etc.)
  await db.delete(user).where(eq(user.id, session.user.id));

  return { success: true };
}
