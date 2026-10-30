"use client";

import { useEffect, useId, useRef, useState } from "react";
import { CircleCheck, LoaderCircle, Send, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { projectTypes } from "@/data/services";
import {
  budgetOptions,
  contactSchema,
  flattenErrors,
  type FieldErrors,
} from "@/lib/validation";
import { cn } from "@/lib/utils";

type Status = "idle" | "sending" | "success" | "error";

const fieldClass =
  "themed w-full min-h-12 border-0 border-b border-line-strong bg-transparent px-0 py-3 text-lg text-fg placeholder:text-muted/70 transition-colors focus:border-accent focus:outline-none focus-visible:outline-none aria-[invalid=true]:border-red-400";

export function ContactForm({ directEmail }: { directEmail?: string }) {
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const startedAt = useRef(0);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [message, setMessage] = useState("");
  const [projectType, setProjectType] = useState("");

  useEffect(() => {
    startedAt.current = Date.now();
    // Pré-sélection depuis la section Services.
    const onSelect = (e: Event) => {
      const value = (e as CustomEvent<string>).detail;
      if (typeof value === "string") setProjectType(value);
    };
    window.addEventListener("select-service", onSelect);
    return () => window.removeEventListener("select-service", onSelect);
  }, []);

  const id = (name: string) => `${uid}-${name}`;

  function focusFirstError(errs: FieldErrors) {
    const first = Object.keys(errs)[0];
    if (!first) return;
    formRef.current
      ?.querySelector<HTMLElement>(`[name="${first}"]`)
      ?.focus();
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;

    const form = new FormData(e.currentTarget);
    const raw = {
      name: String(form.get("name") ?? ""),
      email: String(form.get("email") ?? ""),
      projectType: String(form.get("projectType") ?? ""),
      budget: String(form.get("budget") ?? ""),
      message: String(form.get("message") ?? ""),
      website: String(form.get("website") ?? ""),
      startedAt: startedAt.current,
    };

    const parsed = contactSchema.safeParse(raw);
    if (!parsed.success) {
      const errs = flattenErrors(parsed.error);
      setErrors(errs);
      setStatus("idle");
      setMessage("");
      focusFirstError(errs);
      return;
    }

    setErrors({});
    setStatus("sending");
    setMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        errors?: FieldErrors;
        error?: string;
        code?: string;
        devHint?: string;
      };

      if (res.ok && data.ok) {
        setStatus("success");
        formRef.current?.reset();
        setProjectType("");
        return;
      }

      if (res.status === 400 && data.errors) {
        setErrors(data.errors);
        setStatus("idle");
        focusFirstError(data.errors);
        return;
      }

      setStatus("error");
      if (data.code === "not_configured") {
        setMessage(
          data.devHint ??
            "L'envoi de messages n'est pas encore disponible sur ce site." +
              (directEmail ? ` Écris-moi directement à ${directEmail}.` : ""),
        );
      } else {
        setMessage(
          data.error ??
            "Le message n'a pas pu être envoyé. Réessaie dans un instant.",
        );
      }
    } catch {
      setStatus("error");
      setMessage(
        "Impossible de joindre le serveur. Vérifie ta connexion, puis réessaie.",
      );
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="themed rounded-sm border border-line bg-raised p-8 md:p-10"
      >
        <CircleCheck aria-hidden className="size-9 text-accent" />
        <h3 className="display-lg mt-5 text-3xl">Message envoyé.</h3>
        <p className="mt-3 max-w-[44ch] text-muted">
          Merci. Je lis ton message et je te réponds par e-mail.
        </p>
        <Button
          variant="text"
          className="mt-6"
          onClick={() => {
            setStatus("idle");
            setMessage("");
          }}
        >
          Envoyer un autre message
        </Button>
      </div>
    );
  }

  const err = (name: keyof FieldErrors) =>
    errors[name]
      ? ({ "aria-invalid": true, "aria-describedby": id(`${name}-error`) } as const)
      : ({ "aria-invalid": false } as const);

  const fieldError = (name: keyof FieldErrors) =>
    errors[name] ? (
      <p id={id(`${name}-error`)} className="mt-2 text-sm text-red-400">
        {errors[name]}
      </p>
    ) : null;

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="grid gap-7">
      <div>
        <label htmlFor={id("name")} className="text-sm text-muted">
          Nom
        </label>
        <input
          id={id("name")}
          name="name"
          type="text"
          autoComplete="name"
          required
          maxLength={100}
          placeholder="Ton nom"
          className={fieldClass}
          {...err("name")}
        />
        {fieldError("name")}
      </div>

      <div>
        <label htmlFor={id("email")} className="text-sm text-muted">
          Adresse e-mail
        </label>
        <input
          id={id("email")}
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          required
          maxLength={200}
          placeholder="nom@exemple.com"
          className={fieldClass}
          {...err("email")}
        />
        {fieldError("email")}
      </div>

      <div className="grid gap-7 sm:grid-cols-2">
        <div>
          <label htmlFor={id("projectType")} className="text-sm text-muted">
            Type de projet
          </label>
          <select
            id={id("projectType")}
            name="projectType"
            required
            value={projectType}
            onChange={(e) => setProjectType(e.target.value)}
            className={cn(fieldClass, "cursor-pointer")}
            {...err("projectType")}
          >
            <option value="" disabled>
              Choisis dans la liste
            </option>
            {projectTypes.map((t) => (
              <option key={t} value={t} className="bg-bg text-fg">
                {t}
              </option>
            ))}
          </select>
          {fieldError("projectType")}
        </div>

        <div>
          <label htmlFor={id("budget")} className="text-sm text-muted">
            Budget <span className="opacity-70">(facultatif)</span>
          </label>
          <select
            id={id("budget")}
            name="budget"
            defaultValue=""
            className={cn(fieldClass, "cursor-pointer")}
          >
            <option value="">Non précisé</option>
            {budgetOptions.map((b) => (
              <option key={b} value={b} className="bg-bg text-fg">
                {b}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor={id("message")} className="text-sm text-muted">
          Message
        </label>
        <textarea
          id={id("message")}
          name="message"
          required
          rows={5}
          maxLength={4000}
          placeholder="Où en est ton idée ? Qu'attends-tu de ce projet ?"
          className={cn(fieldClass, "resize-y")}
          {...err("message")}
        />
        {fieldError("message")}
      </div>

      {/* Champ piège anti-spam : invisible, jamais rempli par un humain. */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={id("website")}>Ne pas remplir</label>
        <input
          id={id("website")}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {status === "error" && message && (
        <p
          role="alert"
          className="flex items-start gap-3 rounded-sm border border-red-400/50 bg-red-400/10 p-4 text-[0.95rem]"
        >
          <TriangleAlert aria-hidden className="mt-0.5 size-5 shrink-0 text-red-400" />
          <span>{message}</span>
        </p>
      )}

      <div>
        <Button
          type="submit"
          disabled={status === "sending"}
          className="w-full disabled:opacity-70 sm:w-auto"
        >
          {status === "sending" ? (
            <>
              <LoaderCircle aria-hidden className="size-4 animate-spin" />
              Envoi en cours
            </>
          ) : (
            <>
              Envoyer le message
              <Send aria-hidden className="size-4" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
