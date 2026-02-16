import { motion } from "framer-motion";
import { WorkProjects } from "@/components/sections/Projects";
import { PersonalProjects } from "@/components/sections/PersonalProjects";

export function ProjectsSection() {
  return (
    <section id="projects" className="section-pad">
      <div className="container-narrow">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-10"
        >
          Projects
        </motion.h2>

        <WorkProjects />
        <div className="mt-14 sm:mt-16" />
        <PersonalProjects />
      </div>
    </section>
  );
}
