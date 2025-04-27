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
      const accessToken = TokensService.generateAccessToken(
        user.id,
        user.email,
        user.name
      );
      const refreshToken = TokensService.generateRefreshToken(user.id);
      await UserService.updateUser(user.id, {
        refreshToken: refreshToken,
      });
      res.cookie("access_token", accessToken, Usercookie);
      res.cookie("refresh_token", refreshToken, Usercookie);
      SuccessResponse(res, "User Signed In Successfully", user);
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
      const accessToken = TokensService.generateAccessToken(
        userCreated.id,
        email,
        name
      );
      res.cookie("access_token", accessToken, Usercookie);
      res.cookie("refresh_token", refreshToken, Usercookie);
      SuccessResponse(res, "User Signed Up Successfully", userCreated);
    } catch (error) {
      ErrorResponse(res, "", null);
    }
  }

  static async logout(req: Request, res: Response) {
    try {
      res.clearCookie("access_token", Usercookie);
      res.clearCookie("refresh_token", Usercookie);
      SuccessResponse(res, "User Signed Out Successfully");
    } catch (error) {
      ErrorResponse(res, "", null);
    }
  }

  static async deleteUser(req: Request, res: Response) {
    try {
      const userId = req.user.id;
      const deleted_user = await UserService.deleteUser(userId);
      res.clearCookie("access_token");
      SuccessResponse(res, "User Deleted Successfully", deleted_user);
    } catch (error) {
      ErrorResponse(res, "", null);
    }
  }

  static async updateAccessToken(req: Request, res: Response) {
    // If the refresh token is valid, create a new access token
    try {
      const refreshToken = req.cookies.refresh_token;
      if (!refreshToken)
        return ErrorResponse(res, "Refresh Token not found", 401);

      const decodedToken = TokensService.verifyRefreshToken(refreshToken);

      if (!decodedToken)
        return ErrorResponse(res, "Invalid Refresh Token", 401);

      const user = await UserService.getUserById(decodedToken.id as string);

      if (!user)
        return ErrorResponse(res, "User not found for this token", 401);

      const accessToken = TokensService.generateAccessToken(
        user.id,
        user.email,
        user.name
      );
      res.cookie("access_token", accessToken, Usercookie);
      SuccessResponse(res, "Access Token Updated Successfully");
    } catch (error) {
      ErrorResponse(res, "", null);
    }
  }

  static async updateRefreshToken(req: Request, res: Response) {
    // It's generated 10-15 days before it actually gonna expire so to avoid it's expiring we update it

    try {
      const refreshToken = req.cookies.refresh_token;
      if (!refreshToken)
        return ErrorResponse(res, "Refresh Token not found", 401);
      const decodedToken = TokensService.verifyRefreshToken(refreshToken);
      if (!decodedToken)
        return ErrorResponse(res, "Invalid Refresh Token", 401);
      const user = await UserService.getUserById(decodedToken.id as string);
      if (!user)
        return ErrorResponse(res, "User not found for this token", 401);
      const newRefreshToken = TokensService.generateRefreshToken(user.id);
      await UserService.updateUser(user.id, {
        refreshToken: newRefreshToken,
      });
      res.cookie("refresh_token", newRefreshToken, Usercookie);
      SuccessResponse(res, "Refresh Token Updated Successfully");
    } catch (error) {
      ErrorResponse(res, "", null);
    }
  }

  static async getUser(req: Request, res: Response) {
    try {
      const user = await UserService.getUserById(req.user.id);
      if (!user) return ErrorResponse(res, "User not found", 404);
      SuccessResponse(res, "User fetched successfully", user);
    } catch (error) {
      ErrorResponse(res, "", null);
    }
  }
}

export default UserController;
