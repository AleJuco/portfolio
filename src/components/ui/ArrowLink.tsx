import { linkProps } from "@/lib/links";
import styles from "./ArrowLink.module.css";

// White pill link with an arrow that nudges forward on hover (same style as "Let's Go!").
export function ArrowLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} className={styles.link} {...linkProps(href)}>
      {children}
      <span className={styles.arrow} aria-hidden="true">
        →
      </span>
    </a>
  );
}
