import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/** Vertical offset so each card's title peeks out above the one in front. */
const TITLE_STRIP_OFFSET = 52;
const MAX_VISIBLE = 12;

interface CardStackProps<T> {
  items: T[];
  /** Third arg: isExpanded - when false, render only the title strip (no description/body). */
  renderCard: (item: T, index: number, isExpanded: boolean) => React.ReactNode;
  className?: string;
  cardClassName?: string;
  /** Optional label for screen readers (e.g. "Client project") */
  itemLabel?: string;
}

/**
 * Stacked cards that overlap. Click to cycle: top card goes to back, next comes to front.
 * Accessible: keyboard (Enter/Space), aria, reduced motion.
 */
export function CardStack<T extends { title?: string }>({
  items,
  renderCard,
  className,
  cardClassName,
  itemLabel = "Project",
}: CardStackProps<T>) {
  const [topIndex, setTopIndex] = useState(0);

  const cycle = useCallback(() => {
    if (items.length <= 1) return;
    setTopIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  if (items.length === 0) return null;

  const visibleCount = Math.min(items.length, MAX_VISIBLE);
  const containerMinHeight =
    240 + (visibleCount - 1) * TITLE_STRIP_OFFSET;

  const goTo = useCallback((index: number) => {
    setTopIndex(index);
  }, []);

  return (
    <div
      className={cn("relative w-full", className)}
      role="group"
      aria-label={`${items.length} ${itemLabel}s in a stack. Click a title to view that card.`}
      style={{ minHeight: containerMinHeight }}
    >
      <div
        className="relative w-full max-w-sm mx-auto"
        style={{ minHeight: containerMinHeight }}
      >
        {items.map((item, i) => {
          // Stack order: topIndex is front (at bottom), then topIndex+1 above it, etc.
          const stackOrder = (i - topIndex + items.length) % items.length;
          const isTop = stackOrder === 0;
          const isVisible = stackOrder < MAX_VISIBLE;

          if (!isVisible) return null;

          // Cascade: front card at bottom, cards behind above with titles peeking out
          const offsetY = (items.length - 1 - stackOrder) * TITLE_STRIP_OFFSET;
          const zIndex = items.length - stackOrder;
          const scale = 1 - stackOrder * 0.01;

          const handleClick = () => {
            if (isTop) {
              cycle();
            } else {
              goTo(i);
            }
          };

          return (
            <motion.div
              key={item.title ?? i}
              role="button"
              tabIndex={isTop ? 0 : -1}
              aria-label={`${item.title ?? `Item ${i + 1}`}. ${stackOrder + 1} of ${items.length}. Click to ${isTop ? "view next" : "view this card"}.`}
              onClick={handleClick}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleClick();
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
                "absolute left-0 right-0 top-0 cursor-pointer select-none touch-manipulation overflow-hidden",
                "h-[220px] sm:h-[240px]",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-50 dark:focus-visible:ring-offset-zinc-900",
                "rounded-xl shadow-lg",
                cardClassName
              )}
              style={{
                pointerEvents: "auto",
              }}
            >
              {renderCard(item, i, isTop)}
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
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to ${itemLabel} ${i + 1}`}
              aria-current={i === topIndex}
              onClick={() => setTopIndex(i)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-200",
                i === topIndex
                  ? "w-5 bg-zinc-900 dark:bg-zinc-100"
                  : "w-1.5 bg-zinc-300 dark:bg-zinc-600 hover:bg-zinc-400 dark:hover:bg-zinc-500"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
