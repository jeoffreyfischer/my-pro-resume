import { motion } from "framer-motion";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { Confetti } from "@/components/ui/confetti";
import { Highlight } from "@/components/ui/hero-highlight";
import { site } from "@/data/resume";

export function Intro() {
  const [summaryBefore, summaryAfter] = site.summary.split("problem solving");
  const [specialtyBefore, specialtyAfter] = site.specialty.split(".NET");
  const [passionBefore, passionAfter] = site.passion.split("Scrum");

  return (
    <section id="intro" className="section-pad min-h-[90vh] flex flex-col justify-center relative overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Confetti
          className="w-full h-full block"
          style={{ width: "100%", height: "100%", minHeight: "100%" }}
          options={{
            particleCount: 80,
            spread: 70,
            origin: { x: 0.5, y: 0.4 },
            startVelocity: 30,
          }}
        />
      </div>
      <div className="container-narrow relative z-10">
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
              className="profile-photo-shape w-40 h-40 sm:w-52 sm:h-52 lg:flex-1 lg:min-h-0 lg:w-full object-cover object-top border-2 border-zinc-300 dark:border-zinc-700/50"
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
              {summaryBefore}
              <Highlight>problem solving</Highlight>
              {summaryAfter}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.212 }}
              className="mt-4 text-zinc-600 dark:text-zinc-400 leading-relaxed"
            >
              {specialtyBefore}
              <Highlight>.NET</Highlight>
              {specialtyAfter}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.225 }}
              className="mt-4 text-zinc-600 dark:text-zinc-400 leading-relaxed"
            >
              {passionBefore}
              <Highlight>Scrum</Highlight>
              {passionAfter}
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
                <SiGithub className="size-5 shrink-0" aria-hidden />
                GitHub
              </a>
              <a
                href={site.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-600 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 text-sm transition-colors"
              >
                <SiLinkedin className="size-5 shrink-0" aria-hidden />
                LinkedIn
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
