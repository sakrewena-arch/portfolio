import Link from "next/link";
import { FileText } from "lucide-react";
import { profile } from "@/data/profile";
import {
  creativeActivities,
  experienceTypeLabels,
  experiences,
} from "@/data/experiences";
import { statusLabels } from "@/data/projects";
import { getVisibleProjects, publicFileExists } from "@/lib/server";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface Entry {
  key: string;
  kind: string;
  title: string;
  where?: string;
  period?: string;
  lines?: string[];
  tags?: string[];
  achievements?: string[];
  href?: string;
}

function Timeline({ entries }: { entries: Entry[] }) {
  return (
    <ol className="relative">
      <span
        aria-hidden
        className="absolute bottom-0 left-[0.45rem] top-2 w-px bg-line-strong md:left-[11.45rem]"
      />
      {entries.map((e, i) => (
        <li key={e.key} className="relative pb-14 last:pb-0">
          <span
            aria-hidden
            className="absolute left-0 top-2 size-[0.95rem] rounded-full border-2 border-accent bg-bg md:left-[11rem]"
          />
          <Reveal
            delay={Math.min(i, 3) * 0.05}
            className="pl-9 md:grid md:grid-cols-[11rem_1fr] md:gap-x-12 md:pl-0"
          >
            <p className="text-sm text-muted md:pr-7 md:pt-1 md:text-right">
              {e.period ?? ""}
            </p>
            <div className="md:pl-12">
              <p className="text-sm text-accent">{e.kind}</p>
              <h3 className="display-lg mt-1 text-2xl md:text-3xl">
                {e.href ? (
                  <Link href={e.href} className="inline-flex min-h-11 items-center transition-colors hover:text-accent">
                    {e.title}
                  </Link>
                ) : (
                  e.title
                )}
              </h3>
              {e.where && <p className="mt-1 text-muted">{e.where}</p>}

              {e.lines && e.lines.length > 0 && (
                <ul className="mt-4 max-w-[60ch] list-disc space-y-1.5 pl-5 text-muted marker:text-line-strong">
                  {e.lines.map((l) => (
                    <li key={l}>{l}</li>
                  ))}
                </ul>
              )}

              {e.achievements && e.achievements.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-medium">Réalisations</p>
                  <ul className="mt-1.5 max-w-[60ch] list-disc space-y-1.5 pl-5 text-muted marker:text-line-strong">
                    {e.achievements.map((a) => (
                      <li key={a}>{a}</li>
                    ))}
                  </ul>
                </div>
              )}

              {e.tags && e.tags.length > 0 && (
                <ul className="mt-4 flex flex-wrap gap-2">
                  {e.tags.map((t) => (
                    <li
                      key={t}
                      className="themed rounded-full border border-line px-3 py-1 text-sm text-muted"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}

export function Experience() {
  const hasReal = experiences.length > 0;
  const cvAvailable = publicFileExists(profile.cv);

  let entries: Entry[];
  if (hasReal) {
    entries = experiences.map((x) => ({
      key: x.id,
      kind: experienceTypeLabels[x.type],
      title: x.role,
      where: [x.organization, x.location].filter(Boolean).join(", "),
      period: x.period,
      lines: x.missions,
      tags: x.skills,
      achievements: x.achievements,
    }));
  } else {
    // Aucune expérience renseignée : on présente les projets personnels et activités, identifiés comme tels.
    const projectEntries: Entry[] = getVisibleProjects()
      .filter((p) => !p.placeholder)
      .map((p) => ({
        key: p.slug,
        kind: "Projet personnel",
        title: p.name,
        where: statusLabels[p.status],
        period: p.year ? String(p.year) : p.status === "en-developpement" ? "En cours" : undefined,
        lines: [p.summary],
        tags: p.technologies,
        href: `/projects/${p.slug}`,
      }));
    const activityEntries: Entry[] = creativeActivities.map((a) => ({
      key: a.title,
      kind: "Activité créative",
      title: a.title,
      lines: [a.detail],
    }));
    entries = [...projectEntries, ...activityEntries];
  }

  return (
    <section id="experiences" className="border-t border-line themed">
      <div className="mx-auto max-w-[88rem] px-5 py-28 md:px-8 md:py-40">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            title="Parcours"
            intro={
              hasReal
                ? undefined
                : "Mes expériences professionnelles seront ajoutées ici. En attendant, voici mes projets personnels et mes activités créatives, présentés comme tels."
            }
          />
          {cvAvailable && (
            <Reveal>
              <Button href={profile.cv} variant="outline" className="shrink-0">
                <FileText aria-hidden className="size-4" />
                Consulter mon CV
              </Button>
            </Reveal>
          )}
        </div>

        <div className="mt-16 md:mt-24">
          <Timeline entries={entries} />
        </div>
      </div>
    </section>
  );
}
