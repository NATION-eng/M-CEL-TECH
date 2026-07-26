import { createBrowserClient } from "@supabase/ssr";

/**
 * Client-side Supabase instance using the public anon key. Safe to use
 * in Client Components. Reserved for future features (e.g. merging in
 * the existing waitlist) — registration writes go through Prisma via
 * server actions, not this client.
 */
export function createSupabaseBrowserClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
