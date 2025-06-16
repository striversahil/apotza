import type { Context } from "hono";

export const SuccessResponse = (
  c: Context,
  message: string,
  payload: any = null
) => {
  return c.json({
    success: true,
    message: message + ". 🚀",
    payload: payload,
  });
};

export const ErrorResponse = (
  c: Context,
  message?: string,
  internal?: boolean
) => {
  return c.json({
    success: false,
    message: internal ? "Something went wrong on our end 😓" : message + ". ⚠️",
    payload: null,
  });
};
