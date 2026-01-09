import Card from "@/components/ui/Card";
import { DashboardData } from "@/types/dashboard";
import {
  Lightbulb,
  Calendar,
  TrendingDown,
  CalendarCheck,
  BarChart3,
} from "lucide-react";

interface ActivityInsightsProps {
  heatmap: DashboardData["heatmap"];
}

export default function ActivityInsights({ heatmap }: ActivityInsightsProps) {
  // 1. Active Days
  const activeDays = heatmap.filter((d) => d.count > 0).length;
  const totalDays = heatmap.length || 365;
  const activePercent = Math.round((activeDays / totalDays) * 100);

  // 2. Daily Average (active only vs total? GitHub usually does total)
  const totalContribs = heatmap.reduce((acc, cur) => acc + cur.count, 0);
  const dailyAverage = (totalContribs / totalDays).toFixed(1);

  // 3. Longest Break
  let maxBreak = 0;
  let currentBreak = 0;
  heatmap.forEach((d) => {
    if (d.count === 0) {
      currentBreak++;
    } else {
      maxBreak = Math.max(maxBreak, currentBreak);
      currentBreak = 0;
    }
  });
  maxBreak = Math.max(maxBreak, currentBreak);

  // 4. Busiest Month
  const monthCounts: Record<string, number> = {};
  heatmap.forEach((d) => {
    const month = new Date(d.date).toLocaleString("default", { month: "long" });
    monthCounts[month] = (monthCounts[month] || 0) + d.count;
  });
  let busiestMonth = "";
  let maxMonthCount = 0;
  Object.entries(monthCounts).forEach(([m, c]) => {
    if (c > maxMonthCount) {
      maxMonthCount = c;
      busiestMonth = m;
    }
  });

  const insights = [
    {
      label: "Active Days",
      value: `${activeDays} days`,
      sub: `${activePercent}% of year`,
      icon: CalendarCheck,
      color: "text-emerald-400",
      bgColor: "bg-emerald-400/10",
    },
    {
      label: "Daily Average",
      value: dailyAverage,
      sub: "contributions",
      icon: BarChart3,
      color: "text-cyan-400",
      bgColor: "bg-cyan-400/10",
    },
    {
      label: "Longest Break",
      value: `${maxBreak} days`,
      sub: "without coding",
      icon: TrendingDown, // Or Bed/Coffee
      color: "text-pink-400",
      bgColor: "bg-pink-400/10",
    },
    {
      label: "Busiest Month",
      value: busiestMonth,
      sub: `${maxMonthCount.toLocaleString()} contribs`,
      icon: Calendar,
      color: "text-orange-400",
      bgColor: "bg-orange-400/10",
    },
  ];

  return (
    <Card className="bg-[#0c1322] border-[#12314a] text-white h-full">
      <div className="flex items-center gap-2 mb-6">
        <Lightbulb className="text-yellow-400" size={20} />
        <h3 className="text-lg font-semibold">Activity Insights</h3>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {insights.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="p-4 rounded-xl border border-[#1a2c45] bg-[#0f1b2f] flex flex-col items-start gap-3 hover:border-cyan-500/30 transition-colors"
            >
              <div className={`p-2 rounded-lg ${stat.bgColor} ${stat.color}`}>
                <Icon size={18} />
              </div>
              <div>
                <div className="text-xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-gray-400 mt-1">{stat.sub}</div>
              </div>
              <div className="text-xs font-semibold uppercase tracking-wider text-gray-500 mt-auto pt-2">
                {stat.label}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
