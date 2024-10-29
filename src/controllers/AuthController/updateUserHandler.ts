import { Request, Response } from "express";
import { updateUser } from "../../services/user.service";
import { toInt } from "../../utils/stringToNumber";

export const UpdateUserHandler = async (req: Request, res: Response) => {
  let { id } = req.params;

  const userId = toInt(id);
  try {
    const updatedUser = await updateUser(req.body, userId);

    return res.status(200).json({
      user: updatedUser,
      status: "success",
    });
  } catch (err) {
    return res.status(500).json({
      user: null,
      status: "faild",
      message: "Something went wrong ",
    });
  }
};
