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
        ],
      },
      select: {
        id: true,
        title: true,
        description: true,
        imageUrl: true,

      },
    });

  

    return PostResult; 

  } catch (error) {
    console.error('Error during search:', error);
    return [];
  }
};
