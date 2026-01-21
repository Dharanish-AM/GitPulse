import Link from "next/link";
import { getGitHubAuthorizeURL } from "@/lib/auth";

export default function InstallPage() {
  const authorizeUrl = getGitHubAuthorizeURL();

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#0A0F1C] text-white flex items-center justify-center selection:bg-cyan-500/30">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,240,255,0.1),transparent_70%)]" />
        <div
          className="absolute inset-0 bg-grid-pattern opacity-20 animate-grid"
          style={{
            perspective: "1000px",
            transform: "rotateX(60deg) scale(2)",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-2xl px-6">
        <div className="rounded-3xl border border-cyan-500/25 bg-cyan-950/30 backdrop-blur-xl p-10 shadow-[0_0_40px_rgba(0,240,255,0.2)] text-center">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-cyan-500/15 text-cyan-300 shadow-[0_0_20px_rgba(0,240,255,0.35)]">
            <svg
              className="h-8 w-8"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </div>

          <h1 className="text-3xl md:text-4xl font-semibold mb-3">
            GitPulse installed successfully
          </h1>
          <p className="text-slate-400 mb-8 text-lg">
            You are all set. Continue with GitHub to start visualizing your activity and insights.
          </p>

          <div className="flex flex-col items-center gap-3">
            <Link
              href={authorizeUrl}
              className="group inline-flex items-center gap-3 px-7 py-3 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 font-semibold text-white shadow-[0_0_25px_rgba(0,240,255,0.35)] hover:scale-105 hover:shadow-[0_0_40px_rgba(0,240,255,0.45)] transition-all duration-300"
            >
              <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              <span className="tracking-wide">Continue with GitHub</span>
            </Link>

            <p className="text-sm text-slate-500 font-mono">
              Redirecting back to GitHub keeps permissions read-only and secure.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
