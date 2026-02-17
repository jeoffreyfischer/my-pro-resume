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
  const sharedProps = {
    initial: reducedMotion ? false : { opacity: 0, y: 16 },
    whileInView: reducedMotion ? false : { opacity: 1, y: 0 },
    viewport: { once: true },
    className: cn(
      Tag === "h2" ? SECTION_HEADING_CLASS : SUBSECTION_HEADING_CLASS,
      className
    ),
  };
  return Tag === "h3" ? (
    <motion.h3 {...sharedProps}>{children}</motion.h3>
  ) : (
    <motion.h2 {...sharedProps}>{children}</motion.h2>
  );
}
