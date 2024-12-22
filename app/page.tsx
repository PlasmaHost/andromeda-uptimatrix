"use client";

import { useEffect, useState } from "react";
import { Activity } from "lucide-react";
import type { StatusData } from "@/lib/types";
import { StatusSection } from "@/components/status/status-section";
import { StatusTimeline } from "@/components/status/status-timeline";
import { StatusOverview } from "@/components/status/status-overview";
import { ServiceMetrics } from "@/components/metrics/service-metrics";

const defaultData: StatusData = {
  announcement: { text: "" },
  maintenanceAlerts: [],
  sections: {
    announcementBar: false,
    maintenanceAlerts: false,
    statusUpdates: false
  },
  services: [],
  statusUpdates: []
};

export default function Home() {
  const [data, setData] = useState<StatusData>(defaultData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    if (!apiUrl) {
      setError('API URL is not configured');
      setLoading(false);
      return;
    }

    fetch(apiUrl, {
      headers: {
        'Accept': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((apiData) => {
        // Transform the API response to match our new structure
        const transformedData = {
          ...apiData,
          services: Object.entries(apiData.services).map(([categoryName, services]) => ({
            categoryName,
            services: Object.entries(services as Record<string, string>).map(([serviceName, status]) => ({
              serviceName,
              status,
            })),
          })),
        };
        setData(transformedData);
        setError(null);
      })
      .catch((error) => {
        console.error("Error fetching status:", error);
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin">
          <Activity className="w-8 h-8 text-primary" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-lg text-muted-foreground">Failed to load status: {error}</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container max-w-5xl py-12 mx-auto space-y-10">
        <StatusOverview data={data} />
        <ServiceMetrics data={data} />
        
        <div className="grid gap-6">
          {data.services.map((category) => (
            <StatusSection
              key={category.categoryName}
              category={category.categoryName}
              services={category.services}
            />
          ))}
        </div>

        <StatusTimeline updates={data.statusUpdates} />
      </div>
    </main>
  );
}