import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import ApiResponse from "../helper/ApiResponse";
import TokensService from "../utils/AccessRefreshToken";
import { ErrorResponse } from "../utils/ApiResponse";

declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
        email: string;
        username: string;
      };
    }
  }
}

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  const access_token = req.cookies.access_token;

  if (!access_token) {
    return ErrorResponse(res, "No Tokens Found", 401);
  }

  const decoded = TokensService.verifyAccessToken(access_token);

  if (!decoded) {
    return ErrorResponse(res, "Invalid Access Token", 402);
  }
  // Todo : Verify Token Safely

  // const date = new Date();

  // if (refresh_token) {
  //   const Expiry_left_in_hours = Math.floor(
  //     (decoded.exp * 1000 - date.getTime()) / (60 * 60 * 1000)
  //   );

  //   if (Expiry_left_in_hours < 100) {
  //     // Returning Error Response of 403 code if refresh token is expiring soon (less than 100 hours)

  //     return ErrorResponse(res, "Refresh Token is Expiring Soon", 403);
  //   }
  // }

  req.user = decoded;

  next();
};

export const authController = async (req: Request, res: Response) => {
  try {
    res
      .status(200)
      .json(new ApiResponse(200, req.user, "User is Authenticated"));
  } catch (error) {
    console.log("Error in Auth Middleware", error);
  }
};
