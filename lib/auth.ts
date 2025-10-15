import { db } from "@/db/drizzle";
import * as schema from "@/db/schema";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg", // or "mysql", "sqlite"
    schema,
  }),
  secret: process.env.BETTER_AUTH_SECRET || "fallback-secret-for-build",
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false, // Set to true if you want to require email verification
    sendResetPassword: async () => {
      // Optional: Configure password reset emails
      // Uncomment and configure when you want to enable password reset emails
      // Note: Resend free tier only allows sending to your own email address
      // To send to other users, verify a domain at resend.com/domains
      /*
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: "onboarding@resend.dev", // For testing - use your verified domain in production
        to: user.email,
        subject: "Reset your password",
        html: `
          <h2>Reset Your Password</h2>
          <p>Click the link below to reset your password:</p>
          <a href="${url}">Reset Password</a>
          <p>This link will expire in 1 hour.</p>
          <p>If you didn't request this, please ignore this email.</p>
        `,
      });
      */
    },
  },
  emailVerification: {
    sendOnSignUp: true, // Set to true to send verification email on signup
    autoSignInAfterVerification: true,
    sendVerificationEmail: async () => {
      // Optional: Configure email verification emails
      // Uncomment and configure when you want to enable email verification
      // Note: Resend free tier only allows sending to your own email address
      // To send to other users, verify a domain at resend.com/domains
      /*
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: "onboarding@resend.dev", // For testing - use your verified domain in production
        to: user.email,
        subject: "Verify your email address",
        html: `
          <h2>Welcome!</h2>
          <p>Please verify your email address by clicking the link below:</p>
          <a href="${url}">Verify Email</a>
          <p>This link will expire in 24 hours.</p>
        `,
      });
      */
    },
  },

  // Email configuration for password reset and verification
  // You'll need to configure an email service (Resend, Nodemailer, etc.)
  // See: https://www.better-auth.com/docs/plugins/email
  trustedOrigins: [process.env.BETTER_AUTH_URL || "http://localhost:3000"],
});
