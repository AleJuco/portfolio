import { site } from "@/content/site";
import { Icon } from "@/components/ui/Icon";
import { Sticker } from "@/components/art/Sticker";
import { Reveal } from "@/components/motion/Reveal";
import styles from "./Section.module.css";

// Shared frame for every content section: heading (label + sticker taken from the hero menu
// in site.ts, numbered in menu order), a "back to menu" button, then whatever you put inside.
export function Section({ id, children }: { id: string; children: React.ReactNode }) {
  const index = site.sections.findIndex((s) => s.id === id);
  if (index === -1) throw new Error(`No entry with id "${id}" in site.sections (src/content/site.ts)`);
  const menuItem = site.sections[index];

  return (
    <section id={id} className={styles.section}>
      <Reveal className={styles.heading}>
        <h2 className="flex items-center gap-4">
          <span className={styles.icon}>
            <Sticker name={menuItem.art} className="size-full" />
          </span>
          <span className="flex flex-col gap-1">
            <span className="caption">{String(index + 1).padStart(2, "0")}</span>
            <span className={styles.title}>{menuItem.label}</span>
          </span>
        </h2>
        <a href="#top" className={`caption ${styles.backLink}`}>
          <Icon name="arrow-up" weight="bold" className="size-3.5" />
          Menu
        </a>
      </Reveal>
      {children}
    </section>
  );
}
