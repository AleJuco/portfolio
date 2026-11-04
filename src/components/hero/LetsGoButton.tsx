"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { hoverable, spring } from "@/components/motion/presets";
import { Sticker } from "@/components/art/Sticker";
import styles from "./LetsGoButton.module.css";

// Bottom-right: the call-to-action. It leans toward the mouse ("magnetic") and springs back.
export function LetsGoButton({ label, href }: { label: string; href: string }) {
  const reduce = useReducedMotion();
  const x = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 });
  const y = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 });

  function onPointerMove(e: React.PointerEvent<HTMLAnchorElement>) {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.25);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.35);
  }
  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 18, delay: 0.95 }}
    >
      <motion.a
        href={href}
        className={styles.button}
        style={{ x, y }}
        onPointerMove={onPointerMove}
        onPointerLeave={reset}
        {...hoverable}
        whileTap={{ scale: 0.95 }}
      >
        {/* The panda tilts on hover and floats gently the rest of the time. */}
        <motion.span className="block" variants={{ rest: { rotate: 0 }, hover: { rotate: -10 } }} transition={spring}>
          <motion.span
            className={styles.emblem}
            animate={reduce ? undefined : { y: [0, -4, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <Sticker name="driver" className="size-full" />
          </motion.span>
        </motion.span>
        <span className={styles.pill}>
          {label}
          <span className={styles.arrow} aria-hidden="true">
            →
          </span>
        </span>
      </motion.a>
    </motion.div>
  );
}
