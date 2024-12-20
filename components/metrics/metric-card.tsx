"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  value: string | number;
  label: string;
  trend?: number;
  color?: string;
  icon: React.ReactNode;
}

export function MetricCard({ value, label, trend, color = "text-primary", icon }: MetricCardProps) {
  return (
    <Card className="relative overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-muted-foreground text-sm font-medium">{label}</span>
          <span className={cn("p-2 rounded-full bg-background", color)}>{icon}</span>
        </div>
        <div className="space-y-1">
          <h3 className={cn("text-3xl font-bold tracking-tight", color)}>{value}</h3>
          {trend && (
            <p className={cn(
              "text-sm font-medium",
              trend > 0 ? "text-green-500" : "text-red-500"
            )}>
              {trend > 0 ? "↑" : "↓"} {Math.abs(trend)}% from last week
            </p>
          )}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted">
        <div className={cn("h-full transition-all", color.replace("text-", "bg-"))} style={{ width: "70%" }} />
      </div>
    </Card>
  );
}