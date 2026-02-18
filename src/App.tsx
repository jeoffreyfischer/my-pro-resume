import { Nav } from "@/components/Nav";
import { Intro } from "@/components/sections/Intro";
import { Skills } from "@/components/sections/Skills";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { Certifications } from "@/components/sections/Certifications";
import { Journey } from "@/components/sections/Journey";
import { PublicVideos } from "@/components/sections/PublicVideos";
import { Hobbies } from "@/components/sections/Hobbies";
import { Contact } from "@/components/sections/Contact";

const SECTION_ALTERNATE_BG = "bg-sky-50 dark:bg-zinc-900/30";

const SECTIONS = [
  Intro,
  Skills,
  Certifications,
  ProjectsSection,
  Journey,
  PublicVideos,
  Hobbies,
  Contact,
];

function App() {
  const handleSkipToContent = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const main = document.getElementById("main-content");
    if (main) {
      e.preventDefault();
      main.focus({ preventScroll: true });
      main.scrollIntoView();
    }
  };

  return (
    <div className="min-h-screen">
      <a
        href="#main-content"
        className="skip-link"
        onClick={handleSkipToContent}
      >
        Skip to content
      </a>
      <Nav />
      <main id="main-content" tabIndex={-1}>
        {SECTIONS.map((Section, index) => (
          <div
            key={Section.name}
            className={
              index === 3
                ? undefined
                : [2, 5, 7].includes(index)
                  ? SECTION_ALTERNATE_BG
                  : undefined
            }
          >
            <Section />
          </div>
        ))}
      </main>
      <footer className="border-t border-zinc-200 dark:border-zinc-800/50 py-8">
        <div className="container-narrow text-center text-sm text-zinc-500">
          © {new Date().getFullYear()} {import.meta.env.VITE_SITE_NAME ?? "Jeoffrey Fischer"}
        </div>
      </footer>
    </div>
  );
}

export default App;
