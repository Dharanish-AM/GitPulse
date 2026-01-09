import { DashboardData } from "@/types/dashboard";
import Card from "@/components/ui/Card";
import { Zap } from "lucide-react";

interface ProductivityPatternsProps {
  productivity: DashboardData["productivity"];
}

const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function ProductivityPatterns({
  productivity,
}: ProductivityPatternsProps) {
  const { peakHour, peakDay, byHour, byDay } = productivity;

  const formatHour = (h: number) => {
    if (h === 0) return "12 AM";
    if (h === 12) return "12 PM";
    return h > 12 ? `${h - 12} PM` : `${h} AM`;
  };

  const hourMax = Math.max(...byHour, 1);
  const dayMax = Math.max(...byDay, 1);

  return (
    <Card className="h-full bg-[#0c1322] border-[#12314a] text-white flex flex-col">
      <div className="flex items-center gap-2 mb-6">
        <Zap className="text-yellow-400" size={20} />
        <h3 className="text-lg font-semibold">Productivity Patterns</h3>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <Tile label="Peak Hour" value={formatHour(peakHour)} />
        <Tile label="Peak Day" value={peakDay} />
      </div>

      <div className="space-y-6 flex-1">
        <Section label="Activity by Hour">
          <div className="h-24 flex items-end gap-[2px]">
            {byHour.map((v, idx) => (
              <div
                key={idx}
                className="flex-1 bg-cyan-500/50 hover:bg-cyan-400 transition-colors rounded-t-sm relative group"
                style={{ height: `${Math.max((v / hourMax) * 100, 4)}%` }}
              >
                {/* Tooltip */}
                <div className="opacity-0 group-hover:opacity-100 absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-gray-900 border border-gray-700 text-xs px-2 py-1 rounded whitespace-nowrap z-10 pointer-events-none">
                  {formatHour(idx)}: {v}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-2 px-1">
            <span>12 AM</span>
            <span>6 AM</span>
            <span>12 PM</span>
            <span>6 PM</span>
          </div>
        </Section>

        <Section label="Activity by Day">
          <div className="grid grid-cols-7 gap-2 h-24 items-end">
            {byDay.map((v, idx) => (
              <div
                key={idx}
                className="flex flex-col justify-end items-center gap-2 h-full"
              >
                <div
                  className="w-full bg-purple-500/50 hover:bg-purple-400 transition-colors rounded-t-sm relative group"
                  style={{ height: `${Math.max((v / dayMax) * 100, 4)}%` }}
                >
                  <div className="opacity-0 group-hover:opacity-100 absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-gray-900 border border-gray-700 text-xs px-2 py-1 rounded whitespace-nowrap z-10 pointer-events-none">
                    {v} contribs
                  </div>
                </div>
                <span className="text-xs text-gray-500 font-medium">
                  {dayLabels[idx]}
                </span>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </Card>
  );
}

function Tile({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="bg-[#0f1b2f] border border-[#1a2c45] rounded-xl p-4 flex flex-col items-start">
      <div className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-1">
        {label}
      </div>
      <div className="text-xl font-bold text-white">{value}</div>
    </div>
  );
}

function Section({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-3">
      <div className="text-sm text-gray-300 mb-2">{label}</div>
      {children}
    </div>
  );
}
