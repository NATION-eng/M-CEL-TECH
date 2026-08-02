type ConfirmationEmailParams = {
  fullName: string;
  programTitle: string;
  cohortLabel: string;
  amountFormatted: string;
  receiptNumber: string;
};

/**
 * Premium, fully-styled responsive HTML template for the registration confirmation & welcome email.
 * Dispatched automatically via Resend upon successful Paystack payment confirmation.
 */
export function renderRegistrationConfirmationEmail({
  fullName,
  programTitle,
  cohortLabel,
  amountFormatted,
  receiptNumber,
}: ConfirmationEmailParams): string {
  const year = new Date().getFullYear();

  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to M-CEL TECH Bootcamp</title>
  </head>
  <body style="margin:0;padding:0;background-color:#050816;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#E2E8F0;">
    <div style="max-width:600px;margin:32px auto;background-color:#0F172A;border-radius:16px;overflow:hidden;border:1px solid rgba(255,255,255,0.12);box-shadow:0 20px 40px rgba(0,0,0,0.5);">
      
      <!-- Header Banner -->
      <div style="background:linear-gradient(135deg, #0A1128 0%, #1E293B 100%);padding:32px 36px;border-bottom:1px solid rgba(34,211,238,0.2);text-align:left;">
        <div style="font-size:24px;font-weight:900;letter-spacing:-0.03em;color:#FFFFFF;">
          M-CEL<span style="color:#22D3EE;">TECH</span>
        </div>
        <div style="margin-top:6px;font-size:12px;font-weight:600;letter-spacing:0.05em;color:#94A3B8;text-transform:uppercase;">
          Engineering Tomorrow's Technology, Today
        </div>
      </div>

      <!-- Main Welcome Content -->
      <div style="padding:36px;">
        <div style="display:inline-block;padding:6px 14px;background-color:rgba(34,211,238,0.12);border:1px solid rgba(34,211,238,0.3);border-radius:20px;color:#22D3EE;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:20px;">
          ✓ Seat Confirmed
        </div>

        <h1 style="margin:0 0 16px;font-size:24px;font-weight:800;color:#FFFFFF;line-height:1.3;">
          Welcome to the Bootcamp, ${fullName}! 🎉
        </h1>

        <p style="margin:0 0 20px;font-size:15px;line-height:1.6;color:#CBD5E1;">
          Thank you for registering. Your payment of <strong>${amountFormatted}</strong> has been successfully processed, and your place in the <strong>${programTitle}</strong> is officially reserved.
        </p>

        <!-- Official Receipt Summary Card -->
        <div style="background-color:#1E293B;border-radius:12px;padding:24px;margin:28px 0;border:1px solid rgba(255,255,255,0.08);">
          <div style="font-size:12px;font-weight:800;color:#22D3EE;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:16px;">
            Registration & Payment Receipt
          </div>
          <table style="width:100%;border-collapse:collapse;font-size:14px;">
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);color:#94A3B8;">Programme</td>
              <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);text-align:right;font-weight:700;color:#FFFFFF;">${programTitle}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);color:#94A3B8;">Schedule / Cohort</td>
              <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);text-align:right;font-weight:700;color:#FFFFFF;">${cohortLabel || "Evening Class — Aug 5 to Aug 20, 2026"}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);color:#94A3B8;">Amount Paid</td>
              <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);text-align:right;font-weight:700;color:#22D3EE;">${amountFormatted}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;color:#94A3B8;">Receipt Number</td>
              <td style="padding:10px 0;text-align:right;font-family:monospace;font-weight:700;color:#FFFFFF;">${receiptNumber}</td>
            </tr>
          </table>
        </div>

        <!-- Next Steps / Onboarding Box -->
        <div style="background-color:rgba(37,99,235,0.1);border-left:4px solid #2563EB;border-radius:4px 8px 8px 4px;padding:20px;margin-bottom:28px;">
          <div style="font-size:14px;font-weight:700;color:#FFFFFF;margin-bottom:6px;">
            📌 Next Onboarding Steps:
          </div>
          <ul style="margin:0;padding-left:18px;font-size:13px;line-height:1.7;color:#CBD5E1;">
            <li>Keep this email and your Receipt Number (<strong>${receiptNumber}</strong>) for your records.</li>
            <li>Our training team will reach out via WhatsApp / Email with onboarding materials and session access details prior to day one.</li>
            <li>Make sure to have a working laptop and internet connection ready for hands-on exercises.</li>
          </ul>
        </div>

        <!-- Direct WhatsApp Contact Button -->
        <div style="text-align:center;margin:32px 0 16px;">
          <a href="https://wa.me/2348116079309?text=${encodeURIComponent(`Hello M-CEL TECH, I've completed registration for ${programTitle}. Receipt Number: ${receiptNumber}`)}"
             style="display:inline-block;background:linear-gradient(135deg, #2563EB 0%, #22D3EE 100%);color:#FFFFFF;font-size:14px;font-weight:800;text-decoration:none;padding:14px 28px;border-radius:30px;box-shadow:0 4px 14px rgba(34,211,238,0.4);">
            Connect on WhatsApp for Quick Onboarding →
          </a>
        </div>
      </div>

      <!-- Footer -->
      <div style="padding:24px 36px;background-color:#0A1128;border-top:1px solid rgba(255,255,255,0.08);text-align:center;font-size:12px;color:#64748B;line-height:1.5;">
        <p style="margin:0 0 6px;">Questions? Email us at <a href="mailto:training@mceltech.com" style="color:#22D3EE;text-decoration:none;">training@mceltech.com</a> or call 08161237136.</p>
        <p style="margin:0;">&copy; ${year} M-CEL TECH. All rights reserved. 2nd Floor, Salije Plaza, Ada George Road, Port Harcourt, Nigeria.</p>
      </div>

    </div>
  </body>
  </html>`;
}
