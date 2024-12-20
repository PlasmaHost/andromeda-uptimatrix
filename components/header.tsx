"use client";

import { Activity, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "lucide-react";
import { useEffect, useState } from "react";

export function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  // Render a simpler version initially to avoid hydration mismatch
  if (!mounted) {
    return (
      <header className="border-b">
        <div className="container flex items-center justify-between h-16 max-w-4xl mx-auto">
          <div className="flex items-center gap-2">
            <Activity className="w-6 h-6 text-primary" />
            <span className="text-lg font-semibold">Status</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <span className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="sm">
              <Bell className="w-4 h-4 mr-2" />
              Subscribe to Updates
            </Button>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="border-b">
      <div className="container flex items-center justify-between h-16 max-w-4xl mx-auto">
        <div className="flex items-center gap-2">
          <Activity className="w-6 h-6 text-primary" />
          <span className="text-lg font-semibold">Status</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <SunIcon className="w-5 h-5" />
            ) : (
              <MoonIcon className="w-5 h-5" />
            )}
          </Button>
          <Button variant="outline" size="sm">
            <Bell className="w-4 h-4 mr-2" />
            Subscribe to Updates
          </Button>
        </div>
      </div>
    </header>
  );
}