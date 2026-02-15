import { motion } from "framer-motion";
import { projects } from "@/data/resume";

const CARD_CLASS =
  "rounded-xl border border-zinc-200 dark:border-zinc-700/50 bg-white dark:bg-zinc-800/30 p-5 sm:p-6 hover:border-zinc-300 dark:hover:border-zinc-600/50 transition-colors shadow-sm dark:shadow-none";

const CATEGORY_PILL: Record<string, string> = {
  internal:
    "inline-flex shrink-0 text-xs font-medium px-2.5 py-1 rounded-md border text-red-700 dark:text-red-300 bg-red-100 dark:bg-red-950/50 border-red-200 dark:border-red-800/50",
  workshop:
    "inline-flex shrink-0 text-xs font-medium px-2.5 py-1 rounded-md border text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-950/50 border-blue-300/60 dark:border-blue-700/50",
  client:
    "inline-flex shrink-0 text-xs font-medium px-2.5 py-1 rounded-md border text-green-700 dark:text-green-300 bg-green-100 dark:bg-green-950/50 border-green-200 dark:border-green-800/50",
};

function getCategoryPillClass(category: string): string {
  const c = category.toLowerCase();
  if (c.includes("internal")) return CATEGORY_PILL.internal;
  if (c.includes("workshop")) return CATEGORY_PILL.workshop;
  return CATEGORY_PILL.client;
}

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06 }}
      className={CARD_CLASS}
    >
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">{project.title}</h3>
        <span className={getCategoryPillClass(project.category)}>{project.category}</span>
      </div>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">{project.description}</p>
      {project.tech.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="inline-flex items-center rounded-md bg-zinc-100 dark:bg-zinc-700/50 px-2 py-0.5 text-xs font-medium text-zinc-700 dark:text-zinc-300"
            >
              {t}
            </span>
          ))}
        </div>
      )}
    </motion.article>
  );
}

export function Projects() {
  return (
    <section id="projects" className="section-pad bg-zinc-100 dark:bg-zinc-900/30">
      <div className="container-narrow">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-10"
        >
          Projects & client work
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
