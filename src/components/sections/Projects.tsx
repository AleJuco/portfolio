import { projects } from "@/content/projects";
import { Reveal } from "@/components/motion/Reveal";
import { Panel } from "@/components/ui/Panel";
import { Chip } from "@/components/ui/Chip";
import { ImageSlot } from "@/components/project/ImageSlot";
import { youtubeThumbnail } from "@/lib/youtube";
import { Section } from "./Section";

// A card per project, each linking to its own page. The image is the project's `thumbnail`,
// else its `cover`, else its YouTube video's thumbnail, else an empty slot.
export function Projects() {
  return (
    <Section id="projects">
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <Reveal as="li" key={project.slug} delay={i * 0.08}>
            <Panel href={`/projects/${project.slug}`} className="flex h-full flex-col gap-3 p-3! pb-5!">
              <ImageSlot
                src={project.thumbnail ?? project.cover ?? (project.video && youtubeThumbnail(project.video))}
                alt=""
                hint={`public/projects/${project.slug}/cover.jpg`}
                aspect="16 / 10"
                sizes="(min-width: 1024px) 24rem, (min-width: 640px) 50vw, 100vw"
                rounded="10px"
              />
              <span className="flex flex-1 flex-col gap-3 px-3 pt-2">
                <span className="text-xl font-medium tracking-tight text-white">{project.title}</span>
                <span className="text-muted">{project.blurb}</span>
                <span className="mt-auto flex flex-wrap gap-2 pt-2">
                  {project.tags.map((tag) => (
                    <Chip key={tag}>{tag}</Chip>
                  ))}
                </span>
                <span className="caption pt-1 text-soft">View project →</span>
              </span>
            </Panel>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
