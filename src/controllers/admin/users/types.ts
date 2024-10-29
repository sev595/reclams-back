import { User } from '@prisma/client';
import { Request, Response } from 'express';

export interface UserData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
  role: string;
}

export interface UserResponse {
  status: string;
  data: { user: User };
}

export interface UsersResponse {
  status: string;
  data: { users: User[] };
}

export interface ErrorResponse {
  status: string;
  message: string;
}

export type CreateUserHandler = (req: Request, res: Response) => Promise<void>;
export type GetAllUsersHandler = (req: Request, res: Response) => Promise<void>;
export type GetUserByIdHandler = (req: Request, res: Response) => Promise<void>;
export type UpdateUserHandler = (req: Request, res: Response) => Promise<void>;
export type DeleteUserHandler = (req: Request, res: Response) => Promise<void>;
