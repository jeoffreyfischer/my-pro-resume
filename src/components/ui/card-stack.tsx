import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/** Vertical offset so each card's title peeks out above the one in front. */
const TITLE_STRIP_OFFSET = 52;
/** When expanding a covered card, push the forward pile down by this amount to reveal content. */
const REVEAL_OFFSET = 200;
const MAX_VISIBLE = 12;

interface CardStackProps<T> {
  items: T[];
  /** Third arg: isExpanded - when false, render only the title strip (no description/body). */
  renderCard: (item: T, index: number, isExpanded: boolean) => React.ReactNode;
  className?: string;
  cardClassName?: string;
  /** Optional label for screen readers (e.g. "Client project") */
  itemLabel?: string;
  /** Horizontal alignment of the pile within its container (default: center) */
  stackAlign?: "start" | "center" | "end";
  /** Max width of the pile container (default: max-w-sm) */
  stackMaxWidth?: string;
}

/**
 * Stacked cards that overlap. Click front card to cycle; click a covered card to expand it
 * (forward pile moves down so you can read it; cards stay in place).
 * Accessible: keyboard (Enter/Space), aria, reduced motion.
 */
export function CardStack<T extends { title?: string }>({
  items,
  renderCard,
  className,
  cardClassName,
  itemLabel = "Project",
  stackAlign = "center",
  stackMaxWidth = "max-w-sm",
}: CardStackProps<T>) {
  const [topIndex, setTopIndex] = useState(0);
  /** When set, this card is expanded and forward pile is pushed down to reveal it. */
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  if (items.length === 0) return null;

  const visibleCount = Math.min(items.length, MAX_VISIBLE);
  const baseMinHeight = 240 + (visibleCount - 1) * TITLE_STRIP_OFFSET;
  const isExpanded = expandedIndex !== null;
  const containerMinHeight = isExpanded ? baseMinHeight + REVEAL_OFFSET : baseMinHeight;

  const handleClick = useCallback(
    (index: number, stackOrder: number) => {
      if (stackOrder === 0) {
        /* Front card: no action (nothing in front to move). */
        return;
      }
      setExpandedIndex(expandedIndex === index ? null : index);
    },
    [expandedIndex]
  );

  return (
    <div
      className={cn("relative w-full", className)}
      role="group"
      aria-label={`${items.length} ${itemLabel}s in a stack. Click a title to view that card.`}
      style={{ minHeight: containerMinHeight }}
    >
      <div
        className={cn(
          "relative w-full",
          stackMaxWidth,
          stackAlign === "start" ? "mr-auto" : stackAlign === "end" ? "ml-auto" : "mx-auto"
        )}
        style={{ minHeight: containerMinHeight }}
      >
        {items.map((item, i) => {
          // Stack order: topIndex is front (at bottom), then topIndex+1 above it, etc.
          const stackOrder = (i - topIndex + items.length) % items.length;
          const isTop = stackOrder === 0;
          const isVisible = stackOrder < MAX_VISIBLE;

          if (!isVisible) return null;

          // Cascade: front card at bottom, cards behind above with titles peeking out
          let offsetY = (items.length - 1 - stackOrder) * TITLE_STRIP_OFFSET;
          // When a covered card is expanded, push forward pile (lower stackOrder) down
          const expandedStackOrder =
            expandedIndex != null
              ? (expandedIndex - topIndex + items.length) % items.length
              : -1;
          if (expandedStackOrder >= 0 && stackOrder < expandedStackOrder) {
            offsetY += REVEAL_OFFSET;
          }
          const zIndex = items.length - stackOrder;
          const scale = 1 - stackOrder * 0.01;
          const isThisExpanded = expandedIndex === i;
          const showFullContent = isTop || isThisExpanded;

          return (
            <motion.div
              key={item.title ?? i}
              role="button"
              tabIndex={showFullContent ? 0 : -1}
              aria-label={`${item.title ?? `Item ${i + 1}`}. ${stackOrder + 1} of ${items.length}. ${stackOrder === 0 ? "Front card." : "Click to view this card."}`}
              onClick={() => handleClick(i, stackOrder)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleClick(i, stackOrder);
                }
              }}
              initial={false}
              animate={{
                x: 0,
                y: offsetY,
                zIndex,
                scale,
              }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 30,
              }}
              className={cn(
                "absolute left-0 right-0 top-0 select-none touch-manipulation overflow-hidden",
                stackOrder === 0 ? "cursor-default" : "cursor-pointer",
                "h-[220px] sm:h-[240px]",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-50 dark:focus-visible:ring-offset-zinc-900",
                "rounded-xl shadow-lg",
                cardClassName
              )}
              style={{
                pointerEvents: "auto",
              }}
            >
              {renderCard(item, i, showFullContent)}
            </motion.div>
          );
        })}
      </div>

      {/* Stack indicator */}
      {items.length > 1 && (
        <div
          className="mt-3 flex justify-center gap-1.5"
          role="status"
          aria-live="polite"
          aria-label={`Showing ${topIndex + 1} of ${items.length}`}
        >
          {items.map((_, i) => {
            const isFocused = i === (expandedIndex ?? topIndex);
            return (
            <button
              key={i}
              type="button"
              aria-label={`Go to ${itemLabel} ${i + 1}`}
              aria-current={isFocused}
              onClick={() => {
                setExpandedIndex(null);
                setTopIndex(i);
              }}
              className={cn(
                "h-1.5 rounded-full transition-all duration-200",
                isFocused
                  ? "w-5 bg-zinc-900 dark:bg-zinc-100"
                  : "w-1.5 bg-zinc-300 dark:bg-zinc-600 hover:bg-zinc-400 dark:hover:bg-zinc-500"
              )}
            />
          );})}
        </div>
      )}
    </div>
  );
}
