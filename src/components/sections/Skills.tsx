import { motion } from "framer-motion";
import { FaMicrosoft } from "react-icons/fa";
import {
  SiAngular,
  SiDotnet,
  SiNextdotjs,
  SiNodedotjs,
  SiOctopusdeploy,
  SiReact,
  SiTypescript,
} from "react-icons/si";
import { OrbitingCircles } from "@/components/ui/orbiting-circles";
import { skills } from "@/data/resume";

/* Brand colors from Simple Icons / official guidelines; darkColor for icons that are black on light */
const SKILL_ICONS: Array<{
  Icon: typeof SiDotnet;
  label: string;
  color: string;
  darkColor?: string;
}> = [
  { Icon: SiDotnet, label: ".NET", color: "#512BD4" },
  { Icon: SiAngular, label: "Angular", color: "#DD0031" },
  { Icon: SiReact, label: "React", color: "#61DAFB" },
  { Icon: SiNextdotjs, label: "Next.js", color: "#000000", darkColor: "#ffffff" },
  { Icon: SiTypescript, label: "TypeScript", color: "#3178C6" },
  { Icon: SiNodedotjs, label: "Node.js", color: "#339933" },
  { Icon: FaMicrosoft, label: "Azure", color: "#00A4EF" },
  { Icon: SiOctopusdeploy, label: "GitOps", color: "#2F93E0" },
];

export function Skills() {
  return (
    <section id="skills" className="section-pad bg-zinc-100 dark:bg-zinc-900/30">
      <div className="container-narrow">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-10"
        >
          Skills
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative mx-auto mb-12 flex size-[280px] sm:size-[340px] md:size-[400px] items-center justify-center"
        >
          <OrbitingCircles
            radius={120}
            duration={24}
            path
            iconSize={44}
            className="size-11 sm:size-12 rounded-full border-2 border-zinc-200 dark:border-zinc-600 bg-white dark:bg-zinc-800 shadow-md dark:shadow-none"
          >
            {SKILL_ICONS.map(({ Icon, label, color, darkColor }) => (
              <div
                key={label}
                className="flex size-full items-center justify-center rounded-full bg-white dark:bg-zinc-800"
                title={label}
              >
                {darkColor ? (
                  <>
                    <Icon
                      className="size-6 sm:size-7 dark:hidden"
                      style={{ color }}
                      aria-hidden
                    />
                    <Icon
                      className="size-6 sm:size-7 hidden dark:block"
                      style={{ color: darkColor }}
                      aria-hidden
                    />
                  </>
                ) : (
                  <Icon
                    className="size-6 sm:size-7"
                    style={{ color }}
                    aria-hidden
                  />
                )}
              </div>
            ))}
          </OrbitingCircles>
          <div className="absolute flex flex-col items-center justify-center text-center">
            <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Tech stack</span>
            <span className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 sm:text-xl">
              Skills
            </span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {skills.map((group, i) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="rounded-xl border border-zinc-200 dark:border-zinc-700/50 bg-white dark:bg-zinc-800/30 p-5 hover:border-zinc-300 dark:hover:border-zinc-600/50 transition-colors shadow-sm dark:shadow-none"
            >
              <h3 className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-3">{group.category}</h3>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="text-sm text-zinc-600 dark:text-zinc-300 bg-zinc-200/80 dark:bg-zinc-700/40 px-2.5 py-1 rounded-md"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
