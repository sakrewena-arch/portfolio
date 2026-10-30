"use client";

import { useEffect, useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "dark" | "light";

function subscribe(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

function getSnapshot(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

// Le rendu serveur part toujours du mode sombre (défaut). Le thème réel est
// appliqué avant le premier rendu par le script inline du layout.
function getServerSnapshot(): Theme {
  return "dark";
}

export function ThemeToggle({ className }: { className?: string }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    // Active les transitions de thème après le premier rendu uniquement.
    const id = requestAnimationFrame(() =>
      document.documentElement.classList.add("theme-ready"),
    );
    return () => cancelAnimationFrame(id);
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* stockage indisponible : le choix vaut pour la session */
    }
  }

  const label =
    theme === "dark" ? "Passer au mode clair" : "Passer au mode sombre";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className={
        "themed inline-flex size-11 items-center justify-center rounded-full border border-line text-fg transition-colors hover:border-fg hover:bg-fg hover:text-bg cursor-pointer " +
        (className ?? "")
      }
    >
      {theme === "dark" ? (
        <Sun aria-hidden className="size-[1.1rem]" />
      ) : (
        <Moon aria-hidden className="size-[1.1rem]" />
      )}
    </button>
  );
}
