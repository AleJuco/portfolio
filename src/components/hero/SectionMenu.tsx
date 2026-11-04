"use client";

import { motion, type Variants } from "motion/react";
import type { ArtName } from "@/content/site";
import { Sticker } from "@/components/art/Sticker";
import { hoverable, spring, stagger } from "@/components/motion/presets";
import styles from "./SectionMenu.module.css";

type MenuItem = { id: string; label: string; detail: string; art: ArtName };

const slideIn: Variants = {
  hidden: { x: "110%", opacity: 0 },
  show: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 260, damping: 24 } },
};

const wiggle: Variants = {
  rest: { rotate: 0, scale: 1 },
  hover: { rotate: [0, -12, 10, 0], scale: 1.1, transition: { duration: 0.5 } },
};

// Right side: rows that smooth-scroll to each section. Numbered 01, 02, …
export function SectionMenu({ items }: { items: MenuItem[] }) {
  return (
    <motion.ul className="flex flex-col gap-3" variants={stagger(0.35, 0.09)} initial="hidden" animate="show">
      {items.map((item, i) => (
        <motion.li key={item.id} variants={slideIn}>
          <motion.a
            href={`#${item.id}`}
            className={styles.button}
            {...hoverable}
            whileTap={{ x: -6, scale: 0.98 }}
            variants={{ rest: { x: 0 }, hover: { x: -12 } }}
            transition={spring}
          >
            <motion.span className={styles.icon} variants={wiggle}>
              <Sticker name={item.art} className="size-full" />
            </motion.span>
            <span className="flex flex-col gap-0.5 leading-tight">
              <span className={styles.label}>{item.label}</span>
              <span className="caption">{item.detail}</span>
            </span>
            <span className={`caption ${styles.index}`}>{String(i + 1).padStart(2, "0")}</span>
          </motion.a>
        </motion.li>
      ))}
    </motion.ul>
  );
}
