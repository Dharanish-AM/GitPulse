import { DashboardData } from "@/types/dashboard";
import Card from "@/components/ui/Card";
import { CodeXml } from "lucide-react";

interface LanguageDistributionProps {
  languages: DashboardData["languages"];
}

export default function LanguageDistribution({
  languages,
}: LanguageDistributionProps) {
  const total = languages.reduce((s, l) => s + l.percent, 0) || 1;
  let cumulative = 0;
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const palette = ["#23e5ff", "#9b5cff", "#ff4f79", "#3de282", "#7c7f87"];

  return (
    <Card className="h-full bg-[#0c1322] border-[#12314a] text-white flex flex-col">
      <div className="flex items-center gap-2 mb-6">
        <CodeXml className="text-cyan-400" size={20} />
        <h3 className="text-lg font-semibold">Language Distribution</h3>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center min-h-0">
        <div className="relative w-48 h-48 mb-6">
          <svg
            viewBox="0 0 120 120"
            className="transform -rotate-90 w-full h-full"
          >
            {languages.map((lang, idx) => {
              const portion = (lang.percent / total) * circumference;
              const dashArray = `${portion} ${circumference}`;
              const dashOffset = circumference - cumulative;
              cumulative += portion;
              return (
                <circle
                  key={`${lang.name}-${idx}`}
                  cx="60"
                  cy="60"
                  r={radius}
                  fill="transparent"
                  stroke={palette[idx % palette.length]}
                  strokeWidth="12"
                  strokeDasharray={dashArray}
                  strokeDashoffset={dashOffset}
                  strokeLinecap="round"
                />
              );
            })}
          </svg>
          <div className="absolute inset-0 flex items-center justify-center flex-col">
            <span className="text-3xl font-bold text-white">100%</span>
            <span className="text-xs text-gray-400">Total</span>
          </div>
        </div>

        <div className="bg-[#0f1b2f] border border-[#1a2c45] rounded-xl p-4 w-full grid grid-cols-2 gap-3">
          {languages.map((lang, idx) => (
            <div
              key={`${lang.name}-${idx}`}
              className="flex items-center gap-2 text-sm"
            >
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ background: palette[idx % palette.length] }}
              />
              <span className="text-gray-200 truncate flex-1">{lang.name}</span>
              <span className="text-gray-400 font-mono text-xs">
                {lang.percent}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
