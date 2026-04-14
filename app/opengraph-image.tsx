import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background:
            "linear-gradient(180deg, #fbf5ea 0%, #ead9b9 58%, #e2cca5 100%)",
          color: "#3A2418",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 18% 12%, rgba(255,191,94,0.28), transparent 24%), radial-gradient(circle at 82% 10%, rgba(24,63,107,0.14), transparent 20%)",
          }}
        />

        <div
          style={{
            position: "absolute",
            right: -60,
            top: -40,
            width: 560,
            height: 560,
            borderRadius: 9999,
            background: "radial-gradient(circle, rgba(255,170,79,0.28), rgba(255,170,79,0) 72%)",
          }}
        />

        <div
          style={{
            position: "absolute",
            right: 90,
            bottom: 72,
            width: 390,
            height: 320,
            opacity: 0.22,
            display: "flex",
          }}
        >
          <svg viewBox="0 0 390 320" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
            <path d="M0 300H390" stroke="#183F6B" strokeWidth="4" />
            <path d="M24 300V196H88V300" fill="#183F6B" />
            <path d="M50 196V72H66V196" fill="#183F6B" />
            <path d="M46 84H70L58 40L46 84Z" fill="#183F6B" />
            <path d="M144 300V136H248V300" fill="#183F6B" />
            <path d="M170 136C170 92 184 70 196 70C208 70 222 92 222 136H170Z" fill="#183F6B" />
            <path d="M286 300V184H340V300" fill="#183F6B" />
            <path d="M298 184H328V124H298V184Z" fill="#183F6B" />
          </svg>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "72px 76px",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 18,
              marginBottom: 24,
            }}
          >
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: 22,
                border: "2px solid rgba(24,63,107,0.15)",
                background: "rgba(248,243,234,0.88)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#183F6B",
                fontSize: 28,
                fontWeight: 700,
              }}
            >
              BK
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 54, fontWeight: 700, lineHeight: 1 }}>Baraka Cake</div>
              <div style={{ fontSize: 18, letterSpacing: 3, textTransform: "uppercase", opacity: 0.7 }}>
                Modern Khiva Bakery
              </div>
            </div>
          </div>

          <div style={{ fontSize: 72, lineHeight: 1.02, fontWeight: 700, maxWidth: 640 }}>
            Cakes, desserts and pastries in Khiva
          </div>
          <div style={{ marginTop: 22, fontSize: 28, lineHeight: 1.4, maxWidth: 720, color: "rgba(58,36,24,0.78)" }}>
            Custom cakes, daily pastries and local delivery with the warm atmosphere of Khiva.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
