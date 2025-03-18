import jwt from "jsonwebtoken";

class TokensService {
  static generateAccessToken(user: any) {
    const accessToken = jwt.sign(
      {
        id: user.id,
        email: user.email,
        username: user.username,
      },
      process.env.ACCESS_TOKEN_SECRET as string,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRY as any }
    );
    return accessToken;
  }

  static generateRefreshToken(id: string) {
    const refreshToken = jwt.sign(
      {
        id: id,
      },
      process.env.REFRESH_TOKEN_SECRET as string,
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRY as any }
    );
    return refreshToken;
  }
}

export default TokensService;
