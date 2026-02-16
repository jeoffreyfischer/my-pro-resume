import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { SECTION_HEADING_CLASS, SUBSECTION_HEADING_CLASS } from "@/lib/constants";

interface SectionHeadingProps {
  children: React.ReactNode;
  className?: string;
  as?: "h2" | "h3";
}

/**
 * Animated section or subsection heading with consistent style.
 */
export function SectionHeading({ children, className, as: Tag = "h2" }: SectionHeadingProps) {
  const sharedProps = {
    initial: { opacity: 0, y: 16 } as const,
    whileInView: { opacity: 1, y: 0 } as const,
    viewport: { once: true } as const,
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
