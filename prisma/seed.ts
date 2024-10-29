import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("wheeladminart", 12);

  await prisma.user.create({
    data: {
      firstName: "Admin",
      lastName: "Admin",
      email: "admin.admin@admin.com",
      phoneNumber: "+1234567890",
      address:"address",
      password: hashedPassword,
      role: "admin",
      emailVerified: true,
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
