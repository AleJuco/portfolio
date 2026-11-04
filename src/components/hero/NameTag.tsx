import { Sticker } from "@/components/art/Sticker";
import styles from "./NameTag.module.css";

// Top-left: a little panda, your name, and your role underneath.
export function NameTag({ name, role }: { name: string; role: string }) {
  return (
    <h1 className={styles.nameTag}>
      <span className={styles.name}>
        <Sticker name="panda" className={styles.panda} />
        {name}
      </span>
      <span className={`caption ${styles.role}`}>{role}</span>
    </h1>
  );
}
