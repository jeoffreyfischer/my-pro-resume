import { motion } from "framer-motion";
import { hobbies } from "@/data/resume";

/** Vertical (portrait) media - guitar video & fitness/salsa photos */
const VERTICAL_MEDIA = hobbies.filter(
  (h) => (h.placeholder === "video" && "embedUrl" in h) || (h.placeholder === "image" && "imageSrc" in h)
);

/** Other hobby cards (no media) */
const OTHER_HOBBIES = hobbies.filter((h) => h.placeholder === "none");

export function Hobbies() {
  return (
    <section id="hobbies" className="section-pad">
      <div className="container-narrow">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-6"
        >
          Hobbies
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-zinc-600 dark:text-zinc-400 mb-10 max-w-xl"
        >
          Beyond code: fitness, music, and dance.
        </motion.p>

        {/* Three hobby cards: 1 col mobile, 2 cols tablet, 3 cols desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-10 sm:mb-12">
          {VERTICAL_MEDIA.map((hobby, i) => (
            <motion.article
              key={hobby.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="rounded-xl border border-zinc-200 dark:border-zinc-700/50 bg-zinc-50 dark:bg-zinc-800/30 overflow-hidden hover:border-zinc-300 dark:hover:border-zinc-600/50 transition-colors shadow-sm dark:shadow-none"
            >
              <div className="aspect-[9/16] w-full max-w-[280px] lg:max-w-none mx-auto bg-zinc-200 dark:bg-zinc-800/60 border-b border-zinc-200 dark:border-zinc-700/50 overflow-hidden">
                {"embedUrl" in hobby && hobby.embedUrl ? (
                  <iframe
                    src={hobby.embedUrl}
                    title={hobby.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full object-cover"
                  />
                ) : "imageSrc" in hobby && hobby.imageSrc ? (
                  <img
                    src={hobby.imageSrc}
                    alt={hobby.title}
                    className="w-full h-full object-cover"
                  />
                ) : null}
              </div>
              <div className="p-4 sm:p-5">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">{hobby.title}</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">{hobby.detail}</p>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Other hobbies: text-only cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          {OTHER_HOBBIES.map((hobby, i) => (
            <motion.article
              key={hobby.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (VERTICAL_MEDIA.length + i) * 0.06 }}
              className="rounded-xl border border-zinc-200 dark:border-zinc-700/50 bg-zinc-50 dark:bg-zinc-800/30 p-5 sm:p-6 hover:border-zinc-300 dark:hover:border-zinc-600/50 transition-colors shadow-sm dark:shadow-none"
            >
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">{hobby.title}</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">{hobby.detail}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
