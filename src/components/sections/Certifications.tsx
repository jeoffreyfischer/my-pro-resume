import { motion } from "framer-motion";
import { MagicCard } from "@/components/ui/magic-card";
import { useTheme } from "@/hooks/useTheme";
import { certifications } from "@/data/resume";

export function Certifications() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  return (
    <section id="certifications" className="section-pad">
      <div className="container-narrow">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-10"
        >
          Certifications
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {certifications.map((cert, i) => {
            const cardContent = (
              <>
                <div className="absolute inset-0 rounded-[inherit] bg-zinc-50 dark:bg-zinc-800/30 z-0" aria-hidden />
                <a
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative z-10 flex flex-col items-center gap-3 p-5 min-h-[120px] justify-center text-center hover:opacity-95 transition-opacity"
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
              </>
            );
            return (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                {isDark ? (
                  <MagicCard
                    className="rounded-xl border border-zinc-200 dark:border-zinc-700/50 overflow-hidden h-full"
                    gradientColor="rgba(255,255,255,0.12)"
                    gradientFrom="#60a5fa"
                    gradientTo="#a78bfa"
                  >
                    {cardContent}
                  </MagicCard>
                ) : (
                  <div className="relative rounded-xl border border-zinc-200 dark:border-zinc-700/50 overflow-hidden h-full bg-zinc-50 dark:bg-zinc-800/30">
                    {cardContent}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
