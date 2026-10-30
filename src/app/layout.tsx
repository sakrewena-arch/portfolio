import type { Metadata, Viewport } from "next";
import "./globals.css";
import { profile, siteUrl } from "@/data/profile";
import { navigation, options, sections } from "@/data/site";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { getSocialLinks } from "@/lib/server";

const ogImage = profile.seo.ogImage || "/og";

// Base des URLs absolues (images de partage). Le domaine canonique n'est déclaré que si NEXT_PUBLIC_SITE_URL est défini.
const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;
const metadataBase = new URL(
  siteUrl || (vercelHost ? `https://${vercelHost}` : "http://localhost:3000"),
);

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: `${profile.displayName} · ${profile.seo.title}`,
    template: `%s · ${profile.displayName}`,
  },
  description: profile.seo.description,
  applicationName: `${profile.displayName} · Portfolio`,
  authors: [{ name: profile.displayName }],
  // Balise canonique uniquement lorsque le domaine est connu.
  alternates: siteUrl ? { canonical: "/" } : undefined,
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: `${profile.displayName} · Portfolio`,
    title: `${profile.displayName} · ${profile.seo.title}`,
    description: profile.seo.description,
    images: [{ url: ogImage, width: 1200, height: 630, alt: profile.displayName }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.displayName} · ${profile.seo.title}`,
    description: profile.seo.description,
    images: [ogImage],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#090d1b" },
    { media: "(prefers-color-scheme: light)", color: "#f1efea" },
  ],
};

// Applique le thème enregistré avant le premier rendu (évite tout flash) ; sombre par défaut.
const themeScript = `try{var t=localStorage.getItem("theme");document.documentElement.dataset.theme=t==="light"||t==="dark"?t:"dark"}catch(e){document.documentElement.dataset.theme="dark"}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  const navItems = navigation.filter((item) => {
    switch (item.id) {
      case "a-propos":
        return sections.about;
      case "competences":
        return sections.skills;
      case "projets":
        return sections.projects;
      case "experiences":
        return sections.experiences;
      case "contact":
        return sections.contact;
      default:
        return true;
    }
  });

  const sameAs = getSocialLinks()
    .filter((l) => l.href.startsWith("http"))
    .map((l) => l.href);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.displayName,
    jobTitle: profile.jobTitle,
    description: profile.seo.description,
    ...(siteUrl && { url: siteUrl }),
    ...(sameAs.length > 0 && { sameAs }),
  };

  return (
    <html lang="fr" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body className="grain flex min-h-svh flex-col">
        <MotionProvider>
          <a
            href="#main"
            className="fixed left-4 top-4 z-[80] -translate-y-24 rounded-full bg-accent px-5 py-3 text-accent-ink transition-transform focus:translate-y-0"
          >
            Aller au contenu
          </a>
          <Navbar name={profile.displayName} items={navItems} />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          {options.customCursor && <CustomCursor />}
        </MotionProvider>
      </body>
    </html>
  );
}
