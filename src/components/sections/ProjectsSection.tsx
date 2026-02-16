import { WorkProjects } from "@/components/sections/Projects";
import { PersonalProjects } from "@/components/sections/PersonalProjects";
import { SectionHeading } from "@/components/ui/section-heading";

export function ProjectsSection() {
  return (
    <section id="projects" className="section-pad">
      <div className="container-narrow">
        <SectionHeading className="mb-10">Projects</SectionHeading>

        <WorkProjects />
        <div className="mt-14 sm:mt-16" />
        <PersonalProjects />
      </div>
    </section>
  );
}
