import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { useLocale } from "@/hooks/useLocale";
import { SECTION_CARD_BASE, IFRAME_ALLOW } from "@/lib/constants";

type TextOnlyHobby = { title: string; detail: string; placeholder: string };

export function Hobbies() {
  const { t } = useLocale();
  const hobbies = t.hobbies;
  /** Vertical (portrait) media - guitar video & fitness/salsa photos */
  const VERTICAL_MEDIA = hobbies.filter(
    (h) => (h.placeholder === "video" && "embedUrl" in h) || (h.placeholder === "image" && "imageSrc" in h)
  );
  /** Other hobby cards (no media) */
  const OTHER_HOBBIES: TextOnlyHobby[] = hobbies.filter(
    (h) => (h as { placeholder: string }).placeholder === "none"
  ) as TextOnlyHobby[];

  return (
    <section id="hobbies" className="section-pad py-10 sm:py-12 lg:py-14">
      <div className="container-narrow">
        <SectionHeading className="mb-4 sm:mb-5">{t.ui.sections.hobbies}</SectionHeading>
        {/* Three hobby cards: shorter media so section fits in view; 1 col mobile, 2 cols tablet, 3 cols desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 mb-6 sm:mb-8">
          {VERTICAL_MEDIA.map((hobby, i) => (
            <motion.article
              key={hobby.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className={`${SECTION_CARD_BASE} overflow-hidden`}
            >
              <div className="w-full max-w-[240px] sm:max-w-[260px] lg:max-w-none h-[320px] sm:h-[360px] lg:h-[400px] mx-auto bg-zinc-200 dark:bg-zinc-800/60 border-b border-zinc-200 dark:border-zinc-700/50 overflow-hidden">
                {"embedUrl" in hobby && hobby.embedUrl ? (
                  <iframe
                    src={hobby.embedUrl}
                    title={hobby.title}
                    allow={IFRAME_ALLOW}
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
              <div className="p-3 sm:p-4">
                <h3 className="text-base sm:text-lg font-semibold text-zinc-900 dark:text-zinc-100">{hobby.title}</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">{hobby.detail}</p>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Other hobbies: text-only cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {OTHER_HOBBIES.map((hobby, i) => (
            <motion.article
              key={hobby.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (VERTICAL_MEDIA.length + i) * 0.06 }}
              className={`${SECTION_CARD_BASE} p-5 sm:p-6`}
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
