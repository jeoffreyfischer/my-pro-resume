import { motion } from "framer-motion";
import { projects, certifications } from "@/data/resume";

export function Projects() {
  return (
    <section id="projects" className="section-pad">
      <div className="container-narrow">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-10"
        >
          Projects & client work
        </motion.h2>
        <div className="grid gap-6 sm:gap-8">
          {projects.map((project, i) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="group rounded-xl border border-zinc-200 dark:border-zinc-700/50 bg-white dark:bg-zinc-800/20 p-5 sm:p-6 hover:border-zinc-300 dark:hover:border-zinc-600/50 transition-colors shadow-sm dark:shadow-none"
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">{project.title}</h3>
                <span className="text-sm text-zinc-500">{project.role}</span>
              </div>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">{project.description}</p>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">Certifications</h3>
          <ul className="flex flex-wrap gap-2">
            {certifications.map((cert) => (
              <li key={cert.name}>
                <a
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50 px-3 py-2 rounded-lg inline-block hover:bg-zinc-200 dark:hover:bg-zinc-700/50 hover:border-zinc-300 dark:hover:border-zinc-600 transition-colors"
                >
                  {cert.name}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
