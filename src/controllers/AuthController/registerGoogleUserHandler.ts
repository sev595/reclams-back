import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { createUser } from "../../services/user.service";
import { accessTokenCookieOptions, refreshTokenCookieOptions } from "./utils";
import { ClearUserGoogleInputArgs } from "../inputs/ClearUserGoogleInputArgs";
import { generateJWTTokens } from "../../services/jwt/generateJWTToke";

export const registerGoogleUserHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const prisma = new PrismaClient();

  try {
    const { email, googleId } = req.body;

    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { googleId }],
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        active: true,
        emailVerified: true,
        lastName: true,
        role: true,
        googleId: true,
      },
    });

    const clearUserGoogleData = ClearUserGoogleInputArgs(req.body);

    if (user) {
      const { access_token, refresh_token } = await generateJWTTokens(user);
      setCookies(res, access_token, refresh_token);
      return sendResponse(res, 200, "success", access_token, user);
    }

    const newUser = await createUser(clearUserGoogleData);
    const { access_token, refresh_token } = await generateJWTTokens(newUser);
    setCookies(res, access_token, refresh_token);
    return sendResponse(res, 200, "success", access_token, newUser);
  } catch (err: any) {
    console.error("Error:", err);
    if (err.code === "P2002") {
      return sendResponse(
        res,
        500,
        "error",
        null,
        null,
        "An error occurred while processing the request."
      );
    }
    next(err);
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
