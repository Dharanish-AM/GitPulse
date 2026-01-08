import { cookies } from "next/headers";
import Link from "next/link";
import { getGitHubAuthorizeURL } from "@/lib/auth";
import DashboardClient from "@/components/dashboard/DashboardClient";

export default async function DashboardPage() {
  const token = (await cookies()).get("gh_token")?.value;
  const isAuthed = Boolean(token);

  if (isAuthed) {
    return <DashboardClient />;
  }

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#0A0F1C] text-white flex flex-col items-center justify-center selection:bg-cyan-500/30">
      {/* Animated Background Grid */}
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
      <div className="relative z-20 flex flex-col items-center text-center p-6 max-w-4xl mx-auto">
        {/* Hero Title */}
        <div className="mb-2 inline-flex items-center justify-center space-x-2 rounded-full border border-cyan-500/30 bg-cyan-950/30 px-3 py-1 text-xs font-medium text-cyan-300 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          <span>v1.0 Now Live</span>
        </div>

        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-purple-400 drop-shadow-[0_0_15px_rgba(0,240,255,0.5)]">
          GitPulse
        </h1>

        <p className="text-xl md:text-2xl text-slate-400 mb-12 max-w-2xl font-light">
          The <span className="text-cyan-400 font-medium">Pulse</span> of your
          Codebase.
          <br />
          Visualize, Analyze, and Optimize your development workflow.
        </p>

        {/* Central Git Graph Visualization */}
        <div className="relative mb-16 h-48 w-full max-w-[200px] flex items-center justify-center group">
          <div className="absolute inset-0 bg-cyan-500/10 blur-[60px] rounded-full group-hover:bg-cyan-500/20 transition-all duration-700" />

          <svg
            viewBox="0 0 100 200"
            className="w-full h-full drop-shadow-[0_0_15px_rgba(0,240,255,0.6)]"
          >
            {/* Main Branch */}
            <path
              d="M50 0 V200"
              stroke="#00f0ff"
              strokeWidth="2"
              strokeLinecap="round"
              className="opacity-50"
            />

            {/* Feature Branch Left */}
            <path
              d="M50 40 C 20 40, 20 80, 20 100 S 50 160, 50 160"
              fill="none"
              stroke="#8338ec"
              strokeWidth="2"
              strokeLinecap="round"
              className="opacity-50"
            />

            {/* Feature Branch Right */}
            <path
              d="M50 60 C 80 60, 80 100, 80 120 S 50 180, 50 180"
              fill="none"
              stroke="#ff006e"
              strokeWidth="2"
              strokeLinecap="round"
              className="opacity-50"
            />

            {/* Nodes */}
            <circle
              cx="50"
              cy="20"
              r="4"
              fill="#00f0ff"
              className="animate-pulse-glow"
            />
            <circle
              cx="50"
              cy="190"
              r="4"
              fill="#00f0ff"
              className="animate-pulse-glow"
            />

            <circle
              cx="20"
              cy="100"
              r="4"
              fill="#8338ec"
              className="animate-pulse-glow"
              style={{ animationDelay: "0.5s" }}
            />
            <circle
              cx="80"
              cy="120"
              r="4"
              fill="#ff006e"
              className="animate-pulse-glow"
              style={{ animationDelay: "1s" }}
            />

            {/* Animated Data Packets */}
            <circle cx="50" cy="0" r="2" fill="white">
              <animate
                attributeName="cy"
                from="0"
                to="200"
                dur="3s"
                repeatCount="indefinite"
              />
            </circle>
          </svg>
        </div>

        {/* Call to Action - Cyberpunk Pill Button */}
        <Link
          href={getGitHubAuthorizeURL()}
          className="group relative inline-flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full text-white font-bold hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:shadow-[0_0_40px_rgba(0,240,255,0.6)]"
        >
          <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
          <span className="tracking-wide">Sign in with GitHub</span>
        </Link>

        {/* Disclaimer / Footer */}
        <p className="mt-8 text-sm text-slate-500 font-mono">
          Secure Access • Read-only Permissions • Open Source
        </p>
      </div>

      {/* Decorative Corner Gradients */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-cyan-900/10 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0A0F1C] to-transparent pointer-events-none" />
    </main>
  );
}
