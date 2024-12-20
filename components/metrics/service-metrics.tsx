"use client";

import { Activity, Gauge, AlertTriangle } from "lucide-react";
import { MetricCard } from "./metric-card";
import { StatusData } from "@/lib/types";
import { calculateMetrics } from "@/lib/metrics";

export function ServiceMetrics({ data }: { data: StatusData }) {
  const { uptime, totalIncidents, avgResponseTime, trends } = calculateMetrics(data);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <MetricCard
        value={`${uptime}%`}
        label="System Uptime"
        trend={trends.uptime}
        color="text-green-500"
        icon={<Gauge className="w-5 h-5" />}
      />
      <MetricCard
        value={totalIncidents}
        label="Active Incidents"
        trend={trends.incidents}
        color="text-amber-500"
        icon={<AlertTriangle className="w-5 h-5" />}
      />
      <MetricCard
        value={`${avgResponseTime}ms`}
        label="Response Time"
        trend={trends.responseTime}
        color="text-blue-500"
        icon={<Activity className="w-5 h-5" />}
      />
    </div>
  );
}