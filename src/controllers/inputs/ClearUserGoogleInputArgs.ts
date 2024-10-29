import { Prisma, RoleEnumType } from "@prisma/client";

export const ClearUserGoogleInputArgs = (data: any): Prisma.UserCreateInput => {
  return {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    googleId: data.googleId,
    emailVerified: true, // need to change
    role: RoleEnumType.user,
    active: false,
  };
};
