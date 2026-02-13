import { motion } from "framer-motion";
import { OrbitingCircles } from "@/components/ui/orbiting-circles";
import { SkillsOrbitControls } from "@/components/sections/SkillsOrbitControls";
import { skills } from "@/data/resume";
import { useSkillsHighlight } from "@/hooks/useSkillsHighlight";

/* Single source of truth: the 6 logos in the orbit (public/images) */
const ORBIT_LOGOS: Array<{ label: string; logoSrc: string }> = [
  { label: ".NET", logoSrc: "/images/logo-dotnet.png" },
  { label: "Angular", logoSrc: "/images/logo-angular.png" },
  { label: "Azure", logoSrc: "/images/logo-azure.png" },
  { label: "Cursor", logoSrc: "/images/logo-cursor.webp" },
  { label: "Scrum Master", logoSrc: "/images/logo-scrum.png" },
  { label: "Matlab", logoSrc: "/images/logo-matlab.png" },
];

function isStrongSkill(item: string): boolean {
  return ORBIT_LOGOS.some(({ label }) => item === label || item.startsWith(label));
}

function isActiveOrbitSkill(item: string, activeLabel: string): boolean {
  return item === activeLabel || item.startsWith(activeLabel);
}

const CARD_CLASS =
  "rounded-xl border border-zinc-200 dark:border-zinc-700/50 bg-white dark:bg-zinc-800/30 p-4 sm:p-5 hover:border-zinc-300 dark:hover:border-zinc-600/50 transition-colors shadow-sm dark:shadow-none";

/* Desktop: left column = indices 0,2,4; right column = indices 1,3,5 */
const CARD_GAP = "gap-6";

function OrbitItem({
  label,
  logoSrc,
  isActive,
}: {
  label: string;
  logoSrc: string;
  isActive: boolean;
}) {
  return (
    <motion.div
      className="flex size-full items-center justify-center rounded-full bg-white dark:bg-zinc-800"
      title={label}
      animate={{
        scale: isActive ? 1.1 : 1,
        boxShadow: isActive
          ? "0 0 0 3px rgb(234 179 8)"
          : "0 0 0 0px transparent",
      }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <img src={logoSrc} alt="" className="size-6 sm:size-7 object-contain" aria-hidden />
    </motion.div>
  );
}

function SkillCard({
  group,
  index,
  className,
  activeLabel,
}: {
  group: (typeof skills)[number];
  index: number;
  className?: string;
  activeLabel?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className={className}
    >
      <div className={`${CARD_CLASS} max-w-[200px] md:max-w-[220px] lg:max-w-[240px] min-w-0`}>
        <h3 className="text-base font-semibold text-blue-600 dark:text-blue-400 mb-3">{group.category}</h3>
        <ul className="flex flex-wrap gap-2">
          {group.items.map((item) => {
            const strong = isStrongSkill(item);
            const active = activeLabel != null && isActiveOrbitSkill(item, activeLabel);
            return (
              <motion.li
                key={item}
                animate={{
                  scale: active ? 1.08 : 1,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className={
                  active
                    ? "text-base font-semibold text-yellow-900 dark:text-yellow-100 bg-yellow-200 dark:bg-yellow-900/60 border-2 border-yellow-500 dark:border-yellow-400 px-3 py-1.5 rounded-md origin-center"
                    : strong
                      ? "text-base font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-950/50 border-2 border-blue-300/60 dark:border-blue-700/50 px-3 py-1.5 rounded-md origin-center"
                      : "text-base text-zinc-600 dark:text-zinc-300 bg-zinc-200/80 dark:bg-zinc-700/40 border-2 border-transparent px-3 py-1.5 rounded-md origin-center"
                }
              >
                {item}
              </motion.li>
            );
          })}
        </ul>
      </div>
    </motion.div>
  );
}

export function Skills() {
  const highlight = useSkillsHighlight();
  const { activeIndex } = highlight;
  const activeLabel = activeIndex !== null ? ORBIT_LOGOS[activeIndex].label : undefined;

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
          <div className="flex flex-col items-center">
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
                {ORBIT_LOGOS.map(({ label, logoSrc }, i) => (
                  <OrbitItem key={label} label={label} logoSrc={logoSrc} isActive={activeIndex !== null && i === activeIndex} />
                ))}
              </OrbitingCircles>
              <div className="absolute inset-0 flex items-center justify-center text-center pointer-events-none">
                <span className="text-2xl sm:text-3xl font-semibold tracking-[0.12em] text-zinc-400 dark:text-zinc-500">S K I L L S</span>
              </div>
              <div className="absolute left-1/2 top-[54%] -translate-x-1/2 -translate-y-0 pointer-events-auto">
                <SkillsOrbitControls {...highlight} />
              </div>
            </motion.div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {skills.map((group, i) => (
              <SkillCard key={group.category} group={group} index={i} className="[&>div]:max-w-none" activeLabel={activeLabel} />
            ))}
          </div>
        </div>

        {/* Desktop: 2 columns aligned to top, same vertical gap between the 3 cards in each column */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="hidden md:flex items-stretch justify-center gap-4 lg:gap-6 max-w-[900px] mx-auto"
        >
          <div className={`flex flex-col items-end ${CARD_GAP}`}>
            {[skills[0], skills[2], skills[4]].map((group, i) => (
              <SkillCard key={group.category} group={group} index={[0, 2, 4][i]} activeLabel={activeLabel} />
            ))}
          </div>
          <div className="relative flex flex-col items-center justify-center self-stretch min-h-0">
            <div className="relative flex size-[340px] lg:size-[400px] shrink-0 items-center justify-center">
              <OrbitingCircles
                radius={120}
                duration={24}
                path
                iconSize={44}
                className="size-11 sm:size-12 rounded-full border-2 border-zinc-200 dark:border-zinc-600 bg-white dark:bg-zinc-800 shadow-md dark:shadow-none"
              >
                {ORBIT_LOGOS.map(({ label, logoSrc }, i) => (
                  <OrbitItem key={label} label={label} logoSrc={logoSrc} isActive={activeIndex !== null && i === activeIndex} />
                ))}
              </OrbitingCircles>
              <div className="absolute inset-0 flex items-center justify-center text-center pointer-events-none">
                <span className="text-2xl sm:text-3xl font-semibold tracking-[0.12em] text-zinc-400 dark:text-zinc-500">S K I L L S</span>
              </div>
              <div className="absolute left-1/2 top-[54%] -translate-x-1/2 -translate-y-0 pointer-events-auto">
                <SkillsOrbitControls {...highlight} />
              </div>
            </div>
          </div>
          <div className={`flex flex-col items-start ${CARD_GAP} min-h-0`}>
            {[skills[1], skills[3], skills[5]].map((group, i) => (
              <SkillCard key={group.category} group={group} index={[1, 3, 5][i]} activeLabel={activeLabel} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
