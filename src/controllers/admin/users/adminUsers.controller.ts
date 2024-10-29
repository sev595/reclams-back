import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

import {
  CreateUserHandler,
  GetAllUsersHandler,
  GetUserByIdHandler,
  UpdateUserHandler,
  DeleteUserHandler,
} from "./types";
import { findUniqueUser } from "../../../services/user.service";

const prisma = new PrismaClient();

export const createUserHandler: CreateUserHandler = async (
  req: any,
  res: any
) => {
  try {
    const { firstName, lastName, phoneNumber, email, password, role, address } =
      req.body;

    const hashedPassword = await bcrypt.hash(password, 12);

    const existingUser = await findUniqueUser({ email }, { id: true });

    if (existingUser) {
      return res.status(409).json({
        status: "error",
        message: "An account with this email already exists.",
      });
    }

    const createdUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        phoneNumber,
        email,
        password: hashedPassword,
        role,
        emailVerified: true,
        address
      },
    });

    return res.status(201).json({
      status: "success",
      data: { user: createdUser },
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Failed to create user",
    });
  }
};

export const getAllUsersHandler: GetAllUsersHandler = async (
  req: any,
  res: any
) => {
  try {
    const allUsers = await prisma.user.findMany();

    return res.status(200).json({
      status: "success",
      data: { users: allUsers },
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Failed to fetch users",
    });
  }
};

export const getUserByIdHandler: GetUserByIdHandler = async (
  req: any,
  res: any
) => {
  try {
    const { id } = req.params;
    const userId = parseInt(id, 10);

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        createdDate: true,
        email: true,
        emailVerified: true,
        firstName: true,
        lastName: true,
        phoneNumber: true,
        role: true,
        address:true
      },
    });

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    return res.status(200).json({
      status: "success",
      data: { user },
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Failed to fetch user",
    });
  }
};

export const updateUserHandler: UpdateUserHandler = async (
  req: any,
  res: any
) => {
  try {
    const { id } = req.params;
    const userId = parseInt(id, 10);
    const { firstName, lastName, phoneNumber, email, password, role, address } =
      req.body;

    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        firstName,
        lastName,
        phoneNumber,
        email,
        password,
        role,
        address
      },
    });

    return res.status(200).json({
      status: "success",
      data: { user: updatedUser },
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Failed to update user",
    });
  }
};

export const deleteUserHandler: DeleteUserHandler = async (
  req: any,
  res: any
) => {
  try {
    const { id } = req.params;
    const userId = parseInt(id, 10);

    await prisma.user.delete({
      where: {
        id: userId,
      },
    });

    return res.status(204).end();
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Failed to delete user",
    });
  }
};
