"use client";

import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { StatusUpdate } from "@/lib/types";
import { cn } from "@/lib/utils";

interface StatusUpdatesProps {
  updates: StatusUpdate[];
}

export function StatusUpdates({ updates }: StatusUpdatesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-medium">Recent Updates</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative space-y-6 before:absolute before:inset-y-0 before:left-3 before:w-[2px] before:bg-muted">
          {updates.map((update, index) => (
            <div key={index} className="relative pl-8">
              <div
                className="absolute left-[7px] top-2 w-3 h-3 -translate-y-1/2 rounded-full border-4 border-background"
                style={{ backgroundColor: update.color }}
              />
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">{update.title}</h3>
                  <time
                    className={cn(
                      "text-xs px-2.5 py-0.5 rounded-full font-medium",
                      "bg-secondary text-secondary-foreground"
                    )}
                  >
                    {format(new Date(update.date), "MMM d, yyyy")}
                  </time>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {update.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}