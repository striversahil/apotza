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

export const ErrorResponse = (res: Response, message: string) => {
  res.status(500).json({
    success: false,
    message: message + ". ⚠️",
    payload: null,
  });
};
