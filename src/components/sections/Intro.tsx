import { motion } from "framer-motion";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { AU, FR } from "country-flag-icons/react/3x2";
import { Confetti } from "@/components/ui/confetti";
import { Highlight } from "@/components/ui/hero-highlight";
import { SkyCloudsBackground } from "@/components/ui/sky-clouds-background";
import { StarsBackground } from "@/components/ui/stars-background";
import { site } from "@/data/resume";
import { useTheme } from "@/hooks/useTheme";
import { BTN_PRIMARY, BTN_SECONDARY } from "@/lib/constants";
import { cn } from "@/lib/utils";

/** Intro background colors so theme switch has no flash (section + base layer match theme) */
const INTRO_BG_DARK = "bg-[#0f172a]";
const INTRO_BG_LIGHT = "bg-background";

export function Intro() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [summaryBefore, summaryAfter] = site.summary.split("problem solving");
  const [specialtyBefore, specialtyAfter] = site.specialty.split(".NET");
  const [passionBefore, passionAfter] = site.passion.split("Scrum");

  return (
    <section
      id="intro"
      className={cn(
        "relative flex min-h-screen min-h-[100dvh] w-full flex-col justify-center overflow-hidden py-12 sm:py-16 lg:py-20",
        isDark ? INTRO_BG_DARK : INTRO_BG_LIGHT
      )}
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Base layer: correct theme color so switching never shows wrong background */}
        <div
          className={cn("absolute inset-0", isDark ? INTRO_BG_DARK : INTRO_BG_LIGHT)}
          aria-hidden
        />
        {isDark && <StarsBackground className="size-full" shootingStars={false} />}
        {!isDark && <SkyCloudsBackground className="size-full" />}
        {/* Single Confetti instance so it only fires on initial load, not when switching theme */}
        <div className="absolute inset-0 z-[1]">
          <Confetti
            className="size-full block"
            style={{ width: "100%", height: "100%", minHeight: "100%" }}
            options={{
              particleCount: 80,
              spread: 70,
              origin: { x: 0.5, y: 0.4 },
              startVelocity: 30,
            }}
          />
        </div>
      </div>
      <div className="container-narrow relative z-10">
        <div className="flex flex-col lg:grid lg:grid-cols-[18rem_1fr] xl:grid-cols-[20rem_1fr] 2xl:grid-cols-[22rem_1fr] lg:items-stretch lg:gap-16 xl:gap-20 2xl:gap-24 gap-10">
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
              className="profile-photo-shape w-40 h-40 sm:w-52 sm:h-52 lg:flex-1 lg:min-h-0 lg:w-full object-cover object-[50%_8%] lg:object-top border-2 border-zinc-300 dark:border-zinc-700/50"
            />
          </motion.div>

          <div className="flex-1 lg:min-h-0">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-2 flex flex-wrap items-center gap-x-2 gap-y-1"
            >
              <span>{site.location}</span>
              {"citizenship" in site && site.citizenship && (
                <>
                  <span className="text-zinc-400 dark:text-zinc-500" aria-hidden>·</span>
                  <span>{site.citizenship}</span>
                  <span className="inline-flex items-center gap-1 shrink-0" aria-hidden title="France, Australia">
                    <FR className="h-3.5 w-auto rounded-sm border border-zinc-300/80 dark:border-zinc-600/80" title="France" />
                    <AU className="h-3.5 w-auto rounded-sm border border-zinc-300/80 dark:border-zinc-600/80" title="Australia" />
                  </span>
                </>
              )}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="text-3xl sm:text-4xl lg:text-5xl 2xl:text-6xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight"
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
                className={BTN_PRIMARY}
                aria-label="Contact by email (opens in new tab)"
              >
                Contact
              </a>
              <a
                href={site.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className={BTN_SECONDARY}
                aria-label="GitHub (opens in new tab)"
              >
                <SiGithub className="size-5 shrink-0" aria-hidden />
                GitHub
              </a>
              <a
                href={site.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={BTN_SECONDARY}
                aria-label="LinkedIn (opens in new tab)"
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
