"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/** Applique la préférence système « réduire les animations » à toutes les animations Motion. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
