"use client";

import { Button } from "@/components/ui/Button";

/** Ouvre le formulaire de contact avec le type de projet déjà sélectionné. */
export function ServiceButton({
  projectType,
  serviceTitle,
}: {
  projectType: string;
  serviceTitle: string;
}) {
  return (
    <Button
      href="/#contact"
      variant="outline"
      arrow
      aria-label={`Discuter d'un projet : ${serviceTitle}`}
      onClick={() =>
        window.dispatchEvent(
          new CustomEvent("select-service", { detail: projectType }),
        )
      }
      className="!min-h-11 !px-5 text-[0.95rem]"
    >
      Discuter du projet
    </Button>
  );
}
