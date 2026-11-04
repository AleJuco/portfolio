"use client";

import { motion, type Variants } from "motion/react";
import type { IconName } from "@/content/site";
import { Icon } from "@/components/ui/Icon";
import { hoverable, spring, stagger } from "@/components/motion/presets";
import { linkProps } from "@/lib/links";
import styles from "./QuickLinks.module.css";

type QuickLink = { label: string; href: string; icon: IconName };

const popIn: Variants = {
  hidden: { scale: 0.3, opacity: 0 },
  show: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 400, damping: 15 } },
};

// Top-right: round icon buttons.
export function QuickLinks({ links }: { links: QuickLink[] }) {
  return (
    <motion.ul className="flex gap-3" variants={stagger(0.2, 0.1)} initial="hidden" animate="show">
      {links.map((link) => (
        <motion.li key={link.label} variants={popIn}>
          <motion.a
            href={link.href}
            aria-label={link.label}
            title={link.label}
            className={styles.button}
            {...hoverable}
            whileTap={{ scale: 0.9 }}
            variants={{ rest: { scale: 1 }, hover: { scale: 1.12 } }}
            transition={spring}
            {...linkProps(link.href)}
          >
            <motion.span variants={{ rest: { rotate: 0 }, hover: { rotate: -14 } }} transition={spring}>
              <Icon name={link.icon} className="size-5" />
            </motion.span>
          </motion.a>
        </motion.li>
      ))}
    </motion.ul>
  );
}
