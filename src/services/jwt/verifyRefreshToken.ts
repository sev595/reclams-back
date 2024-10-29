import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { generateJWTTokens } from "./generateJWTToke";

export const VerifyRefreshToken = async (req: Request, res: Response) => {
  const jwtRefreshSecretKey = process.env.JWT_REFRESH_SECRET_KEY as string;

  const { refreshToken } = req.body;

  if (!refreshToken) {
    // If no refresh token is provided, return an error response
    return res
      .status(403)
      .json({ message: "Unauthorized: No refresh token provided" });
  }

  // Verify the refresh token
  jwt.verify(
    refreshToken,
    jwtRefreshSecretKey,
    async (err: any, decoded: any) => {
      if (err) {
        // If refresh token is invalid, return an error response
        return res
          .status(403)
          .json({ message: "Unauthorized: Invalid refresh token" });
      }
      const { payload } = decoded;
      const { access_token, refresh_token } = await generateJWTTokens(payload);

      return res.status(200).json({
        access_token,
        refresh_token,
      });
    }
  );
};
