import { logger } from "@/lib/utils/logger";
import { apiError } from "@/lib/utils/api-response";
import { AppError } from "@/lib/utils/errors";

/**
 * Centralized error handling for every route handler. Expected failures
 * (AppError and its subclasses) surface their message to the client.
 * Anything unexpected is logged in full internally and reduced to a
 * generic message — stack traces and internal details never reach the
 * response body.
 */
export function handleApiError(scope: string, err: unknown) {
  if (err instanceof AppError) {
    logger.warn(scope, err.message, { errors: err.errors, status: err.status });
    return apiError(err.message, err.errors, err.status);
  }

  logger.error(scope, "Unexpected error", {
    error: err instanceof Error ? { message: err.message, stack: err.stack } : err,
  });
  return apiError("Something went wrong. Please try again shortly.", [], 500);
}
