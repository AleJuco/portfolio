"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

// A full-size background layer that drifts at `speed` × the scroll distance (0 = fixed, 1 = moves with the page).
export function Parallax({ speed, children }: { speed: number; children: React.ReactNode }) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, reduce ? 0 : speed * 1000]);

  return (
    <motion.div className="absolute inset-0" style={{ y }}>
      {children}
    </motion.div>
  );
}
