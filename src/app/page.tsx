import { Hero } from "@/components/hero/Hero";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Contact } from "@/components/sections/Contact";
import { PhotoBoard } from "@/components/photo-board/PhotoBoard";

// The whole page, top to bottom. Reorder, remove or add sections here.
// A new section also needs an entry in `sections` in src/content/site.ts for its menu button.
export default function Home() {
  return (
    <>
      <Hero />
      <main>
        <About />
        <Projects />
        <Skills />
        <Contact />
        <PhotoBoard />
      </main>
    </>
  );
}
