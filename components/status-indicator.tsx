import { cn } from "@/lib/utils";

interface StatusIndicatorProps {
  status: string;
  size?: "sm" | "md" | "lg";
}

export function StatusIndicator({ status, size = "md" }: StatusIndicatorProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "operational":
        return "bg-green-500";
      case "degraded":
        return "bg-yellow-500";
      case "outage":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const sizeClasses = {
    sm: "w-2 h-2",
    md: "w-3 h-3",
    lg: "w-4 h-4",
  };

  return (
    <span className="flex items-center gap-2">
      <span
        className={cn(
          "rounded-full",
          getStatusColor(status),
          sizeClasses[size]
        )}
      />
      <span className="text-sm font-medium">{status}</span>
    </span>
  );
}