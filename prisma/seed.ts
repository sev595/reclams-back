import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("wheeladminart", 12);

  // // Seed a user
  // await prisma.user.create({
  //   data: {
  //     firstName: "Admin",
  //     lastName: "Admin",
  //     email: "admin.admin@admin.com",
  //     phoneNumber: "+1234567890",
  //     address: "address",
  //     password: hashedPassword,
  //     role: "admin",
  //     emailVerified: true,
  //   },
  // });

  // Seed posts
  await prisma.post.createMany({
    data: [
      {
        title: "4 types of research methods all designers should know",
        featureImg: "/images/posts/thumbnail-01.webp",
        postFormat: "standard",
        slidePost: true,
        date: new Date("2022-02-30"),
        description: "An overview of essential research methods for designers.",
        featured: false,
      },
      {
        title: "A five-step framework for effective keyword targeting",
        featureImg: "/images/posts/thumbnail-08.webp",
        postFormat: "video",
        slidePost: false,
        date: new Date("2022-06-30"),
        slug: "a-five-step-framework-for-effective-keyword-targeting",
        description: "Learn a strategic approach to keyword targeting.",
        featured: false,
      },
      {
        title: "A good traveler has no fixed plans, and is not intent on arriving.",
        featureImg: "/images/posts/thumbnail-07.webp",
        postFormat: "standard",
        slidePost: false,
        date: new Date("2022-04-11"),
        slug: "a-good-traveler-has-no-fixed-plans-and-is-not-intent-on-arriving",
        description: "Thoughts on the joys of spontaneous travel.",
        featured: false,
      },
      {
        title: "Apple reimagines the iPhone experience with iOS 14",
        featureImg: "/images/posts/thumbnail-05.webp",
        postFormat: "standard",
        slidePost: false,
        date: new Date("2022-02-10"),
        description: "Exploring the new features in iOS 14.",
        featured: true,
      },
      {
        title: "Bold new experience. Same Mac magic.",
        featureImg: "/images/posts/post-column-02.webp",
        postFormat: "standard",
        slidePost: false,
        date: new Date("2022-06-25"),
        slug: "bold-new-experience-same-mac-magic",
        description: "Apple’s Mac experience remains as robust as ever.",
        featured: false,
      },
      // Add more posts as needed
    ],
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
