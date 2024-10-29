import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function updateTireDB(tiresArray: any[]) {
  try {
    await prisma.$transaction(async (tx) => {
      for (const tire of tiresArray) {
        const existingTire = await tx.tire.findFirst({
          where: {
            marka: tire.marka,
            tireWidth: tire.tireWidth,
            tireAspectRatio: tire.tireAspectRatio,
            rimDiameter: tire.rimDiameter,
          },
        });

        if (existingTire) {
          const existingStock = existingTire.stock || 0;
          await tx.tire.update({
            where: { id: existingTire.id },
            data: { stock: existingStock + tire.stock },
          });
        } else {
          await tx.tire.create({
            data: tire,
          });
        }
      }
    });

    return true;
  } catch (error) {
    throw new Error("Something happend with saving process");
  }
}
