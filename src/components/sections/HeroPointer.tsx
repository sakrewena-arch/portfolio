"use client";

import { useEffect } from "react";

/**
 * Relie la position du pointeur à quelques variables CSS du hero :
 *   --w / --wg : largeur et poids de la police (mots mis en valeur)
 *   --px / --py : parallaxe de la composition graphique
 * Aucune mise à jour React : seules des variables CSS changent, avec un lissage rAF.
 * Désactivé sur écran tactile et quand l'utilisateur réduit les animations.
 */
export function HeroPointer() {
  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!finePointer.matches || reduce.matches) return;

    const hero = document.querySelector<HTMLElement>("[data-hero]");
    if (!hero) return;

    const target = { x: 0.5, y: 0.5 };
    const current = { x: 0.5, y: 0.5 };
    let frame = 0;

    const tick = () => {
      current.x += (target.x - current.x) * 0.08;
      current.y += (target.y - current.y) * 0.08;
      hero.style.setProperty("--w", `${(84 + 16 * current.x).toFixed(2)}%`);
      hero.style.setProperty("--wg", `${Math.round(520 + 220 * current.x)}`);
      hero.style.setProperty("--px", (current.x - 0.5).toFixed(3));
      hero.style.setProperty("--py", (current.y - 0.5).toFixed(3));
      const settled =
        Math.abs(target.x - current.x) < 0.001 &&
        Math.abs(target.y - current.y) < 0.001;
      frame = settled ? 0 : requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      const rect = hero.getBoundingClientRect();
      target.x = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
      target.y = Math.min(1, Math.max(0, (e.clientY - rect.top) / rect.height));
      if (!frame) frame = requestAnimationFrame(tick);
    };

    hero.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      hero.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
