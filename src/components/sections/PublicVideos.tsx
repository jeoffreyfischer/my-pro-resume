import { motion } from "framer-motion";

export function PublicVideos() {
  return (
    <section id="public-videos" className="section-pad bg-zinc-100 dark:bg-zinc-900/30">
      <div className="container-narrow">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-6"
        >
          Public videos
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-zinc-600 dark:text-zinc-400 mb-8 max-w-xl"
        >
          Talks, demos, and other public content. Check out my YouTube Playlist below.
        </motion.p>

        {/* YouTube playlist embed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="aspect-video w-full max-w-3xl mx-auto rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-700/50 bg-zinc-50 dark:bg-zinc-800/80 shadow-sm"
        >
          <iframe
            src="https://www.youtube.com/embed/fGVnV1yX4Ts?list=PLpiOR7CBNvlqbUE95zfRuNDodbZI3aEJW"
            title="Public videos playlist"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full"
          />
        </motion.div>
      </div>
    </section>
  );
}
