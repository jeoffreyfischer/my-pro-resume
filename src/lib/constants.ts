/**
 * Shared UI constants for consistent section/card styling across the resume.
 */

/** iframe allow attribute for video embeds (YouTube, etc.). */
export const IFRAME_ALLOW =
  "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";

/** Primary CTA button (e.g. Contact, Open in new tab). */
export const BTN_PRIMARY =
  "inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-colors";

/** Secondary/outline link button. */
export const BTN_SECONDARY =
  "inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-zinc-50 dark:bg-zinc-800/30 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 text-sm transition-colors";

/** Base card style: border, background, hover. Add padding (e.g. p-4 sm:p-5 or p-5 sm:p-6) where used. */
export const SECTION_CARD_BASE =
  "rounded-xl border border-zinc-200 dark:border-zinc-700/50 bg-zinc-50 dark:bg-zinc-800/30 hover:border-zinc-300 dark:hover:border-zinc-600/50 transition-colors shadow-sm dark:shadow-none";

/** Section title (h2) – use with motion.h2 + standard animation. */
export const SECTION_HEADING_CLASS =
  "text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100";

/** Subsection title (h3) – e.g. Work Projects, Personal Projects. */
export const SUBSECTION_HEADING_CLASS =
  "text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100";
