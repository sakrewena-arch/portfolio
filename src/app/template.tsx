import type { ReactNode } from "react";

/**
 * Un template est recréé à chaque navigation : l'animation CSS « page-in » joue donc
 * à chaque changement de page. Désactivée automatiquement si l'utilisateur réduit les animations.
 */
export default function Template({ children }: { children: ReactNode }) {
  return <div className="page-in">{children}</div>;
}
