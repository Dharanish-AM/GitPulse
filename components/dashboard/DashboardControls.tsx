import { useState } from "react";
import { Calendar, Building2, Package, Tag, Filter } from "lucide-react";
import Card from "@/components/ui/Card";

export default function DashboardControls() {
  const [dateRange, setDateRange] = useState("1y");
  const [org, setOrg] = useState("All");
  const [repo, setRepo] = useState("Any");
  const [type, setType] = useState("All");

  return (
    <Card className="bg-[#0c1322] border-[#12314a] text-white p-3 mb-6">
      <div className="flex flex-col md:flex-row items-center gap-4 py-1">
        <div className="flex items-center gap-2 mr-auto mb-2 md:mb-0">
          <Filter className="text-cyan-400" size={18} />
          <span className="font-semibold text-sm">Filters</span>
        </div>

        {/* Date Filter */}
        <div className="flex items-center gap-3 bg-[#0f1b2f] border border-[#1a2c45] rounded-lg px-3 py-1.5 min-w-[140px]">
          <Calendar size={16} className="text-gray-400" />
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-500 font-medium uppercase">
              Date
            </span>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="bg-transparent text-sm font-semibold text-white focus:outline-none cursor-pointer"
            >
              <option value="1y">1 Year</option>
              <option value="6m">6 Months</option>
              <option value="3m">3 Months</option>
              <option value="1m">1 Month</option>
            </select>
          </div>
        </div>

        {/* Org Filter */}
        <div className="flex items-center gap-3 bg-[#0f1b2f] border border-[#1a2c45] rounded-lg px-3 py-1.5 min-w-[140px]">
          <Building2 size={16} className="text-gray-400" />
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-500 font-medium uppercase">
              Org
            </span>
            <select
              value={org}
              onChange={(e) => setOrg(e.target.value)}
              className="bg-transparent text-sm font-semibold text-white focus:outline-none cursor-pointer"
            >
              <option value="All">All</option>
              <option value="Personal">Personal</option>
              {/* Dynamic orgs would go here */}
            </select>
          </div>
        </div>

        {/* Repo Filter */}
        <div className="flex items-center gap-3 bg-[#0f1b2f] border border-[#1a2c45] rounded-lg px-3 py-1.5 min-w-[140px]">
          <Package size={16} className="text-gray-400" />
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-500 font-medium uppercase">
              Repo
            </span>
            <select
              value={repo}
              onChange={(e) => setRepo(e.target.value)}
              className="bg-transparent text-sm font-semibold text-white focus:outline-none cursor-pointer"
            >
              <option value="Any">Any</option>
              {/* Dynamic repos would go here */}
            </select>
          </div>
        </div>

        {/* Type Filter */}
        <div className="flex items-center gap-3 bg-[#0f1b2f] border border-[#1a2c45] rounded-lg px-3 py-1.5 min-w-[140px]">
          <Tag size={16} className="text-gray-400" />
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-500 font-medium uppercase">
              Type
            </span>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="bg-transparent text-sm font-semibold text-white focus:outline-none cursor-pointer"
            >
              <option value="All">All</option>
              <option value="Commits">Commits</option>
              <option value="PRs">PRs</option>
              <option value="Issues">Issues</option>
              <option value="Reviews">Reviews</option>
            </select>
          </div>
        </div>
      </div>
    </Card>
  );
}
