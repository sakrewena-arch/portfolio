import { profile } from "@/data/profile";
import { sections } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { HeroTitle } from "@/components/sections/HeroTitle";
import { HeroPointer } from "@/components/sections/HeroPointer";

/** Composition graphique du hero : formes simples, une couleur d'accent, légère (SVG + CSS). */
function HeroArt() {
  const ring = "DÉVELOPPEMENT · MOTION DESIGN · IA · INTERFACES · ";
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute -right-[38vw] top-[11.5rem] z-0 w-[92vw] opacity-30 sm:-right-[20vw] sm:top-[20rem] sm:w-[62vw] sm:opacity-35 lg:right-[2vw] lg:top-20 lg:w-[min(40vw,36rem)] lg:opacity-100"
      style={{
        transform:
          "translate3d(calc(var(--px, 0) * -26px), calc(var(--py, 0) * -20px), 0)",
        transition: "transform 0.2s linear",
      }}
    >
      <svg viewBox="0 0 560 560" className="size-full overflow-visible">
        {/* Anneau de texte en rotation lente */}
        <g style={{ transformOrigin: "280px 280px", animation: "spin-slow 60s linear infinite" }}>
          <defs>
            <path id="ring" d="M280,280 m-236,0 a236,236 0 1,1 472,0 a236,236 0 1,1 -472,0" />
          </defs>
          <text
            fill="var(--muted)"
            style={{ fontFamily: "var(--font-display)", fontSize: 17, letterSpacing: "0.28em" }}
          >
            <textPath href="#ring">{ring.repeat(2)}</textPath>
          </text>
        </g>
        <circle cx="280" cy="280" r="190" fill="none" stroke="var(--line-strong)" />
        {/* Quart de disque plein */}
        <path d="M280 280 L280 120 A160 160 0 0 1 440 280 Z" fill="var(--accent)" />
        {/* Cercle d'équilibre */}
        <circle cx="200" cy="360" r="78" fill="var(--bg)" stroke="var(--fg)" strokeWidth="1.5" />
        <circle cx="200" cy="360" r="14" fill="var(--fg)" />
        {/* Repères */}
        <path d="M280 60 V500 M60 280 H500" stroke="var(--line)" />
        <path d="M452 452 h28 M466 438 v28" stroke="var(--fg)" strokeWidth="1.5" />
      </svg>
    </div>
  );
}

export function Hero() {
  const { hero, availability, location } = profile;
  const nextId = sections.about ? "a-propos" : sections.projects ? "projets" : "contact";

  return (
    <section
      id="accueil"
      data-hero
      className="relative isolate flex min-h-svh flex-col justify-between overflow-hidden pb-8 pt-28"
    >
      <HeroPointer />
      <HeroArt />

      <div className="relative z-10 mx-auto w-full max-w-[88rem] px-5 md:px-8">
        <p className="text-[0.78rem] font-medium tracking-[0.2em] text-muted sm:text-sm">
          {hero.eyebrow}
        </p>
        <HeroTitle lines={hero.title} label={hero.titleText} />
      </div>

      <div className="relative z-10 mx-auto mt-10 grid w-full max-w-[88rem] gap-10 px-5 md:mt-12 md:grid-cols-12 md:items-end md:px-8">
        <div className="md:col-span-7 lg:col-span-6">
          <p className="max-w-[52ch] text-lg leading-relaxed text-muted md:text-xl">
            {hero.description}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {sections.projects && (
              <Button href="/#projets" arrow>
                {hero.primaryCta}
              </Button>
            )}
            {sections.contact && (
              <Button href="/#contact" variant="outline">
                {hero.secondaryCta}
              </Button>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-6 md:col-span-5 md:justify-end lg:col-span-6">
          {availability.enabled && (
            <p className="themed inline-flex items-center gap-3 whitespace-nowrap rounded-full border border-line px-4 py-2 text-sm">
              <span
                aria-hidden
                className="size-2 rounded-full bg-accent"
                style={{ animation: "pulse-dot 2.4s ease-out infinite" }}
              />
              <span>
                {availability.label}
                {location ? ` · ${location}` : ""}
              </span>
            </p>
          )}

          <a
            href={`#${nextId}`}
            className="group inline-flex min-h-11 items-center gap-3 text-sm text-muted transition-colors hover:text-fg"
          >
            <span>Faire défiler</span>
            <span
              aria-hidden
              className="relative block h-10 w-px overflow-hidden bg-line-strong"
            >
              <span
                className="absolute inset-x-0 top-0 block h-1/2 bg-accent"
                style={{ animation: "scroll-cue 1.8s ease-in-out infinite" }}
              />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
