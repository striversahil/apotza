import jwt from "jsonwebtoken";

class TokensService {
  static generateAccessToken(id: number, email: string, username: string) {
    const accessToken = jwt.sign(
      {
        id: id,
        email: email,
        username: username,
      },
      process.env.ACCESS_TOKEN_SECRET as string,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRY as any }
    );
    return accessToken;
  }

  static generateRefreshToken(id: number) {
    const refreshToken = jwt.sign(
      {
        id: id,
      },
      process.env.REFRESH_TOKEN_SECRET as string,
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRY as any }
    );
    return refreshToken;
  }

  static verifyAccessToken(token: string) {
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string);
  }
}

export default TokensService;
