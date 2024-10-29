import { Request, Response } from "express";
import { sendEmail } from "../../emailService/emailService";

export const SendToAdminMessageHandler = async (
  req: Request,
  res: Response
) => {
  const { message, name, email, phone } = req.body;

  try {
    await sendEmail({
      from: email,
      to: process.env.ADMIN_NOTIFICATIONS_MAIL as string,
      subject: `Email from ${name} `,
      text: "Question",
      html: `<div>
        <p>You have message from ${name}</p>
        <p>Phone number: ${phone} </p>
        <p>Message: ${message} </p>
      </div>`,
    });

    res
      .status(200)
      .json({ status: "success", message: "Your message is send to admin" });
    return;
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: "An error occurred while processing the request.",
    });
  }
};
