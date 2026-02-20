import { WorkProjects } from "@/components/sections/Projects";
import { PersonalProjects } from "@/components/sections/PersonalProjects";
import { SectionHeading } from "@/components/ui/section-heading";
import { useLocale } from "@/hooks/useLocale";

const SECTION_ALTERNATE_BG = "bg-sky-50 dark:bg-zinc-900/30";

export function ProjectsSection() {
  const { t } = useLocale();
  return (
    <section id="projects">
      {/* Work Projects: white */}
      <div>
        <div className="section-pad">
          <div className="container-narrow">
            <SectionHeading className="mb-10">{t.ui.sections.projects}</SectionHeading>
            <WorkProjects />
          </div>
        </div>
      </div>
      {/* Personal Projects: blue */}
      <div className={SECTION_ALTERNATE_BG}>
        <div className="section-pad pt-0 mt-14 sm:mt-16">
          <div className="container-narrow">
            <PersonalProjects />
          </div>
        </div>
      </div>
    </section>
  );
}
