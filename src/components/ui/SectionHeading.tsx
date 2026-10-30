import type { ReactNode } from "react";
import { AnimatedHeading, Reveal } from "@/components/ui/Reveal";

/** Titre de section : grand titre animé et introduction facultative. */
export function SectionHeading({
  title,
  intro,
  className = "",
}: {
  title: string;
  intro?: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <AnimatedHeading
        text={title}
        className="display-lg max-w-[16ch] text-[clamp(2.4rem,6.4vw,5.5rem)] text-balance"
      />
      {intro && (
        <Reveal delay={0.15} className="mt-6 max-w-[56ch] text-muted">
          {intro}
        </Reveal>
      )}
    </div>
  );
}
