import { ChevronsLeft, ChevronsRight, Pause, Play, Square } from "lucide-react";
import type { SkillsHighlightApi } from "@/hooks/useSkillsHighlight";

const BUTTON_CLASS =
  "rounded-md p-1.5 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors disabled:opacity-50 disabled:pointer-events-none";

export function SkillsOrbitControls({
  isPlaying,
  isSpeedDownDisabled,
  isSpeedUpDisabled,
  play,
  pause,
  stop,
  speedUp,
  speedDown,
}: Pick<
  SkillsHighlightApi,
  | "isPlaying"
  | "isSpeedDownDisabled"
  | "isSpeedUpDisabled"
  | "play"
  | "pause"
  | "stop"
  | "speedUp"
  | "speedDown"
>) {
  return (
    <div className="flex items-center justify-center gap-1 mt-2 pointer-events-auto">
      <button
        type="button"
        onClick={speedDown}
        disabled={isSpeedDownDisabled}
        className={BUTTON_CLASS}
        title="Slower"
        aria-label="Slower"
      >
        <ChevronsLeft className="size-4" />
      </button>
      <button type="button" onClick={stop} className={BUTTON_CLASS} title="Stop" aria-label="Stop">
        <Square className="size-4" />
      </button>
      <button
        type="button"
        onClick={isPlaying ? pause : play}
        className={BUTTON_CLASS}
        title={isPlaying ? "Pause" : "Play"}
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? <Pause className="size-4" /> : <Play className="size-4" />}
      </button>
      <button
        type="button"
        onClick={speedUp}
        disabled={isSpeedUpDisabled}
        className={BUTTON_CLASS}
        title="Faster"
        aria-label="Faster"
      >
        <ChevronsRight className="size-4" />
      </button>
    </div>
  );
}
