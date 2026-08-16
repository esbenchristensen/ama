import { ImageResponse } from "next/og";
import { anton } from "@/lib/og-assets";

export const size = { width: 192, height: 192 };
export const contentType = "image/png";

export default function Icon() {
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
          fontSize: 128,
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
