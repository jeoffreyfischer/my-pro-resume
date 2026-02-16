import { motion } from "framer-motion";
import { HiArrowTopRightOnSquare } from "react-icons/hi2";
import { SectionHeading } from "@/components/ui/section-heading";

const EMBED_URL = "https://lateststack.com/";

export function PersonalProjects() {
  return (
    <div id="personal-projects">
      <SectionHeading as="h3" className="mb-6">
        Personal Project
      </SectionHeading>
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
  );
}
