/** Any email vendor can implement this — the rest of the app never imports Resend directly. */
export type EmailPayload = { to: string; subject: string; html: string };
export type EmailProvider = { send: (payload: EmailPayload) => Promise<{ id: string }> };
