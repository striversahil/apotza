import jwt from "jsonwebtoken";

class TokensService {
  static generateAccessToken(id: string, email: string, username: string) {
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

  static verifyAccessToken(token: string): any {
    try {
      if (!token) return null;
      const decodedToken = jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET as string
      );
      return decodedToken;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  static verifyRefreshToken(token: string): any {
    try {
      if (!token) return null;
      const decodedToken = jwt.verify(
        token,
        process.env.REFRESH_TOKEN_SECRET as string
      );
      return decodedToken;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

export default TokensService;
