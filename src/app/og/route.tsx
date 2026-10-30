import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

/** Image de partage générée automatiquement (1200×630). Remplaçable via profile.seo.ogImage. */
export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#090d1b",
          color: "#ece9e1",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 56,
              background: "#a594ff",
            }}
          />
          <div style={{ fontSize: 30, color: "#9096a8" }}>{profile.jobTitle}</div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 112,
            fontWeight: 800,
            lineHeight: 1,
            letterSpacing: -4,
          }}
        >
          <span>{profile.displayName}</span>
          <span style={{ color: "#a594ff", fontSize: 54, letterSpacing: -1, marginTop: 24, fontWeight: 600 }}>
            Portfolio
          </span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
