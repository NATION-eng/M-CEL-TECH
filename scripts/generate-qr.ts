import fs from "fs";
import path from "path";
import QRCode from "qrcode";

async function generateSiteQRCodes() {
  const siteUrl = "https://mceltech.com";
  const publicDir = path.join(process.cwd(), "public");

  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const svgPath = path.join(publicDir, "qr-code.svg");
  const pngPath = path.join(publicDir, "qr-code.png");

  // Generate high quality SVG
  const svgString = await QRCode.toString(siteUrl, {
    type: "svg",
    width: 600,
    margin: 2,
    color: {
      dark: "#0b132b",
      light: "#ffffff",
    },
    errorCorrectionLevel: "H",
  });

  fs.writeFileSync(svgPath, svgString, "utf8");
  console.log(`Generated SVG QR Code at: ${svgPath}`);

  // Generate high quality PNG
  await QRCode.toFile(pngPath, siteUrl, {
    width: 600,
    margin: 2,
    color: {
      dark: "#0b132b",
      light: "#ffffff",
    },
    errorCorrectionLevel: "H",
  });

  console.log(`Generated PNG QR Code at: ${pngPath}`);
}

generateSiteQRCodes()
  .then(() => console.log("QR Code generation completed successfully."))
  .catch((err) => {
    console.error("Error generating QR Codes:", err);
    process.exit(1);
  });
