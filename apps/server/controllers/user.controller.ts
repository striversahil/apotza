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
      if (!user)
        res
          .status(404)
          .json({ success: false, payload: null, message: "User not found" });

      const isVerified = await PasswordService.verifyPassword(
        password,
        user.password!
      );
      if (!isVerified)
        res.status(400).json({
          success: false,
          payload: null,
          message: "Password is incorrect",
        });

      const accessToken = TokensService.generateAccessToken(
        user.id,
        user.email,
        user.password
      );
      const refreshToken = TokensService.generateRefreshToken(user.id);

      await UserService.updateUser(user.id, {
        refreshToken: refreshToken,
      });

      res.cookie("access_token", accessToken, Usercookie);
      res.status(200).json({
        success: true,
        payload: user,
        message: "User Signed In Successfully 🚀",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        error: error,
        message: "Internal Server Error ⚠️",
      });
    }
  }

  static async signUp(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;
      const user = await UserService.getUserByEmail(email);
      if (!user) {
        res.status(400).json({
          success: false,
          payload: null,
          message: "User Already Exists with this email.",
        });
      }
      const hashed_password = await PasswordService.hashPassword(password);

      const refreshToken = TokensService.generateRefreshToken(user.id);

      const userCreated = await UserService.createUser(
        name,
        email,
        hashed_password,
        refreshToken
      );
      const accessToken = TokensService.generateAccessToken(
        userCreated.id,
        email,
        hashed_password
      );

      res.cookie("access_token", accessToken, Usercookie);
      res.status(200).json({
        success: true,
        payload: user,
        message: "User Signed Up Successfully 🚀",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        error: error,
        message: "Internal Server Error ⚠️",
      });
    }
  }
}

export default UserController;
