import { Request, Response } from "express";
import {
  findUniqueUser,
  updateUser,
  updateUserVerificationCode,
} from "../../services/user.service";
import { encrypt } from "../../emailService/hashing";
import { sendEmail } from "../../emailService/emailService";

export const ForgotPasswordHandler = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const user = await findUniqueUser({ email: email.toLowerCase() });

    if (!user) {
      return res
        .status(400)
        .json({ status: "error", message: "User is not exist" }); // Send appropriate error response
      return;
    }

    const verificationCode = encrypt(
      email,
      process.env.HASH_SECRET_KEY as string
    );

    updateUserVerificationCode({ verificationCode }, email);

    await sendEmail({
      from: "smat6371@gmail.com",
      to: email,
      subject: "Email Verification for Wheel Art",
      text: "Email Verification",
      html: `<p>Please open this link <a href='${process.env.BASE_URL}/new-password?verification_code=${verificationCode}'>Wheel Art</a></p>`,
    });

    res
      .status(200)
      .json({ status: "success", message: "Please check your email" });
  } catch (err) {
    return res
      .status(500)
      .json({ status: "error", message: "Something went wrong" });
  }
};
