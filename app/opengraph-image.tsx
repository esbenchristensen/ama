import { ImageResponse } from "next/og";
import {
  anton,
  dataUrl,
  loadLogoWhite,
  loadOgFighter,
} from "@/lib/og-assets";

export const alt =
  "Kampsport i Aalborg. Fra første træning til landshold. Aalborg Martial Arts i Nordkraft.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const [logoWhite, ogFighter] = await Promise.all([
    loadLogoWhite(),
    loadOgFighter(),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#080808",
          color: "#f3f2ee",
          fontFamily: "Anton",
        }}
      >
        <div
          style={{
            width: 8,
            height: "100%",
            background: "#e11d2e",
          }}
        />

        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "56px 52px 48px 56px",
          }}
        >
          <img
            src={dataUrl(logoWhite, "image/png")}
            width={220}
            height={94}
            alt=""
          />

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                color: "#e11d2e",
                fontSize: 22,
                letterSpacing: "0.22em",
                marginBottom: 18,
              }}
            >
              NORDKRAFT · AALBORG
            </div>
            <div
              style={{
                fontSize: 86,
                lineHeight: 0.88,
                letterSpacing: "-0.02em",
              }}
            >
              KOM SOM DU ER
            </div>
            <div
              style={{
                fontSize: 86,
                lineHeight: 0.88,
                letterSpacing: "-0.02em",
                color: "#e11d2e",
                marginTop: 6,
              }}
            >
              I DIT TEMPO
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            <div
              style={{
                width: 72,
                height: 4,
                background: "#e11d2e",
              }}
            />
            <div
              style={{
                fontSize: 22,
                letterSpacing: "0.08em",
                color: "rgba(243,242,238,0.72)",
              }}
            >
              BØRN, MOTION OG KAMPHOLD. SAMME KLUB.
            </div>
          </div>
        </div>

        <div
          style={{
            width: 430,
            height: "100%",
            display: "flex",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <img
            src={dataUrl(ogFighter, "image/jpeg")}
            width={430}
            height={630}
            alt=""
            style={{
              objectFit: "cover",
              objectPosition: "center top",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(90deg, #080808 0%, rgba(8,8,8,0.15) 28%, transparent 55%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, transparent 62%, rgba(8,8,8,0.55) 100%)",
            }}
          />
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Anton", data: anton, weight: 400, style: "normal" }],
    },
  );
}
