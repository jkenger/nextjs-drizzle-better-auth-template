# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Vault** is a personal finance tracking web application built with Next.js, PostgreSQL, Drizzle ORM, Better Auth, and Tailwind CSS. The app allows users to track income and expenses, manage categories, create recurring transactions, and visualize financial data through reports and charts.

## Tech Stack

- **Framework**: Next.js 15.5.5 (App Router) with Turbopack
- **Database**: PostgreSQL (Neon serverless)
- **ORM**: Drizzle ORM with Drizzle Kit
- **Authentication**: Better Auth with email/password and Drizzle adapter
- **Styling**: Tailwind CSS v4 + shadcn/ui components
- **Language**: TypeScript (strict mode)

## Development Commands

```bash
# Start development server with Turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint with ESLint
npm run lint
```

## Drizzle ORM Commands

```bash
# Generate new migration from schema changes
npx drizzle-kit generate

# Push schema changes directly to database (development)
npx drizzle-kit push

# Open Drizzle Studio (database GUI)
npx drizzle-kit studio
```

## Architecture & Code Organization

### Database Schema Structure

The project uses **two separate schema files**:
- `auth-schema.ts` - Authentication tables (user, session, account, verification) managed by Better Auth
- `db/schema.ts` - Application tables (categories, transactions, recurring_rules, user_settings, etc.)

Both schemas are registered in `drizzle.config.ts` and share the same database.

### Better Auth Setup

Authentication is configured using Better Auth with:
- **Server config**: `lib/auth.ts` exports the `auth` object with Drizzle adapter and email/password enabled
- **Client config**: `lib/auth-client.ts` exports `authClient` for React components (uses `BETTER_AUTH_URL` env var)
- **API routes**: `app/api/auth/[...all]/route.ts` handles all auth endpoints via `toNextJsHandler`

### Database Connection

- Configured in `db/drizzle.ts` using `drizzle-orm/neon-http`
- Uses `DATABASE_URL` environment variable
- Requires `dotenv` to load `.env` file

### Path Aliases

TypeScript is configured with `@/*` alias pointing to the root directory:
```typescript
import { db } from "@/db/drizzle";
import { auth } from "@/lib/auth";
```

### Planned Architecture Patterns

According to `docs/IMPLEMENTATION_GUIDE.md`, the codebase should follow these patterns:

1. **Service Layer Pattern** (`lib/services/`): Pure business logic functions that accept userId explicitly and contain no authentication logic
2. **Server Actions** (`lib/actions/`): Next.js server actions that handle auth and call service layer functions
3. **Components Structure**:
   - `components/ui/` - shadcn/ui components
   - `components/auth/` - Authentication forms
   - `components/dashboard/` - Dashboard-specific components
   - `components/transactions/` - Transaction management components
   - `components/reports/` - Charts and analytics components
   - `components/settings/` - Settings page components

This separation ensures business logic can be reused when adding an API layer or mobile app in the future.

## Database Schema

### Auth Tables (Already Implemented)
- `user` - User accounts with email verification
- `session` - User sessions with IP and user agent tracking
- `account` - OAuth and password accounts (supports multiple providers)
- `verification` - Email verification tokens

### App Tables (To Be Implemented)
- `categories` - Income and expense categories with icons and colors
- `transactions` - Financial transactions with category references and recurring support
- `recurring_rules` - Rules for automatic recurring transaction creation
- `user_settings` - User preferences (currency, date format)
- `imports` - CSV import history tracking
- `email_connections` - Email sync integration (Gmail/Outlook)

## Important Environment Variables

Required in `.env` file:
```
DATABASE_URL=postgresql://...          # Neon PostgreSQL connection string
BETTER_AUTH_URL=http://localhost:3000  # Base URL for Better Auth client
BETTER_AUTH_SECRET=...                 # Secret for session signing
```

## Key Implementation Notes

### Authentication Flow
1. Better Auth manages all auth routes under `/api/auth/*`
2. Session verification should use `auth()` function from `lib/auth.ts`
3. All server actions must verify session before performing operations
4. Never trust userId from client - always get it from session

### Server Actions Pattern
```typescript
// Always follow this pattern in lib/actions/
'use server';

import { auth } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import * as service from '@/lib/services/transactions';

export async function createTransaction(data: TransactionInput) {
  const session = await auth();
  if (!session?.user) throw new Error('Unauthorized');

  const result = await service.createTransactionForUser(session.user.id, data);

  revalidatePath('/dashboard');
  revalidatePath('/transactions');

  return result;
}
```

### Security Best Practices
- Always validate userId from session in server actions
- Never expose sensitive data in client components
- Use Zod schemas for input validation
- Drizzle ORM prevents SQL injection via parameterized queries
- Store email sync tokens encrypted in database

### Recurring Transactions
- Implement via Vercel Cron Jobs calling `/api/cron/recurring/route.ts`
- Cron should check `recurring_rules` table for active rules
- Create transactions based on frequency (daily, weekly, monthly, yearly)
- Update `lastProcessed` field after creating transactions
- Secure cron endpoint with `CRON_SECRET` environment variable

### CSV Import & Email Sync
The implementation guide details two automation features:
- **CSV Import**: Support for GCash, Maya, SeaBank/MariBank formats with duplicate detection
- **Email Sync**: Gmail API integration to parse transaction notification emails

These are optional features to be implemented after core functionality.

## Testing Workflow

When implementing features, test:
1. Authentication flows (signup, login, logout, protected routes)
2. Transaction CRUD with proper userId isolation
3. Category management with deletion protection (if transactions exist)
4. Recurring transaction cron job execution
5. Date filtering and pagination
6. Form validation and error handling

## Current Status

- ✅ Next.js project initialized with TypeScript
- ✅ Better Auth configured with Drizzle adapter
- ✅ Auth schema defined and migrated
- ✅ Database connection configured (Neon PostgreSQL)
- ⏳ Application tables need to be implemented
- ⏳ UI components and features need to be built

## Future Considerations

The codebase is designed to be mobile-ready:
- Business logic in `lib/services/` should have no Next.js dependencies
- When adding mobile support, add tRPC layer that uses the same services
- Server actions and tRPC can coexist, both calling the same service functions
- Consider monorepo structure with Turborepo if building separate mobile app
