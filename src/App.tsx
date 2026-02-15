import { Nav } from "@/components/Nav";
import { Intro } from "@/components/sections/Intro";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Certifications } from "@/components/sections/Certifications";
import { Journey } from "@/components/sections/Journey";
import { PublicVideos } from "@/components/sections/PublicVideos";
import { Hobbies } from "@/components/sections/Hobbies";
import { Contact } from "@/components/sections/Contact";

function App() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <Intro />
        <Skills />
        <Certifications />
        <Projects />
        <Journey />
        <PublicVideos />
        <Hobbies />
        <Contact />
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
