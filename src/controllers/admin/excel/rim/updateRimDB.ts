import { PrismaClient, Rims } from "@prisma/client";

const prisma = new PrismaClient();

export async function updateRimDB(rimsArray: any[]) {
  try {
    for (const rim of rimsArray) {
      const existingRim = await prisma.rims.findFirst({
        where: { rimModel: rim.rimModel },
      });

      if (existingRim) {
        const existingStock = existingRim?.stock || 0;

        await prisma.rims.update({
          where: { id: existingRim.id },
          data: { stock: existingStock + rim.stock },
        });
      } else {
        await prisma.rims.create({
          data: rim,
        });
      }
    }
    return true;
  } catch (error) {
    throw new Error("Something happend with saving process");
  }
}
