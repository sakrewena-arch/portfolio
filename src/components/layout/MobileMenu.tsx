"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface Item {
  id: string;
  label: string;
}

export function MobileMenu({
  open,
  onClose,
  items,
  hrefFor,
  activeId,
}: {
  open: boolean;
  onClose: () => void;
  items: readonly Item[];
  hrefFor: (id: string) => string;
  activeId: string | null;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") {
        // Piège à focus minimal : reste dans la boîte de dialogue.
        const nodes = document.querySelectorAll<HTMLElement>(
          "#mobile-menu a, #mobile-menu button",
        );
        if (!nodes.length) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      previous?.focus();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navigation"
          className="fixed inset-0 z-[55] flex flex-col bg-bg px-5 pb-8 pt-4 lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div className="flex items-center justify-end">
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Fermer le menu"
              className="inline-flex size-11 items-center justify-center rounded-full border border-line text-fg cursor-pointer"
            >
              <X aria-hidden className="size-5" />
            </button>
          </div>

          <nav aria-label="Navigation principale" className="mt-6 flex-1">
            <ul className="flex flex-col">
              {items.map((item, i) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.04, duration: 0.4 }}
                  className="border-b border-line"
                >
                  <Link
                    href={hrefFor(item.id)}
                    onClick={onClose}
                    aria-current={activeId === item.id ? "true" : undefined}
                    className={cn(
                      "display-lg flex min-h-16 items-center text-[2.1rem]",
                      activeId === item.id ? "text-accent" : "text-fg",
                    )}
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </nav>

          <Button
            href={hrefFor("contact")}
            onClick={onClose}
            arrow
            className="w-full"
          >
            Me contacter
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
