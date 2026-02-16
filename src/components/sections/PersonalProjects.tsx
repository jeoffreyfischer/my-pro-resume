import { motion } from "framer-motion";
import { HiArrowTopRightOnSquare } from "react-icons/hi2";

const EMBED_URL = "https://lateststack.com/";

export function PersonalProjects() {
  return (
    <section id="personal-projects" className="section-pad">
      <div className="container-narrow">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-6"
        >
          Personal Project
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-zinc-600 dark:text-zinc-400 mb-6 max-w-xl"
        >
          Latest Stack Versions – stay up to date with current versions of popular frameworks and tools.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-xl border border-zinc-200 dark:border-zinc-700/50 overflow-hidden bg-zinc-50 dark:bg-zinc-800/30 shadow-sm"
        >
          <div className="p-4 border-b border-zinc-200 dark:border-zinc-700/50 flex justify-end">
            <a
              href={EMBED_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            >
              Open in new tab
              <HiArrowTopRightOnSquare className="size-4 shrink-0" aria-hidden />
            </a>
          </div>
          <div className="aspect-video min-h-[400px] sm:min-h-[500px] w-full">
            <iframe
              src={EMBED_URL}
              title="Latest Stack Versions"
              className="w-full h-full min-h-[400px] sm:min-h-[500px] border-0"
              allow="fullscreen"
              loading="lazy"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
