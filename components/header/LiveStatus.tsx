import { DashboardData } from "@/types/dashboard";

interface LiveStatusProps {
  rateLimit: DashboardData["rateLimit"];
  momentum: DashboardData["momentum"];
}

export default function LiveStatus({ rateLimit, momentum }: LiveStatusProps) {
  const usage = `${rateLimit.remaining}/${rateLimit.limit}`;
  const stateColor =
    momentum.state === "rising"
      ? "text-green-400"
      : momentum.state === "stable"
      ? "text-gray-300"
      : "text-amber-400";

  return (
    <div
      className="flex items-center gap-2 md:gap-4 px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-[#12314a] bg-[#0b1424] text-xs md:text-sm shadow-lg transition-all"
      title={`Rate limit: ${usage} | Momentum: ${momentum.state}`}
    >
      <div className="flex items-center gap-2 text-cyan-300">
        <span className="relative flex h-2 w-2 md:h-2.5 md:w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 md:h-2.5 md:w-2.5 bg-cyan-400"></span>
        </span>
        <span className="font-medium">Live</span>
      </div>
      <div className="hidden md:block text-gray-300">Rate limit: {usage}</div>
      <div className={`hidden md:block ${stateColor}`}>
        Momentum: {momentum.state}
      </div>
    </div>
  );
}
