import { useEffect, useState } from "react";
import { DashboardData } from "@/types/dashboard";

export function useDashboardData(params?: URLSearchParams) {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const url = params ? `/api/dashboard?${params.toString()}` : "/api/dashboard";
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((json) => setData(json as DashboardData))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [params]);

  return { data, loading, error };
}