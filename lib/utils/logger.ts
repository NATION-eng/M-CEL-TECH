type LogLevel = "info" | "warn" | "error";

function write(level: LogLevel, scope: string, message: string, meta?: Record<string, unknown>) {
  const entry = { level, scope, message, meta, timestamp: new Date().toISOString() };
  // Centralized here so the destination (console today; a service like
  // Sentry/Logtail/Datadog tomorrow) can change without touching call sites.
  if (level === "error") console.error(entry);
  else if (level === "warn") console.warn(entry);
  else console.log(entry);
}

export const logger = {
  info: (scope: string, message: string, meta?: Record<string, unknown>) => write("info", scope, message, meta),
  warn: (scope: string, message: string, meta?: Record<string, unknown>) => write("warn", scope, message, meta),
  error: (scope: string, message: string, meta?: Record<string, unknown>) => write("error", scope, message, meta),
};
