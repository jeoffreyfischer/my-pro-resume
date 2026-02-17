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
              aria-label="Open Latest Stack in new tab"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-colors shadow-sm"
            >
              Open in new tab
              <HiArrowTopRightOnSquare className="size-5 shrink-0" aria-hidden />
            </a>
          </div>
          <div className="w-full">
            <img
              src="/images/latest-stack.png"
              alt="Latest Stack Versions screenshot"
              className="w-full h-auto block"
              loading="lazy"
            />
          </div>
        </motion.div>
    </div>
  );
}
