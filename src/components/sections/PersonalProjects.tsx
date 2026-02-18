import { motion } from "framer-motion";
import { HiArrowTopRightOnSquare } from "react-icons/hi2";
import { SectionHeading } from "@/components/ui/section-heading";
import { personalProjects } from "@/data/resume";
import { BTN_PRIMARY } from "@/lib/constants";

export function PersonalProjects() {
  if (personalProjects.length === 0) return null;

  return (
    <div id="personal-projects">
      <SectionHeading as="h3" className="mb-6">
        Personal Projects
      </SectionHeading>
      <div className="space-y-6">
        {personalProjects.map((project) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-xl border border-zinc-200 dark:border-zinc-700/50 overflow-hidden bg-zinc-50 dark:bg-zinc-800/30 shadow-sm"
          >
            <div className="p-4 border-b border-zinc-200 dark:border-zinc-700/50 flex justify-end">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${project.title} in new tab`}
                className={`${BTN_PRIMARY} py-2.5 font-semibold shadow-sm`}
              >
                Open in new tab
                <HiArrowTopRightOnSquare className="size-5 shrink-0" aria-hidden />
              </a>
            </div>
            <div className="w-full">
              <img
                src={project.imageSrc}
                alt={project.imageAlt}
                className="w-full h-auto block"
                loading="lazy"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
