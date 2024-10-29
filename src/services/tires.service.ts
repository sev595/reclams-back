import { PrismaClient, Prisma, Tire } from "@prisma/client";

const prisma = new PrismaClient();

interface FindTiresByInputArgsServiceProps {
  where?: Prisma.TireWhereInput;
  select?: Prisma.TireSelect;
  pagination?: number;
}

export const findTiresByInputArgsService = async ({
  where,
  select,
}: FindTiresByInputArgsServiceProps) => {
  try {
    return (await prisma.tire.findMany({
      select,
      where,
    })) as Tire[];
  } catch (error) {
    throw error;
  }
};

export const findTireByInputArgsService = async ({
  where,
  select,
}: FindTiresByInputArgsServiceProps): Promise<Tire> => {
  try {
    return (await prisma.tire.findFirst({
      select,
      where,
    })) as any;
  } catch (error) {
    throw error;
  }
};

export const findTiresTestService = async ({
  select,
}: FindTiresByInputArgsServiceProps) => {
  try {
    return (await prisma.tire.findMany({
      select,
      take: 5,
    })) as Tire[];
  } catch (error) {
    throw error;
  }
};

export const findRecommendedTiresService = async ({
  where,
  select,
}: FindTiresByInputArgsServiceProps) => {
  return (await prisma.tire.findMany({
    select,
    where,
    take: 5,
  })) as Tire[];
};

export const findAllTiresService = async (select?: Prisma.TireSelect) => {
  return (await prisma.tire.findMany({
    select,
  })) as Tire[];
};
