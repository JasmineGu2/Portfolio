"use client";

import React from "react";
import { cn } from "@/lib/utils";

type SpotlightProps = {
  className?: string;
  size?: number;
  color1?: string;
  color2?: string;
  color3?: string;
  darkColor1?: string;
  darkColor2?: string;
  darkColor3?: string;
};

export function Spotlight({ 
  className, 
  size = 200,
  color1 = "rgb(30 64 175)",
  color2 = "rgb(37 99 235)",
  color3 = "rgb(96 165 250)",
  darkColor1 = "rgb(30 58 138)",
  darkColor2 = "rgb(59 130 246)",
  darkColor3 = "rgb(30 58 138)",
}: SpotlightProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute z-0 h-full w-full transition-opacity duration-500",
        className
      )}
    >
      <div
        className="absolute inset-0 blur-xl"
        style={{
          background: `radial-gradient(${size}px circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%), ${color1} 0%, ${color2} 35%, ${color3} 50%, transparent 70%)`,
        }}
      />
      <div
        className="absolute inset-0 blur-xl dark:block hidden"
        style={{
          background: `radial-gradient(${size}px circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%), ${darkColor1} 0%, ${darkColor2} 35%, ${darkColor3} 50%, transparent 70%)`,
        }}
      />
    </div>
  );
}

