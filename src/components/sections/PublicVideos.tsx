import { motion } from "framer-motion";
import { HiArrowTopRightOnSquare } from "react-icons/hi2";
import { site, publicVideos } from "@/data/resume";
import { SectionHeading } from "@/components/ui/section-heading";

const IFRAME_ALLOW =
  "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";

export function PublicVideos() {
  return (
    <section id="public-videos" className="section-pad py-10 sm:py-12 lg:py-14">
      <div className="container-narrow">
        <SectionHeading className="mb-4 sm:mb-5">Public videos</SectionHeading>
        {/* Grid: 1 col mobile, 2 cols sm+; video height capped so all 4 + captions fit in view */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-5 mb-5 sm:mb-6">
          {publicVideos.map((video, i) => (
            <motion.figure
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="min-w-0"
            >
              <div className="aspect-video w-full max-h-[200px] sm:max-h-[220px] md:max-h-[200px] lg:max-h-[240px] xl:max-h-[26vh] 2xl:max-h-[280px] rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-700/50 bg-zinc-50 dark:bg-zinc-800/80 shadow-sm">
                <iframe
                  src={`https://www.youtube.com/embed/${video.id}`}
                  title={video.title}
                  allow={IFRAME_ALLOW}
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
              <figcaption className="mt-1.5 sm:mt-2 text-sm sm:text-base font-bold text-zinc-700 dark:text-zinc-300 line-clamp-2">
                {video.title}
              </figcaption>
            </motion.figure>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <a
            href={site.links.publicVideos}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-base font-medium text-zinc-700 dark:text-zinc-300 bg-zinc-50 dark:bg-zinc-800/30 border border-zinc-200 dark:border-zinc-700/50 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 hover:border-zinc-300 dark:hover:border-zinc-600/50 transition-colors"
          >
            Watch full playlist
            <HiArrowTopRightOnSquare className="size-6 shrink-0" aria-hidden />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
