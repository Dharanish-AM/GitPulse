import { DashboardData } from "@/types/dashboard";
import Card from "@/components/ui/Card";
import { Flame, TrendingUp } from "lucide-react";

interface StreakMomentumProps {
  streaks: DashboardData["streaks"];
  momentum: DashboardData["momentum"];
  totals: DashboardData["totals"];
}

export default function StreakMomentum({
  streaks,
  momentum,
  totals,
}: StreakMomentumProps) {
  return (
    <Card className="h-full bg-[#0c1322] border-[#12314a] text-white flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <Flame className="text-orange-500" size={20} />
        <h3 className="text-lg font-semibold">Streak &amp; Momentum</h3>
      </div>

      <div className="flex-1 flex flex-col gap-4 mb-4">
        {/* Hero: Current Streak */}
        <div className="flex-[1.5] bg-[#0f1b2f] border border-[#1a2c45] rounded-xl p-6 flex items-center justify-between relative overflow-hidden group">


          <div className="relative z-10">
            <div className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-2">
              Current Streak
            </div>
            <div className="text-6xl font-bold text-white tracking-tight">
              {streaks.current}{" "}
              <span className="text-2xl text-gray-500 font-normal">days</span>
            </div>
          </div>

          <div className="relative z-10 text-orange-500 transform group-hover:scale-110 transition-transform duration-300">
            <Flame size={64} fill="currentColor" fillOpacity={0.2} />
            <div className="absolute inset-0 animate-pulse mix-blend-screen text-orange-400">
              <Flame size={64} />
            </div>
          </div>
        </div>

        {/* Secondary Grid */}
        <div className="grid grid-cols-2 gap-4 h-28">
          <MetricTile
            label="Longest Streak"
            value={streaks.longest}
            sub="Days"
            color="text-purple-300"
          />
          <MetricTile
            label="This Week"
            value={momentum.total}
            sub="Contribs"
            color="text-cyan-300"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm text-emerald-400 bg-emerald-400/10 p-3 rounded-xl border border-emerald-400/20 mt-auto">
        <TrendingUp size={18} />
        <span className="font-medium">
          {momentum.weeklyChangePercent > 0 ? "+" : ""}
          {momentum.weeklyChangePercent}% vs last week
        </span>
      </div>
    </Card>
  );
}

function MetricTile({
  label,
  value,
  sub,
  color,
}: {
  label: string;
  value: number;
  sub: string;
  color: string;
}) {
  return (
    <div className="bg-[#0f1b2f] border border-[#1a2c45] rounded-xl p-4 flex flex-col justify-center h-full hover:border-gray-700 transition-colors">
      <div className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-1">
        {label}
      </div>
      <div className={`text-3xl font-bold ${color}`}>
        {value}{" "}
        <span className="text-sm text-gray-500 font-normal ml-1">{sub}</span>
      </div>
    </div>
  );
}
