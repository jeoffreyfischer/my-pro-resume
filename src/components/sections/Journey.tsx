import { motion } from "framer-motion";
import { timeline } from "@/data/resume";

type TimelineItem = (typeof timeline)[number];

const CARD_CLASS =
  "rounded-xl border border-zinc-200 dark:border-zinc-700/50 bg-white dark:bg-zinc-800/30 p-4 sm:p-5 hover:border-zinc-300 dark:hover:border-zinc-600/50 transition-colors shadow-sm dark:shadow-none";

function TimelineCard({ item }: { item: TimelineItem }) {
  const isWork = item.type === "work";
  return (
    <div className={CARD_CLASS}>
      <div className="flex flex-wrap items-baseline gap-2">
        <span
          className={`text-xs font-medium uppercase tracking-wider ${
            isWork ? "text-blue-600 dark:text-blue-400" : "text-violet-600 dark:text-violet-400"
          }`}
        >
          {isWork ? "Work" : "Education"}
        </span>
        <span className="text-xs text-zinc-500">{item.period}</span>
      </div>
      <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mt-1">{item.title}</h3>
      <p className="text-sm text-zinc-500 mt-0.5">{item.org}</p>
      <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 leading-relaxed">{item.description}</p>
    </div>
  );
}

function Dot({ isWork, onLine }: { isWork: boolean; onLine?: boolean }) {
  const position = onLine ? "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" : "left-0 top-1.5";
  return (
    <span
      className={`absolute w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 flex items-center justify-center z-10 ${position} ${
        isWork ? "border-blue-500 bg-blue-500/20" : "border-violet-500 bg-violet-500/20 dark:bg-violet-500/15"
      }`}
    >
      <span className={`w-2 h-2 rounded-full ${isWork ? "bg-blue-500" : "bg-violet-500"}`} />
    </span>
  );
}

const reversed = [...timeline].reverse();

export function Journey() {
  return (
    <section id="journey" className="section-pad">
      <div className="container-narrow">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-12"
        >
          Journey
        </motion.h2>

        {/* Small screens: single column, line on left, all blocks on the right */}
        <div className="relative lg:hidden">
          <div
            className="absolute left-[11px] sm:left-4 top-2 bottom-2 w-px bg-zinc-300 dark:bg-zinc-700/60"
            aria-hidden
          />
          <ul className="space-y-8 sm:space-y-10">
            {reversed.map((item, i) => (
              <motion.li
                key={`${item.org}-${item.period}`}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="relative pl-10 sm:pl-12"
              >
                <Dot isWork={item.type === "work"} onLine={false} />
                <TimelineCard item={item} />
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Large screens: one row per item, line centered, education left / work right */}
        <div className="relative hidden lg:block">
          <div
            className="absolute left-1/2 top-2 bottom-2 w-px -translate-x-px bg-zinc-300 dark:bg-zinc-700/60"
            aria-hidden
          />
          <ul className="space-y-8 sm:space-y-10">
            {reversed.map((item, i) => {
              const isWork = item.type === "work";
              return (
                <motion.li
                  key={`${item.org}-${item.period}`}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="relative grid grid-cols-2 gap-0 items-start"
                >
                  <Dot isWork={isWork} onLine />
                  {/* Left half: education card (right-aligned) or empty */}
                  <div className="pr-6 flex justify-end">
                    {!isWork && (
                      <div className="w-full max-w-[calc(100%-1rem)]">
                        <TimelineCard item={item} />
                      </div>
                    )}
                  </div>
                  {/* Right half: work card (left-aligned) or empty */}
                  <div className="pl-6 flex justify-start">
                    {isWork && (
                      <div className="w-full max-w-[calc(100%-1rem)]">
                        <TimelineCard item={item} />
                      </div>
                    )}
                  </div>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
