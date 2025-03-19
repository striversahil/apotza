import { Request, Response } from "express";
import UserService from "../service/user.service";
import PasswordService from "../utils/passwordService";
import TokensService from "../utils/AccessRefreshToken";
import { Usercookie } from "../utils/CookieConfig";

class UserController {
  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const user = await UserService.getUserByEmail(email);
      if (!user) {
        res
          .status(404)
          .json({ success: false, payload: null, message: "User not found" });
        return;
      }

      const isVerified = await PasswordService.verifyPassword(
        password,
        user.password
      );
      if (!isVerified) {
        res.status(400).json({
          success: false,
          message: "Password is incorrect",
          payload: null,
        });
        return;
      }

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
      res.status(200).json({
        success: true,
        message: "User Signed In Successfully 🚀",
        payload: user,
      });
      return;
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Internal Server Error ⚠️",
        error: error,
      });
      return;
    }
  }

  static async signUp(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        res.status(400).json({
          success: false,
          message: "All Fields are required",
          payload: null,
        });
        return;
      }
      const user = await UserService.getUserByEmail(email);
      if (user) {
        res.status(400).json({
          success: false,
          message: "User Already Exists with this email. Please Login",
          payload: null,
        });
        return;
      }
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
      res.status(200).json({
        success: true,
        message: "User Signed Up Successfully 🚀",
        payload: userCreated,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Internal Server Error ⚠️",
        error: error,
      });
    }
  }

  static async logout(req: Request, res: Response) {
    try {
      res.clearCookie("access_token", Usercookie);
      res.status(200).json({
        success: true,
        message: "User Signed Out Successfully 🚀",
        payload: null,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Internal Server Error ⚠️",
        error: error,
      });
    }
  }

  static async getUser(req: Request, res: Response) {
    try {
      const user = await UserService.getUserById(req.user.id);
      if (!user) {
        res
          .status(404)
          .json({ success: false, payload: null, message: "User not found" });
      }
      res.status(200).json({
        success: true,
        message: "User Fetched Successfully 🚀",
        payload: user,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Internal Server Error ⚠️",
        error: error,
      });
    }
  }
}

export default UserController;
