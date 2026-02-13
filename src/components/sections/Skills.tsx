import { motion } from "framer-motion";
import { OrbitingCircles } from "@/components/ui/orbiting-circles";
import { skills } from "@/data/resume";

/* Single source of truth: the 6 logos in the orbit (public/images) */
const ORBIT_LOGOS: Array<{ label: string; logoSrc: string }> = [
  { label: ".NET", logoSrc: "/images/logo-dotnet.png" },
  { label: "Angular", logoSrc: "/images/logo-angular.png" },
  { label: "Azure", logoSrc: "/images/logo-azure.png" },
  { label: "Scrum Master", logoSrc: "/images/logo-scrum.png" },
  { label: "Cursor", logoSrc: "/images/logo-cursor.webp" },
  { label: "Matlab", logoSrc: "/images/logo-matlab.png" },
];

function isStrongSkill(item: string): boolean {
  return ORBIT_LOGOS.some(({ label }) => item === label || item.startsWith(label));
}

const CARD_CLASS =
  "rounded-xl border border-zinc-200 dark:border-zinc-700/50 bg-white dark:bg-zinc-800/30 p-4 sm:p-5 hover:border-zinc-300 dark:hover:border-zinc-600/50 transition-colors shadow-sm dark:shadow-none";

/* Grid positions around the orbit: 2 above, 2 left/right, 2 below (md and up) */
const ORBIT_GRID_POSITIONS: Array<{ row: number; col: number; align: string }> = [
  { row: 1, col: 1, align: "justify-self-center self-end" },
  { row: 1, col: 3, align: "justify-self-center self-end" },
  { row: 2, col: 1, align: "justify-self-end self-center" },
  { row: 2, col: 3, align: "justify-self-start self-center" },
  { row: 3, col: 1, align: "justify-self-center self-start" },
  { row: 3, col: 3, align: "justify-self-center self-start" },
];

function SkillCard({
  group,
  index,
  className,
  style,
}: {
  group: (typeof skills)[number];
  index: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className={className}
      style={style}
    >
      <div className={`${CARD_CLASS} max-w-[200px] md:max-w-[220px] lg:max-w-[240px] min-w-0`}>
        <h3 className="text-base font-semibold text-blue-600 dark:text-blue-400 mb-3">{group.category}</h3>
        <ul className="flex flex-wrap gap-2">
          {group.items.map((item) => {
            const strong = isStrongSkill(item);
            return (
              <li
                key={item}
                className={
                  strong
                    ? "text-base font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-950/50 border border-blue-300/60 dark:border-blue-700/50 px-3 py-1.5 rounded-md"
                    : "text-base text-zinc-600 dark:text-zinc-300 bg-zinc-200/80 dark:bg-zinc-700/40 px-3 py-1.5 rounded-md"
                }
              >
                {item}
              </li>
            );
          })}
        </ul>
      </div>
    </motion.div>
  );
}

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

        {/* Mobile/tablet: orbit on top, then 2-col grid of cards */}
        <div className="md:hidden space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative mx-auto flex size-[280px] sm:size-[340px] items-center justify-center"
          >
            <OrbitingCircles
              radius={120}
              duration={24}
              path
              iconSize={44}
              className="size-11 sm:size-12 rounded-full border-2 border-zinc-200 dark:border-zinc-600 bg-white dark:bg-zinc-800 shadow-md dark:shadow-none"
            >
              {ORBIT_LOGOS.map(({ label, logoSrc }) => (
                <div
                  key={label}
                  className="flex size-full items-center justify-center rounded-full bg-white dark:bg-zinc-800"
                  title={label}
                >
                  <img src={logoSrc} alt="" className="size-6 sm:size-7 object-contain" aria-hidden />
                </div>
              ))}
            </OrbitingCircles>
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-2xl sm:text-3xl font-semibold text-zinc-400 dark:text-zinc-500">SKILLS</span>
            </div>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {skills.map((group, i) => (
              <SkillCard key={group.category} group={group} index={i} className="[&>div]:max-w-none" />
            ))}
          </div>
        </div>

        {/* Desktop: cards around the circle (2 above, 2 left/right, 2 below) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="hidden md:grid gap-4 lg:gap-6 items-center justify-items-center"
          style={{
            gridTemplateColumns: "minmax(0,1fr) auto minmax(0,1fr)",
            gridTemplateRows: "minmax(0,1fr) auto minmax(0,1fr)",
            maxWidth: "min(100%, 900px)",
            marginLeft: "auto",
            marginRight: "auto",
            minHeight: "520px",
          }}
        >
          {skills.map((group, i) => (
            <SkillCard
              key={group.category}
              group={group}
              index={i}
              className={ORBIT_GRID_POSITIONS[i].align}
              style={{
                gridRow: ORBIT_GRID_POSITIONS[i].row,
                gridColumn: ORBIT_GRID_POSITIONS[i].col,
              }}
            />
          ))}
          <div
            className="relative flex size-[340px] lg:size-[400px] items-center justify-center"
            style={{ gridRow: 2, gridColumn: 2 }}
          >
            <OrbitingCircles
              radius={120}
              duration={24}
              path
              iconSize={44}
              className="size-11 sm:size-12 rounded-full border-2 border-zinc-200 dark:border-zinc-600 bg-white dark:bg-zinc-800 shadow-md dark:shadow-none"
            >
              {ORBIT_LOGOS.map(({ label, logoSrc }) => (
                <div
                  key={label}
                  className="flex size-full items-center justify-center rounded-full bg-white dark:bg-zinc-800"
                  title={label}
                >
                  <img src={logoSrc} alt="" className="size-6 sm:size-7 object-contain" aria-hidden />
                </div>
              ))}
            </OrbitingCircles>
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-2xl sm:text-3xl font-semibold text-zinc-400 dark:text-zinc-500">SKILLS</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
