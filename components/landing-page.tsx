import Link from "next/link";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between max-w-6xl">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg" />
            <span className="font-semibold text-xl">Next.js Template</span>
          </div>
          <nav className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="text-sm font-medium bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 px-4 py-2 rounded-lg hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors"
            >
              Get Started
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 max-w-6xl">
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <div className="inline-block">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-sm font-medium border border-blue-100 dark:border-blue-900">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              Production Ready Template
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Next.js + Drizzle + Better Auth
          </h1>

          <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
            A modern, full-stack Next.js template with authentication, database
            ORM, and TypeScript. Ship your next project in minutes, not days.
          </p>

          <div className="flex items-center justify-center gap-4 pt-4">
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 px-6 py-3 rounded-lg font-medium hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors"
            >
              Get Started
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-slate-300 dark:border-slate-700 px-6 py-3 rounded-lg font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
              View on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-20 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Everything You Need
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Built with modern tools and best practices
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-600 rounded-lg mb-4 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-slate-100">
              Next.js 15 App Router
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Built on the latest Next.js with App Router, Server Components,
              and Turbopack for blazing fast development.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-lg mb-4 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-slate-100">
              Drizzle ORM + PostgreSQL
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Type-safe database queries with Drizzle ORM and PostgreSQL via
              Neon. Includes migrations and Drizzle Studio.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-600 rounded-lg mb-4 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-slate-100">
              Better Auth
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Production-ready authentication with email/password, session
              management, and email verification out of the box.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-600 rounded-lg mb-4 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-slate-100">
              Tailwind CSS v4
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Beautiful, responsive UI with Tailwind CSS v4 and ready for
              shadcn/ui components integration.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg mb-4 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-slate-100">
              TypeScript First
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Fully typed with TypeScript in strict mode. Catch errors before
              they reach production.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-600 rounded-lg mb-4 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-slate-100">
              Production Ready
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Email verification, password reset, session management, and
              security best practices included.
            </p>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="container mx-auto px-4 py-20 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Modern Tech Stack
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Built with the best tools in the ecosystem
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { name: "Next.js 15", desc: "React Framework" },
            { name: "TypeScript", desc: "Type Safety" },
            { name: "Drizzle ORM", desc: "Database Toolkit" },
            { name: "Better Auth", desc: "Authentication" },
            { name: "PostgreSQL", desc: "Database" },
            { name: "Neon", desc: "Serverless DB" },
            { name: "Tailwind CSS", desc: "Styling" },
            { name: "Resend", desc: "Email Service" },
          ].map((tech) => (
            <div
              key={tech.name}
              className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 text-center hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
            >
              <div className="font-semibold text-slate-900 dark:text-slate-100">
                {tech.name}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                {tech.desc}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 max-w-4xl">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-900 rounded-2xl p-12 text-center border border-slate-700">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Build Something Great?
          </h2>
          <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
            Start with a solid foundation and focus on what makes your product
            unique. Authentication, database, and styling all set up for you.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-lg font-medium hover:bg-slate-100 transition-colors"
            >
              Get Started Free
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 border border-slate-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-slate-800 transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 py-8">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg" />
              <span className="font-semibold">Next.js Template</span>
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400">
              Built with Next.js, Drizzle, and Better Auth
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
