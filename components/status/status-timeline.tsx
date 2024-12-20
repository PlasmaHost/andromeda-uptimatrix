"use client";

import { StatusUpdate } from "@/lib/types";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

interface StatusTimelineProps {
  updates: StatusUpdate[];
}

export function StatusTimeline({ updates }: StatusTimelineProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">System Timeline</CardTitle>
      </CardHeader>
      <CardContent className="relative pt-4">
        <div className="absolute top-0 bottom-0 left-[27px] w-px bg-border" />
        <div className="space-y-6">
          {updates.map((update, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative pl-12"
            >
              <div
                className="absolute left-0 p-1 rounded-full border-4 border-background"
                style={{ backgroundColor: update.color }}
              />
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">{update.title}</h3>
                  <time className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">
                    {format(new Date(update.date), "MMM d, yyyy")}
                  </time>
                </div>
                <p className="text-sm text-muted-foreground">{update.message}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}