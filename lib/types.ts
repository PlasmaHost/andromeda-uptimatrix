export type StatusType = "Operational" | "Degraded" | "Outage" | "Maintenance";

export interface StatusData {
  announcement: {
    text: string;
  };
  maintenanceAlerts: MaintenanceAlert[];
  sections: {
    announcementBar: boolean;
    maintenanceAlerts: boolean;
    statusUpdates: boolean;
  };
  services: {
    categoryName: string;
    services: Array<{
      serviceName: string;
      status: StatusType;
    }>;
  }[];
  statusUpdates: StatusUpdate[];
}

export interface MaintenanceAlert {
  date: string;
  message: string;
  title: string;
}

export interface StatusUpdate {
  color: string;
  date: string;
  message: string;
  title: string;
}