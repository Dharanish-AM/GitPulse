import Card from "@/components/ui/Card";
import { DashboardData } from "@/types/dashboard";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface CodeFrequencyChartProps {
  heatmap: DashboardData["heatmap"];
}

type ActivityPoint = {
  week: string;
  contributions: number;
};

function weekKey(date: Date) {
  const start = new Date(date);
  start.setDate(start.getDate() - start.getDay());
  return start.toISOString().slice(0, 10);
}

function toWeeklySeries(heatmap: DashboardData["heatmap"]): ActivityPoint[] {
  const weekBuckets = new Map<string, number>();
  heatmap.forEach((entry) => {
    const key = weekKey(new Date(entry.date));
    weekBuckets.set(key, (weekBuckets.get(key) || 0) + entry.count);
  });

  return Array.from(weekBuckets.entries())
    .sort(([a], [b]) => (a < b ? -1 : 1))
    .slice(-12) // Show last 12 weeks for cleaner view
    .map(([key, total]) => {
      const label = new Date(key).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
      return { week: label, contributions: total } satisfies ActivityPoint;
    });
}

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="bg-[#0f172a] border border-cyan-500/30 rounded-lg p-3 text-sm">
      <div className="font-semibold text-white mb-1">{label}</div>
      <div className="flex items-center gap-2 text-xs text-gray-200">
        <span className="w-2 h-2 rounded-sm bg-cyan-400" />
        <span>Contributions</span>
        <span className="font-mono text-cyan-300">
          {payload[0].value.toLocaleString()}
        </span>
      </div>
    </div>
  );
}

export default function CodeFrequencyChart({
  heatmap,
}: CodeFrequencyChartProps) {
  const data = toWeeklySeries(heatmap);
  const total = data.reduce((acc, cur) => acc + cur.contributions, 0);

  return (
    <Card className="bg-[#0c1322] border-[#12314a] text-white h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-success">
          <span className="text-lg">⚡</span>
          <h3 className="text-lg font-semibold text-white">Weekly Intensity</h3>
        </div>
        <div className="text-xs text-gray-400">Last 3 months</div>
      </div>

      <div className="mb-4 px-4 py-3 rounded-xl border border-[#1a2c45] bg-[#0f1b2f] flex items-center justify-between">
        <div className="flex items-center gap-2 text-cyan-300 text-sm">
          <span>Total Contributions</span>
        </div>
        <div className="text-xl font-bold text-cyan-300">
          {total.toLocaleString()}
        </div>
      </div>

      <div className="h-32">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="cf_activity" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="week"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#7b8aa5", fontSize: 11 }}
            />
            <YAxis hide />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ stroke: "#1f2937", strokeWidth: 1 }}
            />
            <Area
              type="monotone"
              dataKey="contributions"
              stroke="#22d3ee"
              strokeWidth={2}
              fill="url(#cf_activity)"
              dot={false}
              animationDuration={700}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
