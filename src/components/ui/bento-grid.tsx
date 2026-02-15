import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/utils";

export interface BentoGridProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
  className?: string;
}

/**
 * Bento-style grid layout (Magic UI inspired).
 * Use with children that have col-span-* / row-span-* for a bento layout.
 */
export function BentoGrid({ children, className, ...props }: BentoGridProps) {
  return (
    <div
      className={cn(
        "grid w-full gap-4 sm:gap-5 items-start",
        "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
        "auto-rows-[minmax(0,auto)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
