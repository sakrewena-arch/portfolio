import Image from "next/image";
import { Play } from "lucide-react";
import type { Project } from "@/types";

/** Hash stable pour choisir une composition par projet. */
function pick(slug: string, n: number) {
  let h = 0;
  for (const c of slug) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return h % n;
}

/**
 * Couverture d'un projet : vraie image si fournie (`cover` ou `thumbnail`),
 * sinon composition graphique générée (formes + nom), clairement non photographique.
 */
export function ProjectCover({
  project,
  sizes,
  priority = false,
}: {
  project: Project;
  sizes: string;
  priority?: boolean;
}) {
  const image = project.cover ?? project.thumbnail;
  const showPlay = Boolean(project.video || project.placeholder) && project.category === "motion";

  if (image) {
    return (
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={project.coverAlt ?? project.name}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
        {showPlay && <PlayBadge />}
      </div>
    );
  }

  const h = project.hue;
  const bg = `hsl(${h} 42% 13%)`;
  const mid = `hsl(${h} 50% 22%)`;
  const light = `hsl(${h} 85% 72%)`;
  const ink = `hsl(${h} 30% 94%)`;
  const variant = pick(project.slug, 3);
  const name = project.name.length > 14 ? project.name.split(",")[0] : project.name;

  return (
    <div
      role="img"
      aria-label={project.coverAlt ?? `Couverture graphique de ${project.name}`}
      className="absolute inset-0 overflow-hidden"
      style={{ background: bg, containerType: "inline-size" }}
    >
      <svg
        viewBox="0 0 800 600"
        preserveAspectRatio="xMidYMid slice"
        className="size-full"
        aria-hidden
      >
        {variant === 0 && (
          <>
            <circle cx="610" cy="150" r="190" fill={mid} />
            <circle cx="610" cy="150" r="96" fill={light} />
            <rect x="0" y="410" width="800" height="1.5" fill={ink} opacity="0.25" />
            <rect x="96" y="410" width="1.5" height="190" fill={ink} opacity="0.25" />
          </>
        )}
        {variant === 1 && (
          <>
            <path d="M0 600 A420 420 0 0 1 420 180 L420 600 Z" fill={mid} />
            <path d="M0 600 A220 220 0 0 1 220 380 L220 600 Z" fill={light} />
            <circle cx="640" cy="130" r="34" fill="none" stroke={ink} strokeWidth="1.5" opacity="0.5" />
          </>
        )}
        {variant === 2 && (
          <>
            <rect x="470" y="0" width="330" height="600" fill={mid} />
            <rect x="470" y="0" width="110" height="260" fill={light} />
            <circle cx="470" cy="150" r="70" fill={bg} stroke={ink} strokeWidth="1.5" opacity="0.9" />
          </>
        )}
      </svg>
      <span
        aria-hidden
        className="absolute bottom-[5cqw] left-[6cqw] whitespace-nowrap"
        style={{
          color: ink,
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontStretch: "80%",
          letterSpacing: "-0.04em",
          lineHeight: 0.9,
          fontSize: `${name.length > 9 ? 13 : 17}cqw`,
        }}
      >
        {name}
      </span>
      {showPlay && <PlayBadge />}
    </div>
  );
}

function PlayBadge() {
  return (
    <span className="absolute left-1/2 top-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-sm">
      <Play aria-hidden className="size-6 translate-x-px fill-current" />
    </span>
  );
}
