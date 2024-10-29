import { Prisma, RoleEnumType, User } from '@prisma/client';
import { Request, Response } from 'express';

type CreateUserRequest = {
  body: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    password: string;
    role: RoleEnumType;
  };
};

type GetAllUsersRequest = Request;

type GetUserByIdRequest = Request;

type UpdateUserRequest = {
  params: { id: string };
  body: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    password: string;
    role: RoleEnumType;
  };
};

type DeleteUserRequest = Request;

type CreateUserResponse = {
  status: 'success' | 'error';
  data?: { user?: User };
  message?: string;
};

type GetAllUsersResponse = {
  status: 'success' | 'error';
  data?: { users?: User[] };
  message?: string;
};

type GetUserByIdResponse = {
  status: 'success' | 'error';
  data?: { user?: User };
  message?: string;
};

type UpdateUserResponse = {
  status: 'success' | 'error';
  data?: { user?: User };
  message?: string;
};

type DeleteUserResponse = {
  status: 'success' | 'error';
  message?: string;
};

export {
  CreateUserRequest,
  GetAllUsersRequest,
  GetUserByIdRequest,
  UpdateUserRequest,
  DeleteUserRequest,
  CreateUserResponse,
  GetAllUsersResponse,
  GetUserByIdResponse,
  UpdateUserResponse,
  DeleteUserResponse,
};
