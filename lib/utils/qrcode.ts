import QRCode from "qrcode";

export interface QRCodeOptions {
  width?: number;
  margin?: number;
  color?: {
    dark?: string;
    light?: string;
  };
}

/**
 * Generates a Base64 Data URL for a QR Code
 */
export async function generateQRCodeDataURL(
  text: string,
  options?: QRCodeOptions
): Promise<string> {
  try {
    return await QRCode.toDataURL(text, {
      width: options?.width ?? 300,
      margin: options?.margin ?? 2,
      color: {
        dark: options?.color?.dark ?? "#000000",
        light: options?.color?.light ?? "#FFFFFF",
      },
      errorCorrectionLevel: "H",
    });
  } catch (err) {
    console.error("Failed to generate QR code Data URL", err);
    throw err;
  }
}

/**
 * Generates an SVG string representation for a QR Code
 */
export async function generateQRCodeSVG(
  text: string,
  options?: QRCodeOptions
): Promise<string> {
  try {
    return await QRCode.toString(text, {
      type: "svg",
      width: options?.width ?? 300,
      margin: options?.margin ?? 2,
      color: {
        dark: options?.color?.dark ?? "#000000",
        light: options?.color?.light ?? "#FFFFFF",
      },
      errorCorrectionLevel: "H",
    });
  } catch (err) {
    console.error("Failed to generate QR code SVG", err);
    throw err;
  }
}
