import { ImageResponse } from "next/og";
import { site } from "@/lib/data";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#05070a",
          backgroundImage:
            "radial-gradient(circle at 15% 20%, rgba(34,229,255,0.18), transparent 55%), radial-gradient(circle at 85% 85%, rgba(124,92,255,0.15), transparent 55%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 32,
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: "#22e5ff",
              display: "flex",
            }}
          />
          <span style={{ color: "#22e5ff", fontSize: 24, fontFamily: "monospace" }}>
            Open to fresher / junior Full Stack roles
          </span>
        </div>
        <div
          style={{
            fontSize: 92,
            fontWeight: 800,
            color: "#e6edf3",
            lineHeight: 1.05,
            display: "flex",
          }}
        >
          {site.name}
        </div>
        <div
          style={{
            fontSize: 40,
            color: "#22e5ff",
            marginTop: 20,
            fontFamily: "monospace",
            display: "flex",
          }}
        >
          {`> ${site.role}`}
        </div>
        <div
          style={{
            fontSize: 26,
            color: "#94a3b8",
            marginTop: 28,
            maxWidth: 900,
            display: "flex",
          }}
        >
          {site.tagline}
        </div>
      </div>
    ),
    { ...size }
  );
}
