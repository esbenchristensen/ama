import { ImageResponse } from "next/og";
import { anton } from "@/lib/og-assets";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#e11d2e",
          color: "#f3f2ee",
          fontFamily: "Anton",
          fontSize: 112,
          letterSpacing: "-0.06em",
          lineHeight: 1,
        }}
      >
        A
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Anton", data: anton, weight: 400, style: "normal" }],
    },
  );
}
