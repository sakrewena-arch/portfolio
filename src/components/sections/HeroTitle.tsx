"use client";

import { motion, useReducedMotion } from "motion/react";

interface Segment {
  text: string;
  accent?: boolean;
}

const ease = [0.2, 0.7, 0.2, 1] as const;

/**
 * Titre du hero, composé en lignes fixes (pas de retour automatique) pour que la variation
 * de largeur de la police ne fasse jamais bouger la mise en page.
 */
export function HeroTitle({
  lines,
  label,
}: {
  lines: readonly (readonly Segment[])[];
  label: string;
}) {
  const reduce = useReducedMotion();
  return (
    <h1
      aria-label={label}
      className="display-xl mt-6 text-[clamp(2.85rem,min(12.4vw,11svh),8.4rem)] text-fg"
    >
      {lines.map((line, i) => (
        <span
          key={i}
          aria-hidden
          className="block overflow-hidden whitespace-nowrap pb-[0.08em]"
        >
          <motion.span
            data-reveal
            className="block"
            initial={reduce ? false : { y: "105%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 + i * 0.09, ease }}
          >
            {line.map((seg, j) =>
              seg.accent ? (
                <span key={j} className="stretch text-accent">
                  {seg.text}
                </span>
              ) : (
                <span key={j}>{seg.text}</span>
              ),
            )}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}
