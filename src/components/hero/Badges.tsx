"use client";

import { motion, type Variants } from "motion/react";
import type { ArtName } from "@/content/site";
import { Sticker } from "@/components/art/Sticker";
import { hoverable, spring, stagger } from "@/components/motion/presets";
import { linkProps } from "@/lib/links";
import styles from "./Badges.module.css";

type Badge = { label: string; detail: string; href: string; art: ArtName; live: boolean };

const riseIn: Variants = {
  hidden: { y: 40, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 220, damping: 20 } },
};

const bob: Variants = {
  rest: { scale: 1, y: 0 },
  hover: {
    scale: 1.08,
    y: [0, -5, 0],
    transition: { scale: spring, y: { duration: 0.8, repeat: Infinity, ease: "easeInOut" } },
  },
};

// Bottom-left: links with a sticker in a round tile. `live: true` adds a pulsing green dot.
export function Badges({ items }: { items: Badge[] }) {
  return (
    <motion.ul
      className="flex flex-wrap gap-x-10 gap-y-5 md:flex-col md:gap-6"
      variants={stagger(0.7, 0.12)}
      initial="hidden"
      animate="show"
    >
      {items.map((badge) => (
        <motion.li key={badge.label} variants={riseIn}>
          <motion.a
            href={badge.href}
            className={styles.badge}
            {...hoverable}
            whileTap={{ scale: 0.96 }}
            variants={{ rest: { x: 0 }, hover: { x: 6 } }}
            transition={spring}
            {...linkProps(badge.href)}
          >
            <motion.span className={styles.medal} variants={bob}>
              <Sticker name={badge.art} className="size-full" />
            </motion.span>
            <span className="flex flex-col gap-0.5 leading-tight">
              <span className={styles.label}>{badge.label}</span>
              <span className={`caption ${styles.detail}`}>
                {badge.live && <span className={styles.liveDot} aria-hidden="true" />}
                {badge.detail}
              </span>
            </span>
          </motion.a>
        </motion.li>
      ))}
    </motion.ul>
  );
}
