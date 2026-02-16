import { motion } from "framer-motion";
import { BentoGrid } from "@/components/ui/bento-grid";
import { MagicCard, MAGIC_CARD_DARK_PROPS, MAGIC_CARD_OVERLAY_CLASS } from "@/components/ui/magic-card";
import { useTheme } from "@/hooks/useTheme";
import { projects } from "@/data/resume";

const CARD_CLASS =
  "rounded-xl border border-zinc-200 dark:border-zinc-700/50 bg-zinc-50 dark:bg-zinc-800/30 p-5 sm:p-6 hover:border-zinc-300 dark:hover:border-zinc-600/50 transition-colors shadow-sm dark:shadow-none";

const CATEGORY_PILL: Record<string, string> = {
  internal:
    "inline-flex shrink-0 text-xs font-medium px-2.5 py-1 rounded-md border text-red-700 dark:text-red-300 bg-red-100 dark:bg-red-950/50 border-red-200 dark:border-red-800/50",
  workshop:
    "inline-flex shrink-0 text-xs font-medium px-2.5 py-1 rounded-md border text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-950/50 border-blue-300/60 dark:border-blue-700/50",
  client:
    "inline-flex shrink-0 text-xs font-medium px-2.5 py-1 rounded-md border text-green-700 dark:text-green-300 bg-green-100 dark:bg-green-950/50 border-green-200 dark:border-green-800/50",
};

function isShortContent(project: (typeof projects)[number]): boolean {
  return (
    project.description.length <= 55 ||
    (project.description.length <= 75 && project.tech.length <= 4)
  );
}

/** Internal: one row, all same width (3-col grid, each col-span-1). */
function getInternalSpan(): string {
  return "lg:col-span-1";
}

/** Client: uniform width (all same size). */
function getClientSpan(): string {
  return "lg:col-span-1";
}

/** Workshop: single row, content-based. */
function getWorkshopSpan(project: (typeof projects)[number]): string {
  return isShortContent(project) ? "lg:col-span-1" : "lg:col-span-2";
}

function getCategoryPillClass(category: string): string {
  const c = category.toLowerCase();
  if (c.includes("internal")) return CATEGORY_PILL.internal;
  if (c.includes("workshop")) return CATEGORY_PILL.workshop;
  return CATEGORY_PILL.client;
}

function ProjectCardBody({ project }: { project: (typeof projects)[number] }) {
  return (
    <>
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
    </>
  );
}

function ProjectCard({
  project,
  index,
  gridSpan = "",
  isDark,
}: {
  project: (typeof projects)[number];
  index: number;
  gridSpan?: string;
  isDark: boolean;
}) {
  const body = <ProjectCardBody project={project} />;
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className={gridSpan}
    >
      {isDark ? (
        <MagicCard {...MAGIC_CARD_DARK_PROPS}>
          <div className={MAGIC_CARD_OVERLAY_CLASS} aria-hidden />
          <div className="relative z-10 p-5 sm:p-6">{body}</div>
        </MagicCard>
      ) : (
        <article className={CARD_CLASS}>{body}</article>
      )}
    </motion.div>
  );
}

const internalProjects = projects.filter((p) =>
  p.category.toLowerCase().includes("internal")
);
const clientProjects = projects.filter((p) => p.category.toLowerCase().includes("client"));
const workshopProjects = projects.filter((p) => p.category.toLowerCase().includes("workshop"));

export function Projects() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const clientIndexStart = internalProjects.length;
  const workshopIndexStart = clientIndexStart + clientProjects.length;
  return (
    <section id="projects" className="section-pad bg-zinc-100 dark:bg-zinc-900/30">
      <div className="container-narrow">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-10"
        >
          Projects, Clients & Workshops
        </motion.h2>

        <div className="space-y-8 sm:space-y-10">
          {/* Internal: all on one row, similar width (3-col grid) */}
          <BentoGrid className="lg:grid-cols-3">
            {internalProjects.map((project, i) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={i}
                gridSpan={getInternalSpan()}
                isDark={isDark}
              />
            ))}
          </BentoGrid>

          {/* Client: several rows */}
          <BentoGrid>
            {clientProjects.map((project, i) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={clientIndexStart + i}
                gridSpan={getClientSpan()}
                isDark={isDark}
              />
            ))}
          </BentoGrid>

          {/* Workshop: new line */}
          <BentoGrid>
            {workshopProjects.map((project, i) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={workshopIndexStart + i}
                gridSpan={getWorkshopSpan(project)}
                isDark={isDark}
              />
            ))}
          </BentoGrid>
        </div>
      </div>
    </section>
  );
}
