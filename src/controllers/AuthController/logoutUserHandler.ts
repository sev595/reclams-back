import { Request, Response, NextFunction } from "express";

const logout = (res: Response) => {
  const cookieOptions: any = { maxAge: 1 }; // Setting maxAge to 1 millisecond effectively deletes the cookie
  res.cookie("access_token", "", cookieOptions);
  res.cookie("refresh_token", "", cookieOptions);
  res.cookie("logged_in", "", cookieOptions);
};

export const logoutUserHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    logout(res);
    return res.status(200).json({ status: "success" });
  } catch (err) {
    next(err);
  }
};
