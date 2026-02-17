import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { SECTION_HEADING_CLASS, SUBSECTION_HEADING_CLASS } from "@/lib/constants";

interface SectionHeadingProps {
  children: React.ReactNode;
  className?: string;
  as?: "h2" | "h3";
}

/**
 * Animated section or subsection heading with consistent style.
 * Respects prefers-reduced-motion (WCAG 2.3.3).
 */
export function SectionHeading({ children, className, as: Tag = "h2" }: SectionHeadingProps) {
  const reducedMotion = useReducedMotion();
  const classNameComputed = cn(
    Tag === "h2" ? SECTION_HEADING_CLASS : SUBSECTION_HEADING_CLASS,
    className
  );
  const baseProps = {
    viewport: { once: true } as const,
    className: classNameComputed,
  };
  const motionProps = reducedMotion
    ? { ...baseProps, initial: { opacity: 1, y: 0 } }
    : {
        ...baseProps,
        initial: { opacity: 0, y: 16 } as const,
        whileInView: { opacity: 1, y: 0 } as const,
      };
  return Tag === "h3" ? (
    <motion.h3 {...motionProps}>{children}</motion.h3>
  ) : (
    <motion.h2 {...motionProps}>{children}</motion.h2>
  );
}
