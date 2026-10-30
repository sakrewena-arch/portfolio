import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = { title: "Page introuvable" };

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[80svh] max-w-[88rem] flex-col justify-center px-5 pb-16 pt-32 md:px-8">
      <p className="text-muted">Erreur 404</p>
      <h1 className="display-xl mt-4 max-w-[12ch] text-[clamp(3rem,11vw,9rem)]">
        Cette page n&apos;existe pas.
      </h1>
      <p className="mt-6 max-w-[44ch] text-lg text-muted">
        Le lien est peut-être incorrect, ou la page a été déplacée.
      </p>
      <div className="mt-10">
        <Button href="/" arrow>
          Retour à l&apos;accueil
        </Button>
      </div>
    </section>
  );
}
