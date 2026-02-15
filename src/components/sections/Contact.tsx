import { motion } from "framer-motion";
import { SiGithub, SiGooglescholar, SiLinkedin, SiYoutube } from "react-icons/si";
import { site } from "@/data/resume";

export function Contact() {
  return (
    <section id="contact" className="section-pad bg-zinc-100 dark:bg-zinc-900/30">
      <div className="container-narrow">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-6"
        >
          Contact
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-zinc-600 dark:text-zinc-400 mb-8 max-w-xl"
        >
          Open to opportunities and collaboration. Get in touch.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-4"
        >
          <a
            href={site.links.email}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium transition-colors"
          >
            Email
          </a>
          <a
            href={site.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-transparent text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 font-medium transition-colors"
          >
            <SiLinkedin className="size-5 shrink-0" aria-hidden />
            LinkedIn
          </a>
          <a
            href={site.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-transparent text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 font-medium transition-colors"
          >
            <SiGithub className="size-5 shrink-0" aria-hidden />
            GitHub
          </a>
          <a
            href={site.links.professionalProfile}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-transparent text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 font-medium transition-colors"
          >
            <img src="/images/ssw-logo.svg" alt="" className="size-5 shrink-0" aria-hidden />
            SSW profile
          </a>
          <a
            href={site.links.publicVideos}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-transparent text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 font-medium transition-colors"
          >
            <SiYoutube className="size-5 shrink-0" aria-hidden />
            Public videos
          </a>
          <a
            href={site.links.publications}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-transparent text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 font-medium transition-colors"
          >
            <SiGooglescholar className="size-5 shrink-0" aria-hidden />
            Publications
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 text-sm text-zinc-500"
        >
          {site.location}
        </motion.p>
      </div>
    </section>
  );
}
