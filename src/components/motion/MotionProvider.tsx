"use client";

import { MotionConfig } from "motion/react";

// "user" turns off movement animations for people with reduced motion enabled in their OS.
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
