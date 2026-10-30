"use client";

import { Button } from "@/components/ui/Button";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="mx-auto flex min-h-[80svh] max-w-[88rem] flex-col justify-center px-5 pb-16 pt-32 md:px-8">
      <h1 className="display-xl max-w-[12ch] text-[clamp(2.8rem,10vw,8rem)]">
        Un problème est survenu.
      </h1>
      <p className="mt-6 max-w-[44ch] text-lg text-muted">
        La page n&apos;a pas pu s&apos;afficher. Réessaie ; si le problème
        continue, reviens à l&apos;accueil.
      </p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Button onClick={reset}>Réessayer</Button>
        <Button href="/" variant="outline">
          Retour à l&apos;accueil
        </Button>
      </div>
    </section>
  );
}
