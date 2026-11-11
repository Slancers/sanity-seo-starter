import { ImageResponse } from "next/og";
import { site } from "@/config/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Colors mirror the :root variables in globals.css (ImageResponse can't read CSS variables).
const colors = {
  dark: "#14231C",
  navy: "#1D3329",
  brand: "#2F6B4F",
  accent: "#C08A4E",
  light: "#F3EFE6",
};

export default function OgImage() {
  const host = site.url.replace(/^https?:\/\//, "");
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: `linear-gradient(135deg, ${colors.dark} 0%, ${colors.navy} 55%, ${colors.brand} 100%)`,
          padding: "60px 80px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            style={{
              width: "72px",
              height: "72px",
              borderRadius: "18px",
              background: colors.brand,
              border: `2px solid ${colors.accent}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "40px",
              fontWeight: 700,
              color: "white",
            }}
          >
            {site.name.charAt(0)}
          </div>
          <span style={{ fontSize: "56px", fontWeight: 700, color: "white", letterSpacing: "-1px" }}>
            {site.name}
          </span>
        </div>

        <div style={{ width: "80px", height: "2px", background: colors.accent, margin: "40px 0" }} />

        <div
          style={{
            fontSize: "30px",
            fontWeight: 600,
            color: colors.light,
            textAlign: "center",
            lineHeight: 1.4,
            maxWidth: "860px",
          }}
        >
          {site.tagline}
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "32px",
            fontSize: "16px",
            color: "rgba(243, 239, 230, 0.6)",
          }}
        >
          {host}
        </div>
      </div>
    ),
    { ...size }
  );
}
