import { NextFunction, Request, Response } from "express";

export const getMeHandler = async (req: Request, res: Response) => {
  try {
    const user = res.locals.user;

    return res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err: any) {
    return res
      .status(500)
      .json({ status: "error", message: "Internal server error" }); // Send appropriate error response
  }
};
