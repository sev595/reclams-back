import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const searchService = async (query?: any) => {
  try {
    if (!query) return [];

    const PostResult = await prisma.post.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
          { slug: { contains: query, mode: 'insensitive' } },
        ],
      },
      select: {
        id: true,
        title: true,
        description: true,
        featureImg: true,
        postFormat: true,
        slidePost: true,
        date: true,
        slug: true,
        featured: true,
      },
    });

    return PostResult;

  } catch (error) {
    console.error('Error during search:', error);
    return [];
  }
};
