import { motion } from "framer-motion";
import { site } from "@/data/resume";

export function Intro() {
  return (
    <section id="intro" className="section-pad min-h-[90vh] flex flex-col justify-center">
      <div className="container-narrow">
        <div className="flex flex-col lg:grid lg:grid-cols-[18rem_1fr] lg:items-stretch lg:gap-16 gap-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="shrink-0 flex justify-center lg:flex lg:flex-col lg:min-h-0"
          >
            <img
              src="/images/Jeoffrey-Fischer-Profile.jpg"
              alt="Jeoffrey Fischer"
              className="w-40 h-40 sm:w-52 sm:h-52 lg:flex-1 lg:min-h-0 lg:w-full rounded-2xl object-cover object-top border border-zinc-300 dark:border-zinc-700/50"
            />
          </motion.div>

          <div className="flex-1 lg:min-h-0">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-2"
            >
              {site.location}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight"
            >
              {site.name}
              {site.suffix && (
                <span className="text-zinc-500 font-medium text-2xl sm:text-3xl lg:text-4xl ml-2">
                  , {site.suffix}
                </span>
              )}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 mt-1"
            >
              {site.title}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="text-zinc-500 italic mt-2"
            >
              {site.tagline}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-6 text-zinc-600 dark:text-zinc-400 leading-relaxed"
            >
              {site.summary}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <a
                href={site.links.email}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-colors"
              >
                Contact
              </a>
              <a
                href={site.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-600 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 text-sm transition-colors"
              >
                GitHub
              </a>
              <a
                href={site.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-600 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 text-sm transition-colors"
              >
                LinkedIn
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
