import Image from "next/image";
import { profile } from "@/data/profile";
import { initials } from "@/lib/utils";
import { AnimatedHeading, Reveal } from "@/components/ui/Reveal";

/** Portrait si une photo est fournie, sinon composition graphique (jamais de fausse photo). */
function Portrait() {
  if (profile.photo) {
    return (
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-raised">
        <Image
          src={profile.photo}
          alt={profile.photoAlt}
          fill
          sizes="(min-width: 768px) 40vw, 90vw"
          className="object-cover"
        />
      </div>
    );
  }
  return (
    <div
      role="img"
      aria-label={`Composition graphique avec les initiales ${initials(profile.displayName)}`}
      className="themed relative aspect-[4/5] w-full overflow-hidden rounded-sm border border-line bg-raised"
    >
      <svg viewBox="0 0 400 500" className="absolute inset-0 size-full" aria-hidden>
        <circle cx="300" cy="130" r="92" fill="var(--accent)" />
        <path d="M0 500 V300 A200 200 0 0 1 200 500 Z" fill="var(--fg)" opacity="0.08" />
        <circle cx="318" cy="372" r="44" fill="none" stroke="var(--fg)" strokeWidth="1.5" />
        <path d="M40 60 h56 M68 32 v56" stroke="var(--fg)" strokeWidth="1.5" />
        <text
          x="32"
          y="470"
          fill="var(--fg)"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontStretch: "78%",
            letterSpacing: "-0.05em",
          }}
          fontSize="190"
        >
          {initials(profile.displayName)}
        </text>
      </svg>
    </div>
  );
}

export function About() {
  const { about } = profile;
  return (
    <section id="a-propos" className="mx-auto max-w-[88rem] px-5 py-28 md:px-8 md:py-40">
      <AnimatedHeading
        text={about.title}
        className="display-lg max-w-[18ch] text-[clamp(2.4rem,6.4vw,5.5rem)] text-balance md:ml-[16.66%]"
      />

      <div className="mt-14 grid gap-12 md:mt-20 md:grid-cols-12 md:gap-8">
        <Reveal className="md:col-span-4 md:col-start-1">
          <Portrait />
        </Reveal>

        <div className="md:col-span-6 md:col-start-7">
          <Reveal className="space-y-5 text-lg text-muted md:text-xl">
            {about.paragraphs.map((p) => (
              <p key={p} className="max-w-[56ch] leading-relaxed">
                {p}
              </p>
            ))}
          </Reveal>

          <Reveal delay={0.1} className="mt-12">
            <h3 className="text-sm font-medium text-muted">Mes domaines</h3>
            <ul className="mt-3 border-t border-line">
              {about.domains.map((d) => (
                <li
                  key={d}
                  className="themed border-b border-line py-4 text-lg transition-[padding,color] duration-300 hover:pl-3 hover:text-accent md:text-xl"
                >
                  {d}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
