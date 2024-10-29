import { PrismaClient, Prisma, User } from "@prisma/client";

export const excludedFields = [
  "password",
  "verified",
  "verificationCode",
  "passwordResetAt",
  "passwordResetToken",
];

const prisma = new PrismaClient();

export const createUser = async (input: Prisma.UserCreateInput) => {
  const user = await prisma.user.create({
    data: input,
    select: {
      id: true,
      email: true,
      firstName: true,
      emailVerified: true,
      lastName: true,
      role: true,
      address: true
    },
  });

  return { ...user, id: user.id.toString() };
};

export const updateUser = async (
  input: Prisma.UserUpdateInput,
  id: number
): Promise<any> => {
  try {
    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        ...input,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        emailVerified: true,
        lastName: true,
        role: true,
      },
    });

    return { ...user, id: user.id.toString() };
  } catch (err) {
    throw err;
  }
};

export const findUniqueUser = async (
  where: Prisma.UserWhereUniqueInput,
  select?: Prisma.UserSelect
) => {
  const userDara = await prisma.user.findUnique({
    where,
    select,
  });
  return userDara as User;
};

export const transformToLineItems = (products: any[]) => {
  const lineItems = products.map((product) => {
    const name = product.rimModel ? product.rimModel : product.marka ?? "Pneu{}";
    return {
      price_data: {
        currency: "eur",
        product_data: {
          name, // Use rimModel as the product name
          images: [product.imageUrl], // Use imageUrl as the product image
        },
        unit_amount: Math.round(product.price * 100), // Convert price to cents
      },
      quantity: 1, // Use count as the quantity
    };
  });

  return lineItems;
};

export const updateUserVerificationCode = async (
  input: Prisma.UserUpdateInput,
  email: string
): Promise<any> => {
  try {
    const user = await prisma.user.update({
      where: {
        email,
      },
      data: {
        ...input,
      },
    });

    return { ...user, id: user.id.toString() };
  } catch (err) {
    throw err;
  }
};
