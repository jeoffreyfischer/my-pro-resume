"use client";

import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { cn } from "@/lib/utils";

export interface StarsBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Number of stars to draw (default ~200 for performance) */
  starCount?: number;
  /** Whether to show shooting stars (default true). Respects prefers-reduced-motion. */
  shootingStars?: boolean;
  /** Number of shooting star elements (default 3) */
  shootingStarCount?: number;
}

interface Star {
  x: number;
  y: number;
  r: number;
  baseOpacity: number;
  phase: number;
  speed: number;
}

function useReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  return mq.matches;
}

export function StarsBackground({
  className,
  starCount = 220,
  shootingStars = true,
  shootingStarCount = 3,
  ...props
}: StarsBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const animationRef = useRef<number>(0);
  const reducedMotion = useReducedMotion();

  const stars = useMemo(() => {
    const list: Star[] = [];
    for (let i = 0; i < starCount; i++) {
      list.push({
        x: Math.random(),
        y: Math.random(),
        r: Math.random() * 1.2 + 0.3,
        baseOpacity: 0.3 + Math.random() * 0.7,
        phase: Math.random() * Math.PI * 2,
        speed: 0.5 + Math.random() * 1.5,
      });
    }
    return list;
  }, [starCount]);

  starsRef.current = stars;

  const draw = useCallback(
    (ctx: CanvasRenderingContext2D, width: number, height: number, time: number) => {
      ctx.fillStyle = "transparent";
      ctx.clearRect(0, 0, width, height);

      starsRef.current.forEach((star) => {
        const opacity = reducedMotion
          ? star.baseOpacity
          : star.baseOpacity * (0.4 + 0.6 * (Math.sin(time * star.speed + star.phase) * 0.5 + 0.5));
        ctx.beginPath();
        ctx.arc(star.x * width, star.y * height, star.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.fill();
      });
    },
    [reducedMotion]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setSize = () => {
      const dpr = Math.min(window.devicePixelRatio ?? 1, 2);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    setSize();
    const resizeObserver = new ResizeObserver(setSize);
    resizeObserver.observe(canvas);

    let start: number;
    const loop = (t: number) => {
      if (!start) start = t;
      const time = (t - start) / 1000;
      draw(ctx, canvas.clientWidth, canvas.clientHeight, time);
      animationRef.current = requestAnimationFrame(loop);
    };
    animationRef.current = requestAnimationFrame(loop);

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animationRef.current);
    };
  }, [draw]);

  const showShooting = shootingStars && !reducedMotion;

  return (
    <div
      className={cn("absolute inset-0 overflow-hidden", className)}
      aria-hidden
      {...props}
    >
      {/* Dark sky gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #0f172a 0%, #020617 40%, #000 100%)",
        }}
      />
      {/* Twinkling stars canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ width: "100%", height: "100%" }}
      />
      {/* Shooting stars (CSS animation) */}
      {showShooting &&
        Array.from({ length: shootingStarCount }).map((_, i) => (
          <div
            key={i}
            className="absolute inset-0 pointer-events-none opacity-0 animate-[shooting-star_1.2s_ease-in-out_infinite]"
            style={{
              animationDelay: `${i * 3.2 + Math.random() * 2}s`,
              animationDuration: "1.2s",
            }}
            aria-hidden
          >
            <div
              className="absolute w-32 h-px bg-gradient-to-r from-transparent via-white/90 to-transparent"
              style={{
                top: `${15 + i * 25}%`,
                left: "-8rem",
                transform: "rotate(-45deg)",
                boxShadow: "0 0 12px 2px rgba(255,255,255,0.4)",
              }}
            />
          </div>
        ))}
    </div>
  );
}
