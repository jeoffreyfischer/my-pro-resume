"use client";

import React, { useId } from "react";
import { cn } from "@/lib/utils";

export interface SkyCloudsBackgroundProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Whether clouds should drift slowly (respects prefers-reduced-motion) */
  animateClouds?: boolean;
}

function useReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  return mq.matches;
}

/** Realistic cumulus: flat base, puffy top, volume gradient (bright top / soft shadow underside) */
function CloudRealistic({
  variant = "default",
  className,
}: {
  variant?: "default" | "wide" | "round";
  className?: string;
}) {
  const id = useId().replace(/:/g, "");
  const gradientId = `cloud-grad-${id}`;
  const filterId = `cloud-soft-${id}`;

  // Variant: different ellipse arrangements for variety
  const shapes = {
    default: (
      <>
        {/* Flat base layer */}
        <ellipse cx="120" cy="95" rx="95" ry="28" />
        {/* Puffy top - overlapping ellipses for organic cumulus look */}
        <ellipse cx="55" cy="72" rx="38" ry="32" />
        <ellipse cx="95" cy="58" rx="48" ry="40" />
        <ellipse cx="145" cy="62" rx="42" ry="36" />
        <ellipse cx="180" cy="78" rx="32" ry="28" />
        <ellipse cx="75" cy="65" rx="28" ry="24" />
        <ellipse cx="130" cy="55" rx="30" ry="26" />
      </>
    ),
    wide: (
      <>
        <ellipse cx="140" cy="92" rx="120" ry="26" />
        <ellipse cx="50" cy="75" rx="42" ry="34" />
        <ellipse cx="110" cy="58" rx="55" ry="42" />
        <ellipse cx="180" cy="65" rx="45" ry="36" />
        <ellipse cx="230" cy="78" rx="38" ry="30" />
        <ellipse cx="85" cy="62" rx="32" ry="28" />
        <ellipse cx="160" cy="52" rx="35" ry="30" />
      </>
    ),
    round: (
      <>
        <ellipse cx="100" cy="88" rx="65" ry="24" />
        <ellipse cx="70" cy="68" rx="42" ry="36" />
        <ellipse cx="110" cy="52" rx="48" ry="40" />
        <ellipse cx="145" cy="70" rx="35" ry="30" />
        <ellipse cx="95" cy="58" rx="28" ry="24" />
      </>
    ),
  };

  return (
    <svg
      viewBox={variant === "wide" ? "0 0 280 130" : "0 0 240 120"}
      className={cn("block size-full", className)}
      aria-hidden
      focusable="false"
    >
      <defs>
        {/* Bright top (sun), subtle cool shadow on underside for volume */}
        <linearGradient
          id={gradientId}
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%"
          gradientUnits="userSpaceOnUse"
          gradientTransform="rotate(0)"
        >
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.98" />
          <stop offset="45%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#d4ebf7" stopOpacity="0.85" />
        </linearGradient>
        {/* Soft, natural cloud edge */}
        <filter id={filterId} x="-15%" y="-15%" width="130%" height="130%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="0.8" result="blur" />
          <feBlend in="SourceGraphic" in2="blur" mode="normal" />
        </filter>
      </defs>
      <g fill={`url(#${gradientId})`} filter={`url(#${filterId})`}>
        {shapes[variant]}
      </g>
    </svg>
  );
}

const CLOUDS: Array<{
  top: string;
  left: string;
  width: string;
  height: string;
  variant: "default" | "wide" | "round";
  driftSeconds: number;
  delay: string;
}> = [
  { top: "5%", left: "2%", width: "38%", height: "20%", variant: "default", driftSeconds: 34, delay: "0s" },
  { top: "14%", left: "48%", width: "46%", height: "22%", variant: "wide", driftSeconds: 40, delay: "1.5s" },
  { top: "32%", left: "8%", width: "32%", height: "18%", variant: "round", driftSeconds: 38, delay: "0.5s" },
  { top: "50%", left: "56%", width: "40%", height: "20%", variant: "default", driftSeconds: 42, delay: "2.2s" },
  { top: "68%", left: "14%", width: "44%", height: "21%", variant: "wide", driftSeconds: 46, delay: "1s" },
  { top: "82%", left: "42%", width: "36%", height: "19%", variant: "round", driftSeconds: 44, delay: "2.8s" },
];

export function SkyCloudsBackground({
  className,
  animateClouds = true,
  ...props
}: SkyCloudsBackgroundProps) {
  const reducedMotion = useReducedMotion();
  const shouldDrift = animateClouds && !reducedMotion;

  return (
    <div
      className={cn("absolute inset-0 overflow-hidden", className)}
      aria-hidden
      {...props}
    >
      {/* Light blue sky gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #7dd3fc 0%, #bae6fd 35%, #e0f2fe 70%, #f0f9ff 100%)",
        }}
      />
      {/* Realistic clouds */}
      {CLOUDS.map((cloud, i) => (
        <div
          key={i}
          className={cn(
            "absolute",
            shouldDrift && `animate-[cloud-drift_${cloud.driftSeconds}s_ease-in-out_infinite]`
          )}
          style={{
            top: cloud.top,
            left: cloud.left,
            width: cloud.width,
            height: cloud.height,
            animationDelay: cloud.delay,
            transform: "translateZ(0)",
          }}
          aria-hidden
        >
          <CloudRealistic variant={cloud.variant} />
        </div>
      ))}
    </div>
  );
}
