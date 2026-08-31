"use client";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeSwitcher() {
  const [isMounted, setIsMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const isDarkTheme = resolvedTheme === "dark";
  const themeToggleLabel = isMounted ? (isDarkTheme ? "Switch to light mode" : "Switch to dark mode") : "Toggle color theme";

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <Button
      variant="outline"
      size="icon"
      className=" bg-card shadow-sm"
      aria-label={themeToggleLabel}
      title={themeToggleLabel}
      disabled={!isMounted}
      onClick={() => setTheme(isDarkTheme ? "light" : "dark")}
    >
      {isMounted ? isDarkTheme ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" /> : <span className="size-3.5" aria-hidden="true" />}
    </Button>
  );
}
