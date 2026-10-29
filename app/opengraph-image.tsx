import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const alt = SITE.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0B0B0C",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 56,
              height: 56,
              borderRadius: 10,
              border: "1px solid #26262A",
              background: "#141416",
              color: "#C6F432",
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            AT
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 24, color: "#EDEDEA", fontWeight: 600 }}>{SITE.name}</span>
            <span style={{ fontSize: 16, color: "#A3A39E" }}>AI Automation &amp; AI Marketing</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 10, height: 10, borderRadius: 999, background: "#C6F432" }} />
            <span style={{ fontSize: 18, color: "#C6F432", letterSpacing: 2 }}>
              N8N · AI AGENTS · WEBSITES
            </span>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 68,
              fontWeight: 700,
              color: "#EDEDEA",
              lineHeight: 1.1,
              maxWidth: 940,
            }}
          >
            I build the AI systems that run your online business.
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 20, color: "#A3A39E" }}>{SITE.url.replace("https://", "")}</span>
          <span
            style={{
              fontSize: 18,
              color: "#0B0B0C",
              background: "#C6F432",
              padding: "10px 20px",
              borderRadius: 8,
              fontWeight: 600,
            }}
          >
            Free automation audit
          </span>
        </div>
      </div>
    ),
    size,
  );
}
