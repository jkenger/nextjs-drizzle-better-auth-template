# Next.js + Drizzle + Better Auth Template

A modern, production-ready authentication template built with Next.js 15, Drizzle ORM, Better Auth, and Tailwind CSS.

## Features

- ✅ **Authentication** - Email/password auth with Better Auth
- ✅ **Password Reset** - Forgot password flow with email
- ✅ **Email Verification** - Optional email verification on signup
- ✅ **Account Management** - Profile editing, password change, account deletion
- ✅ **Database** - PostgreSQL with Drizzle ORM
- ✅ **Protected Routes** - Middleware-based route protection
- ✅ **TypeScript** - Full type safety
- ✅ **Modular Schema** - Organized database schema structure
- ✅ **Server Actions** - Modern Next.js data mutations
- ✅ **Responsive UI** - Tailwind CSS with clean design

## Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router with Turbopack)
- **Database:** PostgreSQL ([Neon](https://neon.tech/) serverless)
- **ORM:** [Drizzle ORM](https://orm.drizzle.team/)
- **Auth:** [Better Auth](https://better-auth.com/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Language:** TypeScript (strict mode)

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database (we recommend [Neon](https://neon.tech/) for easy setup)

### 1. Clone and Install

```bash
# Clone the repository
git clone <your-repo-url>
cd nextjs-drizzle-better-auth-template

# Install dependencies
npm install
```

### 2. Environment Setup

Create a `.env` file in the root directory:

```bash
# Database - Get from Neon.tech or your PostgreSQL provider
DATABASE_URL=postgresql://user:password@host:5432/dbname

# Better Auth - Generate secret with: openssl rand -base64 32
BETTER_AUTH_SECRET=your-secret-key-here
BETTER_AUTH_URL=http://localhost:3000
```

**Important:** Never commit your `.env` file. It's already in `.gitignore`.

### 3. Email Configuration (Optional)

Password reset requires email setup. See [Email Setup Guide](./docs/EMAIL_SETUP.md) for detailed instructions.

For development, you can skip this and test other features. For production, configure one of:
- **Resend** (recommended) - Easiest setup
- **SMTP** - Gmail, SendGrid, Mailgun, etc.

### 4. Database Setup

```bash
# Generate migration files from schema
npx drizzle-kit generate

# Push schema to database
npx drizzle-kit push

# (Optional) Open Drizzle Studio to view/edit data
npx drizzle-kit studio
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) - you'll be redirected to the login page.

## Project Structure

```
├── app/
│   ├── (auth)/                 # Auth pages
│   │   ├── login/
│   │   ├── signup/
│   │   ├── forgot-password/   # Password reset request
│   │   ├── reset-password/    # Password reset confirmation
│   │   ├── verify-email/      # Email verification
│   │   └── resend-verification/ # Resend verification email
│   ├── (dashboard)/            # Protected pages
│   │   ├── account/           # Account management
│   │   └── dashboard/         # Main dashboard
│   ├── api/
│   │   └── auth/[...all]/     # Better Auth API routes
│   ├── layout.tsx
│   ├── page.tsx               # Root redirect
│   └── globals.css
├── components/
│   ├── account/               # Account management components
│   └── logout-button.tsx
├── db/
│   ├── schema/                # Database schemas
│   │   ├── index.ts          # Schema exports
│   │   └── auth-schema.ts    # Auth tables
│   └── drizzle.ts            # DB connection
├── lib/
│   ├── actions/              # Server actions
│   │   └── account.ts
│   ├── auth.ts               # Better Auth server config
│   └── auth-client.ts        # Better Auth client config
├── middleware.ts             # Route protection
├── drizzle.config.ts        # Drizzle configuration
└── .env.example             # Environment template
```

## Key Concepts

### Authentication Flow

1. **Sign Up** → Better Auth creates user in database
2. **Login** → Better Auth validates and creates session
3. **Protected Routes** → Middleware checks session token
4. **Logout** → Session is deleted

### Server Actions Pattern

All data mutations use Next.js Server Actions:

```typescript
// lib/actions/account.ts
"use server";

export async function updateProfile(data: { name: string; email: string }) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) throw new Error("Unauthorized");

  // Update user...
  revalidatePath("/account");
}
```

### Schema Organization

Schemas are modular and centralized:

```typescript
// db/schema/index.ts - Single export point
export * from "./auth-schema";
// Add future schemas here:
// export * from "./posts";
// export * from "./comments";
```

### Protected Routes

Middleware protects authenticated routes:

```typescript
// middleware.ts
const protectedRoutes = ["/dashboard", "/account"];
// Redirects to /login if no session
```

## Database Commands

```bash
# Generate migration from schema changes
npx drizzle-kit generate

# Push schema directly to database (dev)
npx drizzle-kit push

# Run migrations (production)
npx drizzle-kit migrate

# Open database GUI
npx drizzle-kit studio
```

## Customization Guide

### Adding New Protected Pages

1. Create page in `app/(dashboard)/your-page/page.tsx`
2. Add route to middleware: `protectedRoutes = ["/dashboard", "/account", "/your-page"]`

### Adding Database Tables

1. Create schema file: `db/schema/posts.ts`
2. Define your table using Drizzle syntax
3. Export from `db/schema/index.ts`: `export * from "./posts"`
4. Generate migration: `npx drizzle-kit generate`
5. Push to database: `npx drizzle-kit push`

### Adding Server Actions

1. Create action file: `lib/actions/posts.ts`
2. Add `"use server"` directive
3. Get session for authentication
4. Use `revalidatePath()` after mutations

### Styling

This template uses Tailwind CSS. Modify `app/globals.css` for global styles or use Tailwind classes directly in components.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables:
   - `DATABASE_URL`
   - `BETTER_AUTH_SECRET`
   - `BETTER_AUTH_URL` (your production URL)
4. Deploy!

### Database Migrations

For production, use migrations instead of push:

```bash
# Generate migration
npx drizzle-kit generate

# Commit the migration files in /migrations
git add migrations/
git commit -m "Add migration"

# On deploy, run migrations
npx drizzle-kit migrate
```

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host:5432/db` |
| `BETTER_AUTH_SECRET` | Secret for session signing | Generate with `openssl rand -base64 32` |
| `BETTER_AUTH_URL` | Base URL of your app | `http://localhost:3000` or `https://yourdomain.com` |

## Security Notes

- ✅ Session tokens stored in HTTP-only cookies
- ✅ Passwords hashed with Better Auth
- ✅ CSRF protection built-in
- ✅ All mutations require authentication
- ✅ Email uniqueness enforced
- ⚠️ Add rate limiting in production
- ⚠️ Use HTTPS in production

## Scripts

```bash
npm run dev       # Start development server with Turbopack
npm run build     # Build for production
npm run start     # Start production server
npm run lint      # Run ESLint
```

## Extending This Template

This template is designed to be a starting point. Common additions:

- **OAuth Providers** - Google, GitHub, etc. via Better Auth
- **2FA** - Two-factor authentication
- **Role-Based Access** - Admin/user roles
- **API Routes** - REST or tRPC endpoints
- **Testing** - Jest, Vitest, Playwright
- **Rate Limiting** - Protect against brute force attacks

## Troubleshooting

### "Failed to connect to database"
- Check your `DATABASE_URL` is correct
- Ensure database is accessible (check firewall/network)
- For Neon, make sure connection pooling is enabled

### "Unauthorized" errors
- Clear cookies and try logging in again
- Check `BETTER_AUTH_SECRET` is set
- Verify session hasn't expired

### TypeScript errors on imports
- Make sure you've installed dependencies: `npm install`
- Check `tsconfig.json` paths are correct: `"@/*": ["./*"]`

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT

---

Built with ❤️ using Next.js, Drizzle ORM, and Better Auth
# vault
# nextjs-drizzle-better-auth-template
