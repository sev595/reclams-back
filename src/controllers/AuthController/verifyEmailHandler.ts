import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

import { decrypt } from "../../emailService/hashing";
import { accessTokenCookieOptions, refreshTokenCookieOptions } from "./utils";
import { generateJWTTokens } from "../../services/jwt/generateJWTToke";

export const verifyEmailHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const prisma = new PrismaClient();
  const password = req?.body?.password;
  try {
    const decryptedData = decrypt(
      req.params.verificationCode,
      process.env.HASH_SECRET_KEY as string
    );

    let data: any = { emailVerified: true };
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 12);
      data = { ...data, password: hashedPassword };
    }

    const user = await prisma.user.update({
      where: { email: decryptedData },
      data: { ...data },
      select: {
        id: true,
        email: true,
        firstName: true,
        emailVerified: true,
        lastName: true,
        role: true,
      },
    });

    if (!user) {
      return res.status(401).json({
        message: "Could not verify email",
      });
    }

    const { access_token, refresh_token } = await generateJWTTokens(user);

    setCookies(res, access_token, refresh_token);
    return sendResponse(res, 200, "success", access_token, user);
  } catch (err: any) {
    if (err.code === "P2025") {
      return sendResponse(
        res,
        404,
        "fail",
        null,
        null,
        "Verification code is invalid or user doesn't exist"
      );
    }
  } finally {
    await prisma.$disconnect();
  }
};

const setCookies = (
  res: Response,
  access_token: string,
  refresh_token: string
) => {
  res.cookie("access_token", access_token, accessTokenCookieOptions);
  res.cookie("refresh_token", refresh_token, refreshTokenCookieOptions);
  res.cookie("logged_in", true, {
    ...accessTokenCookieOptions,
    httpOnly: false,
  });
};

const sendResponse = (
  res: Response,
  status: number,
  statusText: string,
  access_token: string | null,
  user: any | null,
  message?: string
) => {
  const response: any = { status: statusText };
  if (access_token) response.access_token = access_token;
  if (user) response.user = user;
  if (message) response.message = message;
  return res.status(status).json(response);
};
