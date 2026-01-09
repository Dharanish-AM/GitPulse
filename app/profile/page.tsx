"use client";

import { useDashboardData } from "@/hooks/useDashboardData";
import { ArrowLeft, User } from "lucide-react";
import Link from "next/link";
import Skeleton from "@/components/ui/Skeleton";

export default function ProfilePage() {
  const { data, loading, error } = useDashboardData();

  if (loading) {
    return (
      <main className="min-h-screen bg-[#050b16] text-white flex items-center justify-center p-6">
        <Skeleton className="h-64 w-full max-w-md bg-[#0f1b2f]" />
      </main>
    );
  }

  if (error || !data) {
    return (
      <main className="min-h-screen bg-[#050b16] text-white flex items-center justify-center p-6">
        <div className="text-red-400">Failed to load profile</div>
      </main>
    );
  }

  const { user } = data;

  return (
    <main className="min-h-screen bg-[#050b16] text-white p-6">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors mb-8"
        >
          <ArrowLeft size={20} />
          Back to Dashboard
        </Link>

        <div className="bg-[#0f1b2f] border border-[#1a2c45] rounded-2xl p-8 flex flex-col items-center text-center">
          <div className="relative mb-6">
            <div className="w-24 h-24 rounded-full border-2 border-cyan-500 p-1">
              <img
                src={user.avatarUrl}
                alt={user.login}
                className="w-full h-full rounded-full"
              />
            </div>
            <div className="absolute bottom-0 right-0 bg-cyan-500 rounded-full p-1.5 border-4 border-[#0f1b2f]">
              <User size={16} className="text-[#050b16]" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-white mb-2">{user.name}</h1>
          <p className="text-cyan-400 font-mono mb-6">@{user.login}</p>

          <div className="max-w-md w-full bg-[#0b1424] border border-[#12314a] rounded-xl p-6 text-gray-300">
            <p>Profile metrics and extended details coming soon.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
