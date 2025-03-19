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
        return ErrorResponse(res, "All Fields are required");
      const user = await UserService.getUserByEmail(email);
      if (!user) return ErrorResponse(res, "User not found");
      const isVerified = await PasswordService.verifyPassword(
        password,
        user.password
      );
      if (!isVerified) return ErrorResponse(res, "Incorrect Password");
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
      SuccessResponse(res, "User Signed In Successfully", user);
      return;
    } catch (error) {
      console.log(error);
    }
  }

  static async signUp(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password)
        return ErrorResponse(res, "All Fields are required");
      const user = await UserService.getUserByEmail(email);
      if (user) return ErrorResponse(res, "User already exists");
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
      SuccessResponse(res, "User Signed Up Successfully", userCreated);
    } catch (error) {
      console.log(error);
    }
  }

  static async logout(req: Request, res: Response) {
    try {
      res.clearCookie("access_token", Usercookie);
      SuccessResponse(res, "User Signed Out Successfully");
    } catch (error) {
      console.log(error);
    }
  }

  static async deleteUser(req: Request, res: Response) {
    try {
      const userId = req.user.id;
      console.log("userId", userId);
      const deleted_user = await UserService.deleteUser(userId);
      res.clearCookie("access_token");
      SuccessResponse(res, "User Deleted Successfully", deleted_user);
    } catch (error) {
      console.log(error);
    }
  }

  static async getUser(req: Request, res: Response) {
    try {
      const user = await UserService.getUserById(req.user.id);
      if (!user) return ErrorResponse(res, "User not found");
      SuccessResponse(res, "User fetched successfully", user);
    } catch (error) {
      console.log(error);
    }
  }
}

export default UserController;
