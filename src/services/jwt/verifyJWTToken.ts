import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const VerifyJWTToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token = req.headers["authorization"] as string;
  const secretKey = process.env.JWT_SECRET_KEY as string;

  if (!token) {
    return res.status(401).json({ message: process.env.JWT_SECRET_KEY });
  }
  token = token.replace("Bearer ", "");

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
    next();
  });
};
