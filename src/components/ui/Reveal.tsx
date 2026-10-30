"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

const ease = [0.2, 0.7, 0.2, 1] as const;

/** Apparition douce d'un bloc au défilement. À utiliser avec parcimonie. */
export function Reveal({
  children,
  delay = 0,
  className,
  y = 18,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      data-reveal
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.7, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Titre dont les mots remontent un à un derrière un masque.
 * Le texte reste un seul titre pour les lecteurs d'écran.
 */
export function AnimatedHeading({
  as: Tag = "h2",
  text,
  className,
  delay = 0,
}: {
  as?: "h1" | "h2" | "h3";
  text: string;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  const MotionTag = motion[Tag];
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "0px 0px -15% 0px" }}
      transition={{ staggerChildren: 0.045, delayChildren: delay }}
    >
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden pb-[0.12em] align-bottom"
        >
          <motion.span
            data-reveal
            className="inline-block"
            variants={{
              hidden: reduce ? { opacity: 1 } : { y: "110%" },
              shown: { y: 0, opacity: 1 },
            }}
            transition={{ duration: 0.75, ease }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
