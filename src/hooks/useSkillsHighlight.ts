import { useCallback, useEffect, useState } from "react";

const SKILLS_COUNT = 6;
const INTERVAL_MIN_MS = 100;
const INTERVAL_MAX_MS = 5000;
const INTERVAL_STEP_MS = 500;
const INTERVAL_DEFAULT_MS = 1500;

export function useSkillsHighlight() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const [isPaused, setIsPaused] = useState(false);
  const [intervalMs, setIntervalMs] = useState(INTERVAL_DEFAULT_MS);

  const isPlaying = activeIndex !== null && !isPaused;

  useEffect(() => {
    if (!isPlaying) return;
    const id = setInterval(
      () => setActiveIndex((i) => ((i ?? 0) + 1) % SKILLS_COUNT),
      intervalMs
    );
    return () => clearInterval(id);
  }, [isPlaying, intervalMs]);

  const play = useCallback(() => {
    if (activeIndex === null) {
      setActiveIndex(0);
      setIntervalMs(INTERVAL_DEFAULT_MS);
    }
    setIsPaused(false);
  }, [activeIndex]);

  const pause = useCallback(() => setIsPaused(true), []);

  const stop = useCallback(() => {
    setIsPaused(false);
    setActiveIndex(null);
  }, []);

  const speedUp = useCallback(() => {
    setIntervalMs((ms) => Math.max(INTERVAL_MIN_MS, ms - INTERVAL_STEP_MS));
  }, []);

  const speedDown = useCallback(() => {
    setIntervalMs((ms) => Math.min(INTERVAL_MAX_MS, ms + INTERVAL_STEP_MS));
  }, []);

  return {
    activeIndex,
    isPlaying,
    intervalMs,
    isSpeedDownDisabled: intervalMs >= INTERVAL_MAX_MS,
    isSpeedUpDisabled: intervalMs <= INTERVAL_MIN_MS,
    play,
    pause,
    stop,
    speedUp,
    speedDown,
  };
}

export type SkillsHighlightApi = ReturnType<typeof useSkillsHighlight>;
