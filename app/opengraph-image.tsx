import { ImageResponse } from "next/og";

export const alt = "Exclimo | Private Luxury Chauffeur Service in the DMV";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#111111",
          padding: "80px",
        }}
      >
        <div
          style={{
            display: "flex",
            color: "#9e9ea0",
            fontSize: 26,
            letterSpacing: 10,
            textTransform: "uppercase",
          }}
        >
          Private chauffeur service · DC · MD · VA
        </div>
        <div
          style={{
            display: "flex",
            color: "#ffffff",
            fontSize: 170,
            fontWeight: 700,
            lineHeight: 1,
            marginTop: 24,
            letterSpacing: -2,
          }}
        >
          EXCLIMO
        </div>
        <div
          style={{
            display: "flex",
            color: "#ffffff",
            fontSize: 34,
            marginTop: 32,
          }}
        >
          Arrive in excellence. Fixed quotes, flight tracking, 24/7.
        </div>
        <div
          style={{
            display: "flex",
            color: "#9e9ea0",
            fontSize: 28,
            marginTop: 18,
          }}
        >
          571-525-6666 · Reston, VA
        </div>
      </div>
    ),
    { ...size }
  );
}
