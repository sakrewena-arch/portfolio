import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { categoryLabels, getProject, statusLabels } from "@/data/projects";
import { getVisibleProjects } from "@/lib/server";
import { toEmbedUrl } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { ProjectCover } from "@/components/ui/ProjectCover";
import { Reveal } from "@/components/ui/Reveal";

export function generateStaticParams() {
  return getVisibleProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: project.name,
      description: project.summary,
      type: "article",
      ...(project.cover && { images: [{ url: project.cover }] }),
    },
  };
}

export default async function ProjectPage({
  params,
}: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  const visible = getVisibleProjects();
  if (!project || !visible.some((p) => p.slug === slug)) notFound();

  const index = visible.findIndex((p) => p.slug === slug);
  const next = visible[(index + 1) % visible.length];

  return (
    <article className="mx-auto max-w-[88rem] px-5 pb-24 pt-28 md:px-8 md:pb-32 md:pt-36">
      <Link
        href="/#projets"
        className="inline-flex min-h-11 items-center gap-2 text-muted transition-colors hover:text-fg"
      >
        <ArrowLeft aria-hidden className="size-4" />
        Tous les projets
      </Link>

      <header className="mt-6">
        <h1 className="display-xl text-[clamp(3rem,11vw,9.5rem)] text-balance">
          {project.name}
        </h1>
        <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4 text-sm">
          <div>
            <dt className="text-muted">Catégorie</dt>
            <dd className="mt-0.5 text-base">{categoryLabels[project.category]}</dd>
          </div>
          <div>
            <dt className="text-muted">Statut</dt>
            <dd className="mt-0.5 text-base">
              {project.placeholder ? "Emplacement réservé" : statusLabels[project.status]}
            </dd>
          </div>
          {project.year && (
            <div>
              <dt className="text-muted">Année</dt>
              <dd className="mt-0.5 text-base">{project.year}</dd>
            </div>
          )}
        </dl>
      </header>

      <div className="themed relative mt-12 aspect-[4/3] overflow-hidden rounded-sm border border-line bg-raised md:mt-16 md:aspect-[16/8]">
        <ProjectCover project={project} sizes="(min-width: 1280px) 1280px, 94vw" priority />
      </div>

      <div className="mt-16 grid gap-14 md:mt-24 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-7">
          <Reveal className="space-y-5 text-xl leading-relaxed">
            {project.description.map((p) => (
              <p key={p} className="max-w-[58ch]">
                {p}
              </p>
            ))}
          </Reveal>

          {(project.url || project.demoUrl) && (
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              {project.url && (
                <Button href={project.url} arrow>
                  Voir le projet
                </Button>
              )}
              {project.demoUrl && (
                <Button href={project.demoUrl} variant="outline" arrow>
                  Voir la démonstration
                </Button>
              )}
            </div>
          )}
        </div>

        <aside className="space-y-10 md:col-span-4 md:col-start-9">
          {project.features && project.features.length > 0 && (
            <div>
              <h2 className="text-sm font-medium text-muted">Fonctionnalités</h2>
              <ul className="mt-3 border-t border-line">
                {project.features.map((f) => (
                  <li key={f} className="themed border-b border-line py-3">
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {project.technologies.length > 0 && (
            <div>
              <h2 className="text-sm font-medium text-muted">Technologies</h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {project.technologies.map((t) => (
                  <li
                    key={t}
                    className="themed rounded-full border border-line px-4 py-1.5 text-[0.95rem]"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>

      {project.video && (
        <div className="mt-16 md:mt-24">
          <h2 className="display-lg text-3xl md:text-4xl">Vidéo</h2>
          <div className="themed relative mt-6 aspect-video overflow-hidden rounded-sm border border-line bg-sunk">
            {project.video.type === "embed" ? (
              <iframe
                src={toEmbedUrl(project.video.url)}
                title={`Vidéo : ${project.name}`}
                loading="lazy"
                allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
                className="absolute inset-0 size-full"
              />
            ) : (
              <video
                src={project.video.url}
                poster={project.thumbnail}
                controls
                preload="metadata"
                playsInline
                className="absolute inset-0 size-full object-contain"
              >
                Ton navigateur ne peut pas lire cette vidéo.
              </video>
            )}
          </div>
        </div>
      )}

      {visible.length > 1 && (
        <Link
          href={`/projects/${next.slug}`}
          className="themed group mt-20 flex items-end justify-between gap-6 border-t border-line-strong pt-8 md:mt-28"
        >
          <span>
            <span className="text-sm text-muted">Projet suivant</span>
            <span className="display-lg mt-1 block text-4xl transition-colors group-hover:text-accent md:text-6xl">
              {next.name}
            </span>
          </span>
          <ArrowUpRight
            aria-hidden
            className="size-10 shrink-0 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 md:size-14"
          />
        </Link>
      )}
    </article>
  );
}
