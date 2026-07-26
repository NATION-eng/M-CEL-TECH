type AdminNotificationParams = {
  message: string;
};

/** Plain internal notification email — no branding polish needed since only staff see it. */
export function renderAdminNotificationEmail({ message }: AdminNotificationParams): string {
  return `
  <div style="font-family:Arial,Helvetica,sans-serif;padding:24px;color:#1B2333;">
    <h2 style="margin:0 0 12px;font-size:16px;color:#0A1128;">M-CEL TECH — Internal Notification</h2>
    <pre style="white-space:pre-wrap;font-family:inherit;font-size:14px;line-height:1.6;background:#F6F8FC;border-radius:8px;padding:16px;">${message}</pre>
  </div>`;
}
