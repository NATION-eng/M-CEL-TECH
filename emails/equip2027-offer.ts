import { EQUIP_2027, calculateEquipSavings } from "@/constants/equip2027";
import { formatNaira } from "@/lib/utils";
import { SITE } from "@/constants/site";

export type EquipOfferEmailParams = {
  fullName: string;
  email: string;
  referenceCode: string;
  conference: string;
  localChurch: string;
  slots: number;
  trackLabel: string;
  amountNaira: number;
  paymentUrl?: string;
  whatsappLink: string;
};

/**
 * Premium, fully-styled responsive HTML email template for the EQUIP 2027 CSR Subsidized Scholarship Offer.
 * Dispatched automatically via Resend upon application submission.
 */
export function renderEquipOfferEmail(params: EquipOfferEmailParams): string {
  const savings = calculateEquipSavings(params.slots);
  const formattedAmount = formatNaira(params.amountNaira);
  const formattedMinSaved = formatNaira(savings.minSaved);
  const formattedMaxSaved = formatNaira(savings.maxSaved);
  const year = new Date().getFullYear();

  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>EQUIP 2027 CSR Subsidized Scholarship Offer</title>
  </head>
  <body style="margin:0;padding:0;background-color:#050816;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#E2E8F0;">
    <div style="max-width:620px;margin:32px auto;background-color:#0F172A;border-radius:16px;overflow:hidden;border:1px solid rgba(255,255,255,0.12);box-shadow:0 25px 50px rgba(0,0,0,0.6);">
      
      <!-- Top Brand Bar -->
      <div style="background:linear-gradient(135deg, #0A1128 0%, #1E293B 100%);padding:32px 36px;border-bottom:1px solid rgba(34,211,238,0.25);">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <div style="font-size:24px;font-weight:900;letter-spacing:-0.03em;color:#FFFFFF;">
            M-CEL<span style="color:#22D3EE;">TECH</span>
          </div>
          <div style="font-size:11px;font-weight:700;color:#22D3EE;background-color:rgba(34,211,238,0.12);border:1px solid rgba(34,211,238,0.3);padding:4px 10px;border-radius:20px;text-transform:uppercase;letter-spacing:0.05em;">
            CSR Subsidized Scholarship
          </div>
        </div>
        <div style="margin-top:6px;font-size:12px;font-weight:600;letter-spacing:0.05em;color:#94A3B8;text-transform:uppercase;">
          EQUIP 2027 • Technology Empowerment Initiative
        </div>
      </div>

      <!-- Main Body -->
      <div style="padding:36px;">
        <div style="display:inline-block;padding:6px 14px;background-color:rgba(34,211,238,0.1);border:1px solid rgba(34,211,238,0.3);border-radius:20px;color:#22D3EE;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:20px;">
          ✓ Official Scholarship Offer Issued
        </div>

        <h1 style="margin:0 0 16px;font-size:24px;font-weight:800;color:#FFFFFF;line-height:1.3;">
          Congratulations, ${params.fullName}! 🎓
        </h1>

        <p style="margin:0 0 20px;font-size:15px;line-height:1.65;color:#CBD5E1;">
          We are pleased to inform you that your application for the <strong>EQUIP 2027 CSR Subsidized Scholarship</strong> has been received and approved under the <strong>${params.conference} Conference</strong> (<em>${params.localChurch}</em>).
        </p>

        <!-- Scholarship Offer Details Card -->
        <div style="background-color:#1E293B;border-radius:12px;padding:24px;margin:28px 0;border:1px solid rgba(255,255,255,0.08);">
          <div style="font-size:12px;font-weight:800;color:#22D3EE;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:16px;">
            Scholarship Award & Fee Summary
          </div>
          <table style="width:100%;border-collapse:collapse;font-size:14px;">
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);color:#94A3B8;">Application Reference</td>
              <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);text-align:right;font-family:monospace;font-weight:700;color:#22D3EE;">${params.referenceCode}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);color:#94A3B8;">Affiliation</td>
              <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);text-align:right;font-weight:600;color:#FFFFFF;">${params.conference} • ${params.localChurch}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);color:#94A3B8;">Selected Track</td>
              <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);text-align:right;font-weight:600;color:#FFFFFF;">${params.trackLabel}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);color:#94A3B8;">Allocated Slots</td>
              <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);text-align:right;font-weight:700;color:#FFFFFF;">${params.slots} ${params.slots > 1 ? "Seats" : "Seat"}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);color:#94A3B8;">Standard Value</td>
              <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);text-align:right;color:#94A3B8;text-decoration:line-through;">₦${(15000 * params.slots).toLocaleString()} – ₦${(25000 * params.slots).toLocaleString()}</td>
            </tr>
            <tr>
              <td style="padding:12px 0 6px;color:#94A3B8;font-size:15px;font-weight:700;">Subsidized Payable Fee</td>
              <td style="padding:12px 0 6px;text-align:right;font-size:18px;font-weight:800;color:#22D3EE;">${formattedAmount}</td>
            </tr>
            <tr>
              <td colspan="2" style="padding-top:4px;font-size:12px;color:#10B981;text-align:right;font-weight:600;">
                ✓ Subsidized CSR Grant Applied (You save ${formattedMinSaved} to ${formattedMaxSaved})
              </td>
            </tr>
          </table>
        </div>

        <!-- Corporate Bank Transfer Details -->
        <div style="background-color:rgba(30,41,59,0.7);border-radius:12px;padding:22px;margin:24px 0;border:1px solid rgba(255,255,255,0.1);">
          <div style="font-size:13px;font-weight:700;color:#FFFFFF;margin-bottom:10px;">
            🏦 Official Bank Transfer Details (M-CEL TECH Corporate Account)
          </div>
          <table style="width:100%;font-size:13px;line-height:1.7;color:#CBD5E1;">
            <tr>
              <td style="width:120px;color:#94A3B8;">Bank Name:</td>
              <td style="font-weight:700;color:#FFFFFF;">${EQUIP_2027.corporateBank.bankName}</td>
            </tr>
            <tr>
              <td style="color:#94A3B8;">Account Name:</td>
              <td style="font-weight:700;color:#FFFFFF;">${EQUIP_2027.corporateBank.accountName}</td>
            </tr>
            <tr>
              <td style="color:#94A3B8;">Account Number:</td>
              <td style="font-size:16px;font-weight:900;letter-spacing:0.05em;color:#22D3EE;">${EQUIP_2027.corporateBank.accountNumber}</td>
            </tr>
            <tr>
              <td style="color:#94A3B8;">Transfer Narration:</td>
              <td style="font-family:monospace;font-size:12px;color:#FCD34D;">${EQUIP_2027.corporateBank.narrationPrefix}-${params.referenceCode}</td>
            </tr>
          </table>
        </div>

        ${
          params.paymentUrl
            ? `
        <!-- Online Payment CTA -->
        <div style="text-align:center;margin:30px 0 20px;">
          <a href="${params.paymentUrl}"
             style="display:inline-block;background:linear-gradient(135deg, #2563EB 0%, #22D3EE 100%);color:#FFFFFF;font-size:15px;font-weight:800;text-decoration:none;padding:15px 32px;border-radius:30px;box-shadow:0 4px 18px rgba(34,211,238,0.45);">
            Pay Subsidized Fee Online (${formattedAmount}) →
          </a>
        </div>
        `
            : ""
        }

        <!-- Step 2 WhatsApp Cadence -->
        <div style="background-color:rgba(16,185,129,0.08);border:1px solid rgba(16,185,129,0.25);border-radius:12px;padding:20px;margin:24px 0;">
          <div style="font-size:14px;font-weight:700;color:#FFFFFF;margin-bottom:6px;">
            💬 Step 2: Connect with Enrollment Team on WhatsApp
          </div>
          <p style="margin:0 0 14px;font-size:13px;line-height:1.6;color:#CBD5E1;">
            Our Enrollment Coordinator is on standby to assist with track confirmation, device preparation, receipt verification, and onboarding:
          </p>
          <div style="text-align:left;">
            <a href="${params.whatsappLink}"
               style="display:inline-block;background-color:#10B981;color:#FFFFFF;font-size:13px;font-weight:700;text-decoration:none;padding:10px 20px;border-radius:24px;">
              Chat with Enrollment Team on WhatsApp →
            </a>
          </div>
        </div>

        <!-- Terms & Quota Notice -->
        <div style="font-size:12px;line-height:1.6;color:#94A3B8;border-top:1px solid rgba(255,255,255,0.08);padding-top:20px;margin-top:28px;">
          <p style="margin:0 0 6px;">
            ⚠️ <strong>Notice on Quota:</strong> Subsidized scholarship allocations are capped per conference and confirmed on a first-completed basis. Kickoff is <strong>${EQUIP_2027.kickoffDate}</strong>.
          </p>
          <p style="margin:0;">
            For enquiries or sponsorship confirmation letters, email <a href="mailto:${SITE.contactEmail}" style="color:#22D3EE;">${SITE.contactEmail}</a> or call ${SITE.whatsappDisplayNumber}.
          </p>
        </div>

      </div>

      <!-- Footer -->
      <div style="background-color:#0A1128;padding:24px 36px;border-top:1px solid rgba(255,255,255,0.08);font-size:11px;color:#64748B;line-height:1.5;">
        <div style="font-weight:700;color:#94A3B8;margin-bottom:4px;">
          M-CEL TECH INTEGRATED SERVICES • RC 7196024
        </div>
        <div>
          ${SITE.officeAddress}
        </div>
        <div style="margin-top:8px;">
          © ${year} M-CEL TECH. All rights reserved.
        </div>
      </div>

    </div>
  </body>
  </html>
  `;
}
