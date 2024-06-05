import type { Response } from "express";
import type { ValidationError } from "express-validator";

function isValidationError(
  errors: string | ValidationError[]
): errors is ValidationError[] {
  return (errors as ValidationError[])[0].location !== undefined;
}

export const response_handler = ({
  res,
  status,
  content,
  message,
  errors,
}: {
  res: Response;
  status: number;
  content?: unknown;
  message?: string;
  errors?: string | ValidationError[];
}): Response => {
  if (errors) {
    if (isValidationError(errors)) {
      return res.status(status).json({
        content: content ?? null,
        message,
        errors,
      });
    }

    return res.status(status).json({
      content: content ?? null,
      message,
      errors: errors.split("\n").map((err) => err.trim()),
    });
  }

  return res.status(status).json({
    content,
    message: message ?? "Success",
    errors: [],
  });
};
