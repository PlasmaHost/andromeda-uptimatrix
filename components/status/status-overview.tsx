"use client";

import { Card } from "@/components/ui/card";
import { StatusBadge } from "./status-badge";
import type { StatusData } from "@/lib/types";

export function StatusOverview({ data }: { data: StatusData }) {
  const allOperational = Object.values(data.services).every((serviceGroup) =>
    Object.values(serviceGroup).every((status) => status === "Operational")
  );

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">System Status</h2>
          <p className="text-muted-foreground mt-1">
            {allOperational
              ? "All systems are operational"
              : "Some systems are experiencing issues"}
          </p>
        </div>
        <StatusBadge
          status={allOperational ? "Operational" : "Degraded"}
          size="lg"
        />
      </div>
    </Card>
  );
}