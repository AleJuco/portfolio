import type { Variants } from "motion/react";

// Shared animation settings. Lower `stiffness` = slower, lower `damping` = bouncier.
export const spring = { type: "spring", stiffness: 380, damping: 22 } as const;

// Parent variants that bring children in one after another.
export const stagger = (delay: number, gap: number): Variants => ({
  hidden: {},
  show: { transition: { delayChildren: delay, staggerChildren: gap } },
});

// Spread onto a motion element so it (and any children with "rest"/"hover" variants)
// animate on mouse hover and keyboard focus.
export const hoverable = {
  initial: "rest",
  animate: "rest",
  whileHover: "hover",
  whileFocus: "hover",
} as const;
