import { motion } from "framer-motion";
import { HiArrowTopRightOnSquare } from "react-icons/hi2";
import { site } from "@/data/resume";

const VIDEOS: { id: string; title: string }[] = [
  { id: "IwvCTwz0C7M", title: "Do you share secrets securely?" },
  { id: "-0PUveZg3wk", title: "3 tips to a clean Sprint board" },
  { id: "K-YUqVTyU3k", title: "SSW TimePro - Create a new tenant" },
  { id: "IjsXSMOAMCA", title: "Do you know to stretch when working at a desk?" },
];

const IFRAME_CLASS = "w-full h-full";
const IFRAME_ALLOW =
  "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";

export function PublicVideos() {
  return (
    <section id="public-videos" className="section-pad">
      <div className="container-narrow">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-6"
        >
          Public videos
        </motion.h2>
        {/* Responsive grid: 1 col mobile, 2 cols sm+ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8">
          {VIDEOS.map((video, i) => (
            <motion.figure
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="min-w-0"
            >
              <div className="aspect-video w-full rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-700/50 bg-zinc-50 dark:bg-zinc-800/80 shadow-sm">
                <iframe
                  src={`https://www.youtube.com/embed/${video.id}`}
                  title={video.title}
                  allow={IFRAME_ALLOW}
                  allowFullScreen
                  className={IFRAME_CLASS}
                />
              </div>
              <figcaption className="mt-2 text-base font-bold text-zinc-700 dark:text-zinc-300">
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
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-lg font-medium text-zinc-700 dark:text-zinc-300 bg-zinc-50 dark:bg-zinc-800/30 border border-zinc-200 dark:border-zinc-700/50 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 hover:border-zinc-300 dark:hover:border-zinc-600/50 transition-colors"
          >
            Watch full playlist
            <HiArrowTopRightOnSquare className="size-6 shrink-0" aria-hidden />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
