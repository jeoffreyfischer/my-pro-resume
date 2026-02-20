import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GB, FR } from "country-flag-icons/react/3x2";
import { useTheme } from "@/hooks/useTheme";
import { useLocale } from "@/hooks/useLocale";
import type { LocaleData } from "@/locales/types";

type NavLink =
  | { id: string; labelKey: keyof LocaleData["ui"]["nav"] }
  | {
      id: string;
      labelKey: keyof LocaleData["ui"]["nav"];
      children: { id: string; labelKey: "workProjects" | "personalProjects" }[];
    };

const NAV_LINKS: NavLink[] = [
  { id: "intro", labelKey: "intro" },
  { id: "skills", labelKey: "skills" },
  { id: "certifications", labelKey: "certifications" },
  {
    id: "projects",
    labelKey: "projects",
    children: [
      { id: "work-projects", labelKey: "workProjects" },
      { id: "personal-projects", labelKey: "personalProjects" },
    ],
  },
  { id: "journey", labelKey: "journey" },
  { id: "public-videos", labelKey: "videos" },
  { id: "hobbies", labelKey: "hobbies" },
  { id: "contact", labelKey: "contact" },
];

function isDropdown(link: NavLink): link is NavLink & { children: { id: string; labelKey: "workProjects" | "personalProjects" }[] } {
  return "children" in link && Array.isArray(link.children);
}

function SunIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
  );
}

function ChevronDownIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`w-4 h-4 ml-0.5 transition-transform ${open ? "rotate-180" : ""}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}

const FLAG_CLASS = "h-4 w-6 sm:h-5 sm:w-7 rounded-sm border border-zinc-300/80 dark:border-zinc-600/80 object-cover";

const MOBILE_MENU_EXIT_MS = 250;

export function Nav() {
  const [open, setOpen] = useState(false);
  const [projectsOpen, setProjectsOpen] = useState(false);
  const [projectsMobileOpen, setProjectsMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pendingScrollIdRef = useRef<string | null>(null);
  const { theme, toggle } = useTheme();
  const { locale, setLocale, t } = useLocale();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProjectsOpen(false);
      }
    };
    if (projectsOpen) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => document.removeEventListener("click", handleClickOutside);
  }, [projectsOpen]);

  // After mobile menu closes, scroll to the requested section so smooth scroll isn't cancelled by layout
  useEffect(() => {
    if (open) return;
    const id = pendingScrollIdRef.current;
    if (!id) return;
    pendingScrollIdRef.current = null;
    const timeoutId = window.setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      window.history.pushState({}, "", `#${id}`);
    }, MOBILE_MENU_EXIT_MS);
    return () => window.clearTimeout(timeoutId);
  }, [open]);

  const headerBg = scrolled
    ? "bg-white/80 dark:bg-zinc-900/95 dark:border-zinc-700/80 backdrop-blur-md border-b border-zinc-200/80"
    : "";

  const scrollToSection = (id: string) => {
    pendingScrollIdRef.current = id;
    setOpen(false);
    setProjectsMobileOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerBg}`}
    >
      <nav className="container-narrow flex h-14 sm:h-16 items-center justify-between">
        <a
          href="/"
          className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
          aria-label="Back to top"
          onClick={(e) => {
            // Keep SPA feel: go to root and ensure we're at top.
            // (If hosted under a sub-path, "/" will still resolve correctly with proper base.)
            e.preventDefault();
            window.history.pushState({}, "", "/");
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
          }}
        >
          JF
        </a>

        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) =>
            isDropdown(link) ? (
              <div key={link.id} ref={dropdownRef} className="relative">
                <button
                  type="button"
                  onClick={() => setProjectsOpen((o) => !o)}
                  aria-expanded={projectsOpen}
                  aria-haspopup="true"
                  aria-controls="projects-dropdown"
                  id="projects-menu-button"
                  className="inline-flex items-center px-3 py-2 text-sm text-zinc-600 dark:text-zinc-200 hover:text-zinc-900 dark:hover:text-white transition-colors rounded-md cursor-pointer"
                >
                  {t.ui.nav[link.labelKey]}
                  <ChevronDownIcon open={projectsOpen} />
                </button>
                <AnimatePresence>
                  {projectsOpen && (
                    <motion.div
                      id="projects-dropdown"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="projects-menu-button"
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-1 py-1 min-w-[10rem] rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 shadow-lg z-50"
                    >
                      {link.children.map((child) => (
                        <a
                          key={child.id}
                          href={`#${child.id}`}
                          role="menuitem"
                          onClick={() => {
                            setProjectsOpen(false);
                          }}
                          className="block px-3 py-2 text-sm text-zinc-600 dark:text-zinc-200 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 first:rounded-t-md last:rounded-b-md cursor-pointer"
                        >
                          {t.ui.nav[child.labelKey]}
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <a
                key={link.id}
                href={`#${link.id}`}
                className="px-3 py-2 text-sm text-zinc-600 dark:text-zinc-200 hover:text-zinc-900 dark:hover:text-white transition-colors rounded-md"
              >
                {t.ui.nav[link.labelKey]}
              </a>
            )
          )}
          <div className="flex items-center gap-0.5 ml-1" role="group" aria-label="Language">
            <button
              type="button"
              onClick={() => setLocale("en")}
              aria-label={t.ui.nav.switchToEnglish}
              aria-current={locale === "en" ? "true" : undefined}
              className={`p-1.5 rounded-md transition-colors cursor-pointer ${locale === "en" ? "ring-2 ring-blue-500 dark:ring-blue-400 bg-zinc-100 dark:bg-zinc-800" : "hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"}`}
            >
              <GB className={FLAG_CLASS} aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => setLocale("fr")}
              aria-label={t.ui.nav.switchToFrench}
              aria-current={locale === "fr" ? "true" : undefined}
              className={`p-1.5 rounded-md transition-colors cursor-pointer ${locale === "fr" ? "ring-2 ring-blue-500 dark:ring-blue-400 bg-zinc-100 dark:bg-zinc-800" : "hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"}`}
            >
              <FR className={FLAG_CLASS} aria-hidden />
            </button>
          </div>
          <button
            type="button"
            onClick={toggle}
            aria-label={theme === "dark" ? t.ui.nav.switchToLight : t.ui.nav.switchToDark}
            className="ml-1 p-2 rounded-lg text-zinc-600 dark:text-zinc-200 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>

        <div className="flex md:hidden items-center gap-1">
          <div className="flex items-center gap-0.5" role="group" aria-label="Language">
            <button
              type="button"
              onClick={() => setLocale("en")}
              aria-label={t.ui.nav.switchToEnglish}
              aria-current={locale === "en" ? "true" : undefined}
              className={`p-1.5 rounded-md transition-colors cursor-pointer ${locale === "en" ? "ring-2 ring-blue-500 dark:ring-blue-400 bg-zinc-100 dark:bg-zinc-800" : "hover:bg-zinc-100 dark:hover:bg-zinc-800"}`}
            >
              <GB className={FLAG_CLASS} aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => setLocale("fr")}
              aria-label={t.ui.nav.switchToFrench}
              aria-current={locale === "fr" ? "true" : undefined}
              className={`p-1.5 rounded-md transition-colors cursor-pointer ${locale === "fr" ? "ring-2 ring-blue-500 dark:ring-blue-400 bg-zinc-100 dark:bg-zinc-800" : "hover:bg-zinc-100 dark:hover:bg-zinc-800"}`}
            >
              <FR className={FLAG_CLASS} aria-hidden />
            </button>
          </div>
          <button
            type="button"
            onClick={toggle}
            aria-label={theme === "dark" ? t.ui.nav.switchToLight : t.ui.nav.switchToDark}
            className="p-2 rounded-lg text-zinc-600 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>
          <button
            type="button"
            aria-label={t.ui.nav.toggleMenu}
            aria-expanded={open}
            onClick={() => {
              setOpen((o) => !o);
              if (open) setProjectsMobileOpen(false);
            }}
            className="p-2 rounded-lg text-zinc-600 dark:text-zinc-200 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden border-t border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 pointer-events-auto"
          >
            <ul className="container-narrow py-4 flex flex-col gap-1">
              {NAV_LINKS.map((link) =>
                isDropdown(link) ? (
                  <li key={link.id}>
                    <button
                      type="button"
                      onClick={() => setProjectsMobileOpen((o) => !o)}
                      aria-expanded={projectsMobileOpen}
                      aria-controls="projects-mobile-submenu"
                      className="flex items-center justify-between w-full px-3 py-2.5 text-zinc-600 dark:text-zinc-200 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg text-left cursor-pointer"
                    >
                      {t.ui.nav[link.labelKey]}
                      <ChevronDownIcon open={projectsMobileOpen} />
                    </button>
                    <AnimatePresence>
                      {projectsMobileOpen && (
                        <motion.ul
                          id="projects-mobile-submenu"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden pl-3 mt-1 flex flex-col gap-0.5"
                        >
                          {link.children.map((child) => (
                            <li key={child.id}>
                              <button
                                type="button"
                                onClick={() => scrollToSection(child.id)}
                                className="block w-full text-left px-3 py-2 text-sm text-zinc-600 dark:text-zinc-200 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg cursor-pointer"
                              >
                                {t.ui.nav[child.labelKey]}
                              </button>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </li>
                ) : (
                  <li key={link.id}>
                    <button
                      type="button"
                      onClick={() => scrollToSection(link.id)}
                      className="block w-full text-left px-3 py-2.5 text-zinc-600 dark:text-zinc-200 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg cursor-pointer"
                    >
                      {t.ui.nav[link.labelKey]}
                    </button>
                  </li>
                )
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
