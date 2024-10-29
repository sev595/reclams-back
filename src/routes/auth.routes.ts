import express from "express";

import { validate } from "../middleware/validate";

import { registerUserSchema, verifyEmailSchema } from "../schemas/user.schema";
import { registerUserHandler } from "../controllers/AuthController/registerUserHandler";
import { loginUserHandler } from "../controllers/AuthController/loginUserHandler";
import { verifyEmailHandler } from "../controllers/AuthController/verifyEmailHandler";
import { logoutUserHandler } from "../controllers/AuthController/logoutUserHandler";
import { UpdateUserHandler } from "../controllers/AuthController/updateUserHandler";
import { ForgotPasswordHandler } from "../controllers/AuthController/forgotPasswordHandler";
import { SendToAdminMessageHandler } from "../controllers/AuthController/sendToAdminMessageHandler";
import { VerifyJWTToken } from "../services/jwt/verifyJWTToken";
import { VerifyRefreshToken } from "../services/jwt/verifyRefreshToken";

const router = express.Router();

router.post("/register", validate(registerUserSchema), registerUserHandler);
router.post("/login", loginUserHandler);
router.post("/logout", logoutUserHandler);
router.post("/forgotpassword", ForgotPasswordHandler);
router.post("/update-user/:id", VerifyJWTToken, UpdateUserHandler);
router.post("/refresh-token", VerifyRefreshToken);



router.post(
  "/email-verification/:verificationCode",
  validate(verifyEmailSchema),
  verifyEmailHandler
);

router.post("/sent-to-admin-message", SendToAdminMessageHandler);

export default router;
