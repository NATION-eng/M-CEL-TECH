/** Base class for expected, user-facing failures. Anything else is treated as a 500. */
export class AppError extends Error {
  status: number;
  errors: string[];

  constructor(message: string, status = 400, errors: string[] = []) {
    super(message);
    this.name = "AppError";
    this.status = status;
    this.errors = errors;
  }
}

export class NotFoundError extends AppError {
  constructor(message = "Resource not found.") {
    super(message, 404);
    this.name = "NotFoundError";
  }
}

export class ConflictError extends AppError {
  constructor(message = "This request conflicts with the current state.") {
    super(message, 409);
    this.name = "ConflictError";
  }
}

export class ValidationError extends AppError {
  constructor(errors: string[], message = "Validation failed.") {
    super(message, 422, errors);
    this.name = "ValidationError";
  }
}
