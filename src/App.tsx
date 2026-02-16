import { Nav } from "@/components/Nav";
import { Intro } from "@/components/sections/Intro";
import { Skills } from "@/components/sections/Skills";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { Certifications } from "@/components/sections/Certifications";
import { Journey } from "@/components/sections/Journey";
import { PublicVideos } from "@/components/sections/PublicVideos";
import { Hobbies } from "@/components/sections/Hobbies";
import { Contact } from "@/components/sections/Contact";

const SECTION_ALTERNATE_BG = "bg-zinc-100 dark:bg-zinc-900/30";

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
  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        {SECTIONS.map((Section, index) => (
          <div
            key={Section.name}
            className={index % 2 === 1 ? SECTION_ALTERNATE_BG : undefined}
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
