import styles from "./Chip.module.css";

// Small rounded label. "sm" for tags on cards, "lg" for the skills list.
export function Chip({ size = "sm", children }: { size?: "sm" | "lg"; children: React.ReactNode }) {
  return <span className={`${styles.chip} ${styles[size]}`}>{children}</span>;
}
