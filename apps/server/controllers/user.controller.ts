import { Request, Response } from "express";
import UserService from "../service/user.service";
import PasswordService from "../utils/passwordService";
import TokensService from "../utils/AccessRefreshToken";
import { Usercookie } from "../utils/CookieConfig";

class UserController {
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await UserService.getUserByEmail(email);
    if (!user) res.status(404).send(false);

    const isVerified = await PasswordService.verifyPassword(
      password,
      user.password!
    );
    if (!isVerified) res.status(400).send(false);

    const accessToken = TokensService.generateAccessToken(user);
    const refreshToken = TokensService.generateRefreshToken(user.id);

    await UserService.updateUser(user.id, {
      refreshToken: refreshToken,
    });

    res.cookie("access_token", accessToken, Usercookie);
    res.status(200).send(user);
  }
  static async signup() {}
}

export default UserController;
