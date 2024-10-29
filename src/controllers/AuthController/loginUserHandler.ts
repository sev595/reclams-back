import { Request, Response } from "express";
import bcrypt from "bcryptjs";

import { findUniqueUser } from "../../services/user.service";
import { accessTokenCookieOptions, refreshTokenCookieOptions } from "./utils";
import { generateJWTTokens } from "../../services/jwt/generateJWTToke";

export const loginUserHandler = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await findUniqueUser(
      { email: email.toLowerCase() },
      {
        id: true,
        email: true,
        emailVerified: true,
        password: true,
        firstName: true,
        lastName: true,
        phoneNumber: true,
        role: true,
      }
    );
    //check for admin role

    if (!user) {
      return res.status(402).json({
        message: "User not found",
      });
    }

    if (user?.password && !(await bcrypt.compare(password, user?.password))) {
      return res.status(402).json({
        message: "Invalid mail or password",
      });
    }

    if (req.headers?.admin === "FTS" && user.role !== "admin") {
      return res.status(401).json({
        message: "Not authorized as admin",
      });
    }

    // // Check if user is verified
    if (!user.emailVerified) {
      return res.status(402).json({
        message: "You are not verified, please verify your email to login",
      });
    }

    // Sign Tokens
    const payload = {
      userId: Number(user.id),
      userEmail: user.email,
    };
    const { access_token, refresh_token } = await generateJWTTokens(payload);
    setCookies(res, access_token, refresh_token);
    return res.status(200).json({
      access_token,
      refresh_token,
      user,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong",
    });
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
