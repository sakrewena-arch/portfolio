import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { profile } from "@/data/profile";
import { getSocialLinks } from "@/lib/server";

export function Footer() {
  const links = getSocialLinks();
  const year = new Date().getFullYear();
  return (
    <footer className="themed border-t border-line">
      <div className="mx-auto flex max-w-[88rem] flex-col gap-8 px-5 py-10 md:flex-row md:items-end md:justify-between md:px-8">
        <div>
          <p className="font-display text-2xl font-bold tracking-tight [font-stretch:85%]">
            {profile.displayName}
          </p>
          <p className="mt-1 text-sm text-muted">
            {profile.jobTitle}
            {profile.location ? ` · ${profile.location}` : ""}
          </p>
        </div>

        {links.length > 0 && (
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {links.map((l) => (
              <li key={l.id}>
                <a
                  href={l.href}
                  {...(l.href.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="inline-flex min-h-11 items-center gap-1 text-muted transition-colors hover:text-fg"
                >
                  {l.label}
                  <ArrowUpRight aria-hidden className="size-3.5" />
                </a>
              </li>
            ))}
          </ul>
        )}

        <p className="text-sm text-muted">
          © {year} {profile.displayName}.{" "}
          <Link href="/#accueil" className="inline-flex min-h-11 items-center underline underline-offset-4 hover:text-fg">
            Retour en haut
          </Link>
        </p>
      </div>
    </footer>
  );
}
