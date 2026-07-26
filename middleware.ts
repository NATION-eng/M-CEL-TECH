import { NextRequest, NextResponse } from "next/server";

/**
 * Lightweight Origin check for state-changing requests to sensitive
 * routes. This is not a full CSRF solution — it only rejects requests
 * that carry a browser-set Origin header pointing at a different host.
 * Server-to-server callers (mobile apps, curl, the Paystack webhook,
 * which lives outside this matcher entirely) don't send a matching
 * Origin and are unaffected.
 */
export function middleware(request: NextRequest) {
  const origin = request.headers.get("origin");
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (origin && siteUrl) {
    try {
      if (new URL(origin).host !== new URL(siteUrl).host) {
        return NextResponse.json(
          { success: false, message: "Invalid origin.", errors: [] },
          { status: 403 }
        );
      }
    } catch {
      // Malformed origin/site URL — fall through rather than 500ing the request.
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/register", "/api/payment/:path*", "/api/contact"],
};
