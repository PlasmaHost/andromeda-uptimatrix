import { cn } from "@/lib/utils";
import { StatusData } from "@/lib/types";
import { CheckCircle2, AlertTriangle } from "lucide-react";

interface StatusOverviewProps {
  data: StatusData;
}

export function StatusOverview({ data }: StatusOverviewProps) {
  const allOperational = Object.values(data.services).every((services) =>
    Object.values(services).every((status) => status === "Operational")
  );

  const totalServices = Object.values(data.services).reduce(
    (acc, services) => acc + Object.keys(services).length,
    0
  );

  const operationalServices = Object.values(data.services).reduce(
    (acc, services) =>
      acc +
      Object.values(services).filter((status) => status === "Operational").length,
    0
  );

  return (
    <div className="relative overflow-hidden rounded-lg border bg-background p-8">
      <div
        className={cn(
          "absolute inset-x-0 top-0 h-1",
          allOperational ? "bg-green-500" : "bg-yellow-500"
        )}
      />
      <div className="text-center space-y-6">
        <div className="space-y-2">
          {allOperational ? (
            <CheckCircle2 className="w-12 h-12 mx-auto text-green-500" />
          ) : (
            <AlertTriangle className="w-12 h-12 mx-auto text-yellow-500" />
          )}
          <h1 className="text-2xl font-bold">
            {allOperational
              ? "All Systems Operational"
              : "Some Systems Degraded"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {operationalServices} out of {totalServices} services are operational
          </p>
        </div>
        <div className="h-2 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full bg-green-500 transition-all duration-500"
            style={{
              width: `${(operationalServices / totalServices) * 100}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}