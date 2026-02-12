import { motion } from "framer-motion";
import { timeline } from "@/data/resume";

export function Journey() {
  return (
    <section id="journey" className="section-pad bg-zinc-100 dark:bg-zinc-900/30">
      <div className="container-narrow">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-12"
        >
          Journey
        </motion.h2>

        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-[11px] sm:left-4 top-2 bottom-2 w-px bg-zinc-300 dark:bg-zinc-700/60"
            aria-hidden
          />

          <ul className="space-y-8 sm:space-y-10">
            {[...timeline].reverse().map((item, i) => (
              <motion.li
                key={`${item.org}-${item.period}`}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="relative pl-10 sm:pl-12"
              >
                {/* Dot */}
                <span
                  className={`absolute left-0 top-1.5 w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 flex items-center justify-center ${
                    item.type === "work"
                      ? "border-blue-500 bg-blue-500/20"
                      : "border-zinc-400 dark:border-zinc-500 bg-zinc-200 dark:bg-zinc-700/30"
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      item.type === "work" ? "bg-blue-500" : "bg-zinc-500"
                    }`}
                  />
                </span>

                <div className="rounded-xl border border-zinc-200 dark:border-zinc-700/50 bg-white dark:bg-zinc-800/20 p-4 sm:p-5 hover:border-zinc-300 dark:hover:border-zinc-600/50 transition-colors shadow-sm dark:shadow-none">
                  <div className="flex flex-wrap items-baseline gap-2">
                    <span
                      className={`text-xs font-medium uppercase tracking-wider ${
                        item.type === "work" ? "text-blue-600 dark:text-blue-400" : "text-zinc-500"
                      }`}
                    >
                      {item.type === "work" ? "Work" : "Education"}
                    </span>
                    <span className="text-xs text-zinc-500">{item.period}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mt-1">{item.title}</h3>
                  <p className="text-sm text-zinc-500 mt-0.5">{item.org}</p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 leading-relaxed">{item.description}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
