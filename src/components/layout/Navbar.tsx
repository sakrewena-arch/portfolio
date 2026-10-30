"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { motion } from "motion/react";
import { Menu } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Button } from "@/components/ui/Button";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { cn } from "@/lib/utils";

interface Item {
  id: string;
  label: string;
}

export function Navbar({
  name,
  items,
}: {
  name: string;
  items: readonly Item[];
}) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [activeId, setActiveId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  // Section active : observe les sections de la page d'accueil.
  useEffect(() => {
    if (!isHome) return;
    const targets = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => Boolean(el));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [isHome, items]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const hrefFor = (id: string) => (id === "accueil" ? "/" : `/#${id}`);
  const current = isHome ? activeId : null;
  const hasContact = items.some((i) => i.id === "contact");

  return (
    <>
      <header
        className={cn(
          "themed fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-300",
          scrolled
            ? "border-line bg-bg/80 backdrop-blur-md"
            : "border-transparent bg-transparent",
        )}
      >
        <div className="mx-auto flex h-16 max-w-[88rem] items-center justify-between gap-4 px-5 md:px-8">
          <Link
            href="/"
            className="font-display inline-flex min-h-11 items-center whitespace-nowrap text-lg font-bold tracking-tight [font-stretch:85%]"
            aria-label={`${name}, retour à l'accueil`}
          >
            {name}
          </Link>

          <nav aria-label="Navigation principale" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {items.map((item) => (
                <li key={item.id} className="relative">
                  <Link
                    href={hrefFor(item.id)}
                    aria-current={current === item.id ? "true" : undefined}
                    className={cn(
                      "relative inline-flex min-h-11 items-center whitespace-nowrap px-3 text-[0.95rem] transition-colors",
                      current === item.id
                        ? "text-fg"
                        : "text-muted hover:text-fg",
                    )}
                  >
                    {item.label}
                    {current === item.id && (
                      <motion.span
                        layoutId="nav-active"
                        aria-hidden
                        className="absolute inset-x-3 bottom-1.5 h-px bg-accent"
                        transition={{ type: "spring", stiffness: 500, damping: 40 }}
                      />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            {hasContact && (
              <Button
                href={hrefFor("contact")}
                className="hidden !min-h-11 !px-5 text-[0.95rem] lg:inline-flex"
              >
                Me contacter
              </Button>
            )}
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Ouvrir le menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="inline-flex size-11 items-center justify-center rounded-full border border-line text-fg cursor-pointer lg:hidden"
            >
              <Menu aria-hidden className="size-5" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        open={open}
        onClose={close}
        items={items}
        hrefFor={hrefFor}
        activeId={current}
      />
    </>
  );
}
