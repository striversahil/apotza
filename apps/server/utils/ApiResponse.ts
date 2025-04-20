import { Response } from "express";

export const SuccessResponse = (
  res: Response,
  message: string,
  payload: any = null
) => {
  res.status(200).json({
    success: true,
    message: message + ". 🚀",
    payload: payload,
  });
};

export const ErrorResponse = (
  res: Response,
  message?: string,
  internal?: boolean
) => {
  res.status(500).json({
    success: false,
    message: internal ? "Something went wrong on our end 😓" : message + ". ⚠️",
    payload: null,
  });
};
