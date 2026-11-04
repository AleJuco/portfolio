import Link from "next/link";
import styles from "./Panel.module.css";

// Charcoal card with a hairline border. Pass `href` to make the whole card a link that lifts on hover.
export function Panel({
  href,
  className = "",
  children,
}: {
  href?: string;
  className?: string;
  children: React.ReactNode;
}) {
  if (href) {
    return (
      <Link href={href} className={`${styles.panel} ${styles.link} ${className}`}>
        {children}
      </Link>
    );
  }
  return <div className={`${styles.panel} ${className}`}>{children}</div>;
}
