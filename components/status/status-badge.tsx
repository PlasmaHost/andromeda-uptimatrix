import { cn } from "@/lib/utils";

type StatusType = "Operational" | "Degraded" | "Outage" | "Maintenance";
type SizeType = "sm" | "md" | "lg";

interface StatusBadgeProps {
  status: StatusType;
  size?: SizeType;
}

export function StatusBadge({ status, size = "md" }: StatusBadgeProps) {
  const getStatusStyle = (status: StatusType) => {
    const baseClasses = "px-2.5 py-0.5 rounded-full font-medium inline-flex items-center gap-1.5";
    const sizeClasses: Record<SizeType, string> = {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base"
    };

    const styles: Record<StatusType, string> = {
      "Operational": "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
      "Degraded": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
      "Outage": "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
      "Maintenance": "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
    };

    return cn(baseClasses, sizeClasses[size], styles[status]);
  };

  return (
    <span className={getStatusStyle(status)}>
      <span className={cn(
        "w-1.5 h-1.5 rounded-full",
        status === "Operational" ? "bg-green-600 dark:bg-green-400" :
        status === "Degraded" ? "bg-yellow-600 dark:bg-yellow-400" :
        status === "Outage" ? "bg-red-600 dark:bg-red-400" :
        "bg-blue-600 dark:bg-blue-400"
      )} />
      {status}
    </span>
  );
}