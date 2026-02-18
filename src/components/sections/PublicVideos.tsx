import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { HiArrowTopRightOnSquare } from "react-icons/hi2";
import { site, publicVideos } from "@/data/resume";
import { SectionHeading } from "@/components/ui/section-heading";

const IFRAME_ALLOW =
  "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";

function useColumnCount(): 1 | 2 | 3 {
  const [cols, setCols] = useState<1 | 2 | 3>(3);
  useEffect(() => {
    const sm = window.matchMedia("(min-width: 640px)");
    const xl = window.matchMedia("(min-width: 1280px)");
    const update = () => {
      if (xl.matches) setCols(3);
      else if (sm.matches) setCols(2);
      else setCols(1);
    };
    update();
    sm.addEventListener("change", update);
    xl.addEventListener("change", update);
    return () => {
      sm.removeEventListener("change", update);
      xl.removeEventListener("change", update);
    };
  }, []);
  return cols;
}

export function PublicVideos() {
  const [expanded, setExpanded] = useState(false);
  const cols = useColumnCount();
  const collapsedCount = cols === 3 ? publicVideos.length : cols === 2 ? 4 : 3;
  const visibleCount = expanded ? publicVideos.length : collapsedCount;
  const videosToShow = publicVideos.slice(0, visibleCount);
  const canToggle = publicVideos.length > collapsedCount;

  return (
    <section id="public-videos" className="section-pad py-10 sm:py-12 lg:py-14">
      <div className="container-narrow">
        <SectionHeading className="mb-4 sm:mb-5">Public videos</SectionHeading>
        {/* Full-width grid: 1 col mobile, 2 cols sm+, 3 cols xl (~1440px). Left col aligns with section name; embeds capped so they fit video size. */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 lg:gap-5 mb-5 sm:mb-6 w-full">
          {videosToShow.map((video, i) => (
              <motion.figure
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="flex flex-col min-w-0 items-start"
              >
                <div className="w-full max-w-[520px] xl:max-w-[420px] aspect-video rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-700/50 bg-zinc-50 dark:bg-zinc-800/80 shadow-sm">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.id}`}
                    title={video.title}
                    allow={IFRAME_ALLOW}
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
                <figcaption className="mt-1.5 sm:mt-2 text-left text-sm sm:text-base font-bold text-zinc-700 dark:text-zinc-300 line-clamp-2 w-full">
                  {video.title}
                </figcaption>
              </motion.figure>
          ))}
        </div>

        {canToggle && (
          <div className="flex justify-center mb-5 sm:mb-6">
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50 hover:bg-zinc-200 dark:hover:bg-zinc-700/50 transition-colors"
            >
              {expanded ? "See less" : "See more"}
            </button>
          </div>
        )}

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
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-colors shadow-sm"
          >
            Watch full playlist
            <HiArrowTopRightOnSquare className="size-5 shrink-0" aria-hidden />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
