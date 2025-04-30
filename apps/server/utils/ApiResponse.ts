import { Response } from "express";

export const SuccessResponse = (
  res: Response,
  message: string,
  statusCode: number | null,
  payload: any = null
) => {
  res.status(statusCode ?? 200).json({
    success: true,
    message: message + ". 🚀",
    payload: payload,
  });
};

export const ErrorResponse = (
  res: Response,
  message: string,
  statusCode: number | null
) => {
  res.status(statusCode ?? 500).json({
    success: false,
    message: statusCode
      ? message + ". ⚠️"
      : "Something went wrong on our end 😓",
    payload: null,
  });
};
