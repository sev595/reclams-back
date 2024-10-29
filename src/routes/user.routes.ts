import express from "express";
import jwt from "jsonwebtoken";
import { getMeHandler } from "../controllers/user.controller";
import { VerifyJWTToken } from "../services/jwt/verifyJWTToken";

const router = express.Router();

// Apply token verification middleware to the "/me" route
router.get("/me", VerifyJWTToken, getMeHandler);

export default router;
