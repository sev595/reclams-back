import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import { encrypt } from "../../emailService/hashing";
import { ClearCreateUserInputArgs } from "../inputs/ClearCreateUserInputArgs";
import { createUser, findUniqueUser } from "../../services/user.service";
import { sendEmail } from "../../emailService/emailService";

export const registerUserHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, firstName, lastName, phoneNumber, address } = req.body;

    // Check if user already exists
    const existingUser = await findUniqueUser(
      { email },
      { id: true }
    );

    if (existingUser) {
      return res.status(409).json({
        status: "Conflict",
        message: "An account with this email already exists.",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Generate verification code
    const verificationCode = encrypt(
      email,
      process.env.HASH_SECRET_KEY as string
    );

    // Prepare user data
    const userData = ClearCreateUserInputArgs({
      email: email.toLowerCase(),
      firstName,
      lastName,
      phoneNumber,
      address
    });


    // Create user
    await createUser({
      ...userData,
      password: hashedPassword,
      verificationCode,
    });

    // Send verification email
    await sendEmail({
      from: "smat6371@gmail.com",
      to: email,
      subject: "Email Verification for Wheel Art",
      text: "Email Verification",
      html: `<p>Please open this link <a href='${process.env.BASE_URL}/email-verification?verification_code=${verificationCode}'>Wheel Art</a></p>`,
    });

    // Respond with success
    return res.status(200).json({
      status: "success",
    });
  } catch (err: any) {
    console.error("Error:", err);
    if (err.code === "P2002") {
      return res.status(500).json({
        status: "error",
        message: "An error occurred while processing the request.",
      });
    }
    next(err);
  }
};
