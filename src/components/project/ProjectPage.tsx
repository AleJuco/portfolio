import Link from "next/link";
import { projects, type Project } from "@/content/projects";
import { site } from "@/content/site";
import { Sticker } from "@/components/art/Sticker";
import { Icon } from "@/components/ui/Icon";
import { Chip } from "@/components/ui/Chip";
import { Reveal } from "@/components/motion/Reveal";
import { linkProps } from "@/lib/links";
import { ImageSlot } from "./ImageSlot";
import { VideoEmbed } from "./VideoEmbed";
import styles from "./ProjectPage.module.css";

// One project's page: title and links, video or cover image, write-up beside a facts box, gallery,
// then links to the previous and next projects. All the content comes from src/content/projects.ts.
export function ProjectPage({ project }: { project: Project }) {
  const index = projects.indexOf(project);
  const prev = projects[index - 1];
  const next = projects[index + 1];
  const folder = `public/projects/${project.slug}`;

  return (
    <main className={styles.page}>
      <nav className={styles.topBar}>
        <Link href="/#projects" className={`caption ${styles.back}`}>
          <Icon name="arrow-left" weight="bold" className="size-3.5" />
          All projects
        </Link>
        <Link href="/" className={styles.home}>
          <Sticker name="panda" className="size-7" />
          {site.name}
        </Link>
      </nav>

      <Reveal className={styles.header}>
        <span className="caption">
          Project {String(index + 1).padStart(2, "0")} · {project.year}
        </span>
        <h1 className={styles.title}>{project.title}</h1>
        <p className={styles.blurb}>{project.blurb}</p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Chip key={tag}>{tag}</Chip>
          ))}
        </div>
        {project.links.length > 0 && (
          <div className={styles.links}>
            {project.links.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                className={i === 0 ? styles.primary : styles.secondary}
                {...linkProps(link.href)}
              >
                {link.label} <span aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        )}
      </Reveal>

      <Reveal delay={0.1}>
        {project.video ? (
          <VideoEmbed url={project.video} title={`${project.title} video`} preload />
        ) : (
          <ImageSlot src={project.cover} alt={`${project.title} cover`} hint={`${folder}/cover.jpg`} preload />
        )}
      </Reveal>

      <div className={styles.body}>
        <div className={styles.story}>
          {project.story.map((part) => (
            <Reveal as="div" key={part.heading}>
              <h2 className="caption">{part.heading}</h2>
              {part.body.split(/\n\s*\n/).map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </Reveal>
          ))}
        </div>

        {project.details.length > 0 && (
          <Reveal className={styles.facts}>
            <dl>
              {project.details.map((d) => (
                <div key={d.label}>
                  <dt className="caption">{d.label}</dt>
                  <dd>{d.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        )}
      </div>

      {project.gallery.length > 0 && (
        <section className={styles.gallery}>
          <h2 className="caption">Gallery</h2>
          <ul>
            {project.gallery.map((item, i) => (
              <Reveal as="li" key={i} delay={(i % 2) * 0.08}>
                {item.video ? (
                  <VideoEmbed
                    url={item.video}
                    title={item.caption}
                    caption={item.caption}
                    sizes="(min-width: 768px) 36rem, 100vw"
                  />
                ) : (
                  <ImageSlot
                    src={item.src}
                    alt={item.caption}
                    caption={item.caption}
                    hint={`${folder}/${String(i + 1).padStart(2, "0")}.jpg`}
                    aspect="16 / 9"
                    sizes="(min-width: 768px) 36rem, 100vw"
                  />
                )}
              </Reveal>
            ))}
          </ul>
        </section>
      )}

      <nav className={styles.pager} aria-label="More projects">
        {prev ? (
          <Link href={`/projects/${prev.slug}`} className={styles.pagerLink}>
            <span className="caption">← Previous</span>
            {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link href={`/projects/${next.slug}`} className={`${styles.pagerLink} ${styles.pagerNext}`}>
            <span className="caption">Next →</span>
            {next.title}
          </Link>
        )}
      </nav>
    </main>
  );
}
