import { PrismaClient, Prisma, Rims } from "@prisma/client";

const prisma = new PrismaClient();

export const findAllRimsService = async (select?: Prisma.RimsSelect) => {
  return (await prisma.rims.findMany({
    select,
  })) as Rims[];
};

interface FindRimsByInputArgsServiceProps {
  where: Prisma.RimsWhereInput;
  select?: Prisma.RimsSelect;
  pagination?: number;
}

export const findRimsByInputArgsService = async ({
  where,
  select,
  pagination,
}: FindRimsByInputArgsServiceProps) => {
  const skip = pagination ? (pagination - 1) * 12 : 0;

  const [rims, rimsCount] = await Promise.all([
    prisma.rims.findMany({
      select,
      where,
      take: 12,
      skip,
    }),
    prisma.rims.count({
      where,
    }),
  ]);
  return { rims, rimsCount };
};

export const findRimByInputArgsService = async ({
  where,
  select,
}: FindRimsByInputArgsServiceProps) => {
  return (await prisma.rims.findFirst({
    select,
    where,
  })) as Rims;
};

export const findPopularRimsService = async () => {
  return (await prisma.rims.findMany({
    orderBy: {
      score: "asc",
    },
    take: 8,
  })) as Rims[];
};

export const findRecommendedRimsService = async ({
  where,
  select,
}: FindRimsByInputArgsServiceProps) => {
  return (await prisma.rims.findMany({
    select,
    where,
    take: 5,
  })) as Rims[];
};
