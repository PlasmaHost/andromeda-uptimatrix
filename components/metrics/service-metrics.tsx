"use client";

import { Activity, Gauge, AlertTriangle } from "lucide-react";
import { MetricCard } from "./metric-card";
import { StatusData } from "@/lib/types";

export function ServiceMetrics({ data }: { data: StatusData }) {
  const totalServices = data.services.reduce(
    (acc, category) => acc + category.services.length,
    0
  );

  const operationalServices = data.services.reduce(
    (acc, category) =>
      acc + category.services.filter((service) => service.status === "Operational").length,
    0
  );

  const uptime = totalServices > 0 ? Math.round((operationalServices / totalServices) * 100) : 100;
  const totalIncidents = data.services.reduce(
    (acc, category) =>
      acc + category.services.filter((service) => service.status !== "Operational").length,
    0
  );

  const avgResponseTime = 187;

  const metrics = [
    {
      value: `${uptime}%`,
      label: "System Uptime",
      trend: 0.5,
      color: "text-green-500",
      icon: <Gauge className="w-5 h-5" />,
    },
    {
      value: totalIncidents,
      label: "Active Incidents",
      trend: -2.3,
      color: "text-amber-500",
      icon: <AlertTriangle className="w-5 h-5" />,
    },
    {
      value: `${avgResponseTime}ms`,
      label: "Response Time",
      trend: -1.2,
      color: "text-blue-500",
      icon: <Activity className="w-5 h-5" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {metrics.map((metric, index) => (
        <MetricCard
          key={index}
          value={metric.value}
          label={metric.label}
          trend={metric.trend}
          color={metric.color}
          icon={metric.icon}
        />
      ))}
    </div>
  );
}