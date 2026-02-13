import { motion } from "framer-motion";
import { MagicCard } from "@/components/ui/magic-card";
import { useTheme } from "@/hooks/useTheme";
import { projects, certifications } from "@/data/resume";

export function Projects() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {certifications.map((cert, i) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <MagicCard
                  className="rounded-xl border border-zinc-200 dark:border-zinc-700/50 overflow-hidden h-full"
                  gradientColor={isDark ? "rgba(255,255,255,0.12)" : "oklch(0.95 0 0 / 0.5)"}
                  gradientFrom={isDark ? "#60a5fa" : "#3b82f6"}
                  gradientTo={isDark ? "#a78bfa" : "#8b5cf6"}
                >
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-3 p-5 min-h-[120px] justify-center text-center hover:opacity-95 transition-opacity"
                  >
                    {cert.logoSrc && (
                      <img
                        src={cert.logoSrc}
                        alt=""
                        className="size-14 sm:size-16 object-contain shrink-0"
                        aria-hidden
                      />
                    )}
                    <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300 leading-tight">
                      {cert.name}
                    </span>
                  </a>
                </MagicCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
