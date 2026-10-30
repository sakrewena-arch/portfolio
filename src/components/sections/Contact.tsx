import { ArrowUpRight, Mail, MessageCircle } from "lucide-react";
import { profile } from "@/data/profile";
import { getSocialLinks } from "@/lib/server";
import { AnimatedHeading, Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/sections/ContactForm";

export function Contact() {
  const links = getSocialLinks();
  return (
    <section
      id="contact"
      className="themed border-t border-line bg-raised/50"
    >
      <div className="mx-auto max-w-[88rem] px-5 py-28 md:px-8 md:py-40">
        <AnimatedHeading
          text={profile.contact.title}
          className="display-xl max-w-[17ch] text-[clamp(2.5rem,7.2vw,6.6rem)] text-balance"
        />

        <div className="mt-16 grid gap-16 md:mt-24 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4">
            <Reveal>
              <p className="max-w-[40ch] text-lg text-muted">
                {profile.contact.intro}
              </p>

              {links.length > 0 && (
                <ul className="mt-10 border-t border-line">
                  {links.map((l) => (
                    <li key={l.id} className="themed border-b border-line">
                      <a
                        href={l.href}
                        {...(l.href.startsWith("http")
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        className="group flex min-h-14 items-center justify-between gap-4 text-lg transition-colors hover:text-accent"
                      >
                        <span className="inline-flex items-center gap-3">
                          {l.id === "email" && <Mail aria-hidden className="size-5 text-muted" />}
                          {l.id === "whatsapp" && (
                            <MessageCircle aria-hidden className="size-5 text-muted" />
                          )}
                          {l.label}
                        </span>
                        <ArrowUpRight
                          aria-hidden
                          className="size-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </Reveal>
          </div>

          <Reveal delay={0.1} className="md:col-span-7 md:col-start-6">
            <ContactForm directEmail={profile.email || undefined} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
