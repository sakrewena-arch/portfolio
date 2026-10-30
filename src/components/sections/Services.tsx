import { Compass, Film, Globe, Smartphone, Sparkles } from "lucide-react";
import { services } from "@/data/services";
import { sections } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceButton } from "@/components/ui/ServiceButton";

const icons = {
  globe: Globe,
  smartphone: Smartphone,
  film: Film,
  sparkles: Sparkles,
  compass: Compass,
} as const;

export function Services() {
  return (
    <section id="services" className="mx-auto max-w-[88rem] px-5 py-28 md:px-8 md:py-40">
      <SectionHeading
        title="Ce que je peux faire pour toi."
        intro="Cinq façons de travailler ensemble, de l'idée à la réalisation."
      />

      <ul className="mt-16 border-t border-line-strong md:mt-24">
        {services.map((s, i) => {
          const Icon = icons[s.icon];
          return (
            <li key={s.id} className="themed border-b border-line">
              <Reveal
                delay={Math.min(i, 3) * 0.05}
                className="grid gap-5 py-8 transition-colors duration-300 hover:bg-accent-soft md:grid-cols-12 md:items-center md:gap-8 md:px-4 md:py-10"
              >
                <div className="flex items-center gap-4 md:col-span-5">
                  <Icon aria-hidden className="size-6 shrink-0 text-accent" />
                  <h3 className="display-lg text-balance text-[1.65rem] leading-tight md:text-4xl">
                    {s.title}
                  </h3>
                </div>
                <p className="max-w-[46ch] text-muted md:col-span-4">
                  {s.description}
                </p>
                {sections.contact && (
                  <div className="md:col-span-3 md:justify-self-end">
                    <ServiceButton
                      projectType={s.projectType}
                      serviceTitle={s.title}
                    />
                  </div>
                )}
              </Reveal>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
