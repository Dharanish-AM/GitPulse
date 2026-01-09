"use client";

import { useState } from "react";
import { DashboardData } from "@/types/dashboard";
import { AnimatePresence, motion } from "framer-motion";
import { LogOut, User, ChevronDown } from "lucide-react";
import Link from "next/link";

interface UserIdentityProps {
  user: DashboardData["user"];
}

export default function UserIdentity({ user }: UserIdentityProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-3 py-2 rounded-xl border border-[#12314a] bg-[#0b1424] hover:border-cyan-500/50 transition-colors group"
      >
        <img
          src={user.avatarUrl}
          alt={user.login}
          className="w-10 h-10 rounded-full border border-cyan-500 shadow-md"
        />
        <div className="text-right hidden sm:block">
          <p className="text-sm text-gray-400 group-hover:text-white transition-colors">
            {user.name || user.login}
          </p>
          <p className="text-cyan-300 text-xs">@{user.login}</p>
        </div>
        <ChevronDown
          size={16}
          className={`text-gray-500 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-48 rounded-xl border border-[#1a2c45] bg-[#0f1b2f] shadow-xl overflow-hidden z-50"
          >
            <div className="p-1">
              <Link
                href="/profile" // Assuming this route exists or will be created
                className="flex items-center gap-2 px-3 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-[#1a2c45] rounded-lg transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <User size={16} className="text-cyan-400" />
                View Profile
              </Link>
              <button
                className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-[#1a2c45] rounded-lg transition-colors text-left"
                onClick={() => {
                  // Handle logout here if needed
                  setIsOpen(false);
                }}
              >
                <LogOut size={16} />
                Sign Out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
