import { CardStack } from "@/components/ui/card-stack";
import { MagicCard, MAGIC_CARD_DARK_PROPS, MAGIC_CARD_OVERLAY_CLASS } from "@/components/ui/magic-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { useTheme } from "@/hooks/useTheme";
import { projects } from "@/data/resume";
import { cn } from "@/lib/utils";
import { SECTION_CARD_BASE } from "@/lib/constants";

const CARD_CLASS = `${SECTION_CARD_BASE} p-5 sm:p-6`;

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

function ProjectCardTitleStrip({ project }: { project: (typeof projects)[number] }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
      <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">{project.title}</h3>
      <span className={getCategoryPillClass(project.category)}>{project.category}</span>
    </div>
  );
}

function ProjectCardBody({ project }: { project: (typeof projects)[number] }) {
  return (
    <>
      <ProjectCardTitleStrip project={project} />
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

/** Renders project card content for CardStack. When isExpanded is false, only title + category. */
function renderProjectCard(
  project: (typeof projects)[number],
  isDark: boolean,
  isExpanded: boolean
) {
  const body = isExpanded ? (
    <ProjectCardBody project={project} />
  ) : (
    <ProjectCardTitleStrip project={project} />
  );
  return isDark ? (
    <MagicCard {...MAGIC_CARD_DARK_PROPS} className={cn(MAGIC_CARD_DARK_PROPS.className, "h-full")}>
      <div className={MAGIC_CARD_OVERLAY_CLASS} aria-hidden />
      <div className="relative z-10 p-5 sm:p-6 h-full flex flex-col">{body}</div>
    </MagicCard>
  ) : (
    <article className={`${CARD_CLASS} h-full flex flex-col`}>{body}</article>
  );
}

const internalProjects = projects.filter((p) =>
  p.category.toLowerCase().includes("internal")
);
const clientProjects = projects.filter((p) => p.category.toLowerCase().includes("client"));
const workshopProjects = projects.filter((p) => p.category.toLowerCase().includes("workshop"));

export function WorkProjects() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div id="work-projects">
      <SectionHeading as="h3" className="mb-8">
        Work Projects
      </SectionHeading>

      {/* 3 piles: Client | Internal | Workshop. md: 2 cols (Client | Internal+Workshop). lg: 3 cols. */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-6 items-start">
        <section className="min-w-0" aria-label="Client projects">
          <CardStack
            items={clientProjects}
            itemLabel="Client project"
            renderCard={(project, _i, isExpanded) => renderProjectCard(project, isDark, isExpanded)}
          />
        </section>

        <div className="flex flex-col gap-8 lg:contents min-w-0">
          <section className="min-w-0" aria-label="Internal projects">
            <CardStack
              items={internalProjects}
              itemLabel="Internal project"
              renderCard={(project, _i, isExpanded) => renderProjectCard(project, isDark, isExpanded)}
            />
          </section>

          <section className="min-w-0" aria-label="Workshop projects">
            <CardStack
              items={workshopProjects}
              itemLabel="Workshop"
              renderCard={(project, _i, isExpanded) => renderProjectCard(project, isDark, isExpanded)}
            />
          </section>
        </div>
      </div>
    </div>
  );
}
