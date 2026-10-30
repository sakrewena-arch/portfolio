import { NextResponse } from "next/server";
import { Resend } from "resend";
import { profile } from "@/data/profile";
import { contactSchema, flattenErrors } from "@/lib/validation";

/**
 * Route d'envoi du formulaire de contact.
 *
 * Variables d'environnement (voir .env.example) :
 *   RESEND_API_KEY      clé secrète Resend (jamais exposée au navigateur)
 *   CONTACT_TO_EMAIL    adresse qui reçoit les messages (sinon profile.email)
 *   CONTACT_FROM_EMAIL  expéditeur vérifié sur Resend (sinon l'adresse de test Resend)
 *
 * Protections : validation serveur, champ piège, délai minimal, limite de débit par IP
 * (en mémoire : efficace par instance, voir README), contrôle de l'origine.
 */

const MAX_BODY_BYTES = 20_000;
const MIN_FILL_MS = 2_500;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  // Évite une croissance infinie de la table.
  if (hits.size > 5_000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
    }
  }
  return false;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const oneLine = (value: string) => value.replace(/[\r\n]+/g, " ").trim();

export async function POST(request: Request) {
  // Contrôle de l'origine : le formulaire ne doit être envoyé que depuis ce site.
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (origin && host) {
    try {
      if (new URL(origin).host !== host) {
        return NextResponse.json({ error: "Origine non autorisée." }, { status: 403 });
      }
    } catch {
      return NextResponse.json({ error: "Origine non autorisée." }, { status: 403 });
    }
  }

  const length = Number(request.headers.get("content-length") ?? 0);
  if (length > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "Message trop volumineux." }, { status: 413 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    // Un champ piège rempli fait échouer le schéma : on répond comme si tout allait bien.
    const honeypotFilled =
      typeof body === "object" &&
      body !== null &&
      "website" in body &&
      Boolean((body as { website?: unknown }).website);
    if (honeypotFilled) return NextResponse.json({ ok: true });
    return NextResponse.json({ errors: flattenErrors(parsed.error) }, { status: 400 });
  }
  const data = parsed.data;

  if (data.startedAt && Date.now() - data.startedAt < MIN_FILL_MS) {
    return NextResponse.json(
      { error: "Envoi trop rapide. Patiente un instant puis réessaie." },
      { status: 429 },
    );
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "Trop de messages envoyés. Réessaie dans quelques minutes." },
      { status: 429 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || profile.email;
  const from =
    process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>";

  if (!apiKey || !to) {
    const missing = [!apiKey && "RESEND_API_KEY", !to && "CONTACT_TO_EMAIL"]
      .filter(Boolean)
      .join(" et ");
    console.warn(`[contact] Envoi impossible : ${missing} non configuré.`);
    return NextResponse.json(
      {
        code: "not_configured",
        error: "L'envoi de messages n'est pas encore disponible sur ce site.",
        ...(process.env.NODE_ENV !== "production" && {
          devHint: `Service d'envoi non configuré : renseigne ${missing} dans .env.local (voir .env.example), puis relance le serveur. Aucun message n'a été envoyé.`,
        }),
      },
      { status: 503 },
    );
  }

  const name = oneLine(data.name);
  const budget = data.budget || "Non précisé";

  const text = [
    `Nom : ${name}`,
    `E-mail : ${data.email}`,
    `Type de projet : ${data.projectType}`,
    `Budget : ${budget}`,
    "",
    data.message,
  ].join("\n");

  const html = `
    <div style="font-family:system-ui,sans-serif;line-height:1.6;color:#111">
      <h2 style="margin:0 0 12px">Nouveau message depuis le portfolio</h2>
      <p><strong>Nom :</strong> ${escapeHtml(name)}<br/>
      <strong>E-mail :</strong> ${escapeHtml(data.email)}<br/>
      <strong>Type de projet :</strong> ${escapeHtml(data.projectType)}<br/>
      <strong>Budget :</strong> ${escapeHtml(budget)}</p>
      <hr style="border:none;border-top:1px solid #ddd"/>
      <p style="white-space:pre-wrap">${escapeHtml(data.message)}</p>
    </div>`;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: data.email,
      subject: `Portfolio · ${oneLine(data.projectType)} · ${name}`.slice(0, 200),
      text,
      html,
    });

    if (error) {
      console.error("[contact] Erreur Resend :", error);
      return NextResponse.json(
        { error: "Le message n'a pas pu être envoyé. Réessaie dans un instant." },
        { status: 502 },
      );
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[contact] Exception à l'envoi :", e);
    return NextResponse.json(
      { error: "Le message n'a pas pu être envoyé. Réessaie dans un instant." },
      { status: 502 },
    );
  }
}
