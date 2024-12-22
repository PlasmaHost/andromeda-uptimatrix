import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/status/status-badge";
import { cn } from "@/lib/utils";

type StatusType = "Operational" | "Degraded" | "Outage" | "Maintenance";

interface StatusSectionProps {
  category: string;
  services: Array<{
    serviceName: string;
    status: StatusType;
  }>;
}

export function StatusSection({ category, services }: StatusSectionProps) {
  const allOperational = services.every(
    (service) => service.status === "Operational"
  );

  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-medium">{category}</CardTitle>
        <StatusBadge status={allOperational ? "Operational" : "Degraded"} size="sm" />
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          {services.map((service) => (
            <div
              key={service.serviceName}
              className="flex items-center justify-between py-2.5 border-b last:border-0 hover:bg-muted/50 rounded-sm px-2 transition-colors"
            >
              <span className="text-sm font-medium">{service.serviceName}</span>
              <StatusBadge status={service.status} size="sm" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}