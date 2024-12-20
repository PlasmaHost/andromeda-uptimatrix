import { StatusData } from "./types";

export function calculateMetrics(data: StatusData) {
  const totalServices = Object.values(data.services).reduce(
    (acc, services) => acc + Object.keys(services).length,
    0
  );
  
  const operationalServices = Object.values(data.services).reduce(
    (acc, services) =>
      acc + Object.values(services).filter((status) => status === "Operational").length,
    0
  );

  const uptime = Math.round((operationalServices / totalServices) * 100);
  const totalIncidents = Object.values(data.services).reduce(
    (acc, services) =>
      acc + Object.values(services).filter((status) => status !== "Operational").length,
    0
  );
  const avgResponseTime = 187;

  // Simulated trend data (in a real app, this would come from historical data)
  const trends = {
    uptime: 0.5,
    incidents: -2.3,
    responseTime: -1.2
  };

  return {
    uptime,
    totalIncidents,
    avgResponseTime,
    trends
  };
}