"use client";

import { useEffect, useSyncExternalStore } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

const QUERY = "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

function subscribe(callback: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}
const getSnapshot = () => window.matchMedia(QUERY).matches;
const getServerSnapshot = () => false;

/**
 * Curseur d'accompagnement : un point qui suit le pointeur et grossit sur les éléments cliquables.
 * Actif uniquement avec une souris (jamais sur écran tactile) et sans préférence de réduction d'animations.
 * Le curseur natif reste visible.
 */
export function CustomCursor() {
  const enabled = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const scale = useMotionValue(1);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });
  const ss = useSpring(scale, { stiffness: 300, damping: 24 });

  useEffect(() => {
    if (!enabled) return;
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target as Element | null;
      scale.set(target?.closest("a, button, summary, [role='button']") ? 2.6 : 1);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [enabled, x, y, scale]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[70] size-3 rounded-full bg-accent mix-blend-difference"
      style={{ x: sx, y: sy, scale: ss, translateX: "-50%", translateY: "-50%" }}
    />
  );
}
