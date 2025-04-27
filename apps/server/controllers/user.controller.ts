import { Request, Response } from "express";
import UserService from "../service/user.service";
import PasswordService from "../utils/passwordService";
import TokensService from "../utils/AccessRefreshToken";
import { Usercookie } from "../utils/CookieConfig";
import { ErrorResponse, SuccessResponse } from "../utils/ApiResponse";

class UserController {
  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      if (!email || !password)
        return ErrorResponse(res, "All Fields are required", 400);
      const user = await UserService.getUserByEmail(email);
      if (!user) return ErrorResponse(res, "User not found", 404);
      const isVerified = await PasswordService.verifyPassword(
        password,
        user.password
      );
      if (!isVerified) return ErrorResponse(res, "Incorrect Password", 401);
      const accessToken = TokensService.generateAccessToken(user.id);
      const refreshToken = TokensService.generateRefreshToken(user.id);
      await UserService.updateUser(user.id, {
        refreshToken: refreshToken,
      });
      res.cookie("access_token", accessToken, Usercookie);
      res.cookie("refresh_token", refreshToken, Usercookie);
      SuccessResponse(res, "User Signed In Successfully", 201, {
        accessToken: accessToken,
        refreshToken: refreshToken,
      });
      return;
    } catch (error) {
      ErrorResponse(res, "", null);
    }
  }

  static async signUp(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password)
        return ErrorResponse(res, "All Fields are required", 400);
      const user = await UserService.getUserByEmail(email);
      if (user) return ErrorResponse(res, "User already exists", 400);
      const hashed_password = await PasswordService.hashPassword(password);
      const userCreated = await UserService.createUser(
        name,
        email,
        hashed_password
      );
      const refreshToken = TokensService.generateRefreshToken(userCreated.id);
      await UserService.updateUser(userCreated.id, {
        refreshToken: refreshToken,
      });
      const accessToken = TokensService.generateAccessToken(userCreated.id);
      res.cookie("access_token", accessToken, Usercookie);
      res.cookie("refresh_token", refreshToken, Usercookie);
      SuccessResponse(res, "User Signed Up Successfully", 201, {
        accessToken: accessToken,
        refreshToken: refreshToken,
      });
    } catch (error) {
      ErrorResponse(res, "", null);
    }
  }

  static async logout(req: Request, res: Response) {
    try {
      res.clearCookie("access_token", Usercookie);
      res.clearCookie("refresh_token", Usercookie);
      SuccessResponse(res, "User Signed Out Successfully", 210);
    } catch (error) {
      ErrorResponse(res, "", null);
    }
  }

  static async deleteUser(req: Request, res: Response) {
    try {
      const userId = req.user.id;
      const deleted_user = await UserService.deleteUser(userId);
      if (!deleted_user) return ErrorResponse(res, "User not found", 404);
      res.clearCookie("access_token", Usercookie);
      res.clearCookie("refresh_token", Usercookie);
      SuccessResponse(res, "User Deleted Successfully", 210);
    } catch (error) {
      ErrorResponse(res, "", null);
    }
  }

  static async updateAccessToken(req: Request, res: Response) {
    // If the refresh token is valid or the refresh token expiry time is near to expiry, create a new access token
    try {
      const refreshToken = req.cookies.refresh_token;

      let newRefreshToken;
      let newAccessToken;

      if (!refreshToken)
        return ErrorResponse(res, "Refresh Token not found", 401);

      const decodedToken = TokensService.verifyRefreshToken(refreshToken);

      newRefreshToken = refreshToken;

      // If the refresh token is valid, create a new access token
      newAccessToken = TokensService.generateAccessToken(
        decodedToken.id as string
      );

      if (!decodedToken)
        return ErrorResponse(res, "Invalid Refresh Token", 401);

      // If the refresh token expiry time is near to expiry , create a new refresh token
      if (((decodedToken.exp - Date.now()) / 1000) * 60 * 60 < 20) {
        const newRefreshToken_token = TokensService.generateRefreshToken(
          decodedToken.id as string
        );
        await UserService.updateUser(decodedToken.id as string, {
          refreshToken: newRefreshToken_token,
        });

        newRefreshToken = newRefreshToken_token;
      }
      res.cookie("access_token", newAccessToken, Usercookie);
      res.cookie("refresh_token", newRefreshToken, Usercookie);

      SuccessResponse(res, "Access Token Updated Successfully", 201, {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      });
    } catch (error) {
      ErrorResponse(res, "", null);
    }
  }

  static async getUser(req: Request, res: Response) {
    try {
      const user = await UserService.getUserById(req.user.id);
      if (!user) return ErrorResponse(res, "User not found", 404);
      SuccessResponse(res, "User fetched successfully", null, user);
    } catch (error) {
      ErrorResponse(res, "", null);
    }
  }
}

export default UserController;
