import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusIndicator } from "@/components/status-indicator";
import { cn } from "@/lib/utils";

interface StatusSectionProps {
  title: string;
  services: Record<string, string>;
}

export function StatusSection({ title, services }: StatusSectionProps) {
  const allOperational = Object.values(services).every(
    (status) => status === "Operational"
  );

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-medium">{title}</CardTitle>
        <span
          className={cn(
            "text-xs px-2.5 py-0.5 rounded-full font-medium",
            allOperational
              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
          )}
        >
          {allOperational ? "All Operational" : "Issues Detected"}
        </span>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          {Object.entries(services).map(([service, status]) => (
            <div
              key={service}
              className="flex items-center justify-between py-2 border-b last:border-0"
            >
              <span className="text-sm">{service}</span>
              <StatusIndicator status={status} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}