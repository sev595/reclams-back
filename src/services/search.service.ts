import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const generalSearchService = async (query?: any) => {
  try {
    if (!query) return [];
    
    const searchQuery = isNaN(parseInt(query)) ? undefined : parseInt(query);

    const rimsResult = await prisma.rims.findMany({
      where: {
        OR: [
          { rimModel: { contains: query, mode: 'insensitive' } },
          { color: { contains: query, mode: 'insensitive' } },
          { ofsetAv: searchQuery ? { equals: searchQuery } : undefined },
        ],
      },
      select: {
        id: true,
        rimModel: true,
        imageUrl: true,
      },
    });

    const tiresResult = await prisma.tire.findMany({
      where: {
        OR: [
          { marka: { contains: query, mode: 'insensitive' } },
          { tireWidth: searchQuery ? { equals: searchQuery } : undefined },
          { tireAspectRatio: searchQuery ? { equals: searchQuery } : undefined },
        ],
      },
      select: {
        id: true,
        marka: true,
        imageUrl: true,
      },
    });

    // Combine and format the results
    const formattedResults = [
      ...rimsResult.map((rim) => ({
        name: rim.rimModel,
        imageUrl: rim.imageUrl.split(";")
        .filter((item: any) => item !== "undefined")[0],
        id: rim.id,
        type:'rim'
      })),
      ...tiresResult.map((tire) => ({
        name: tire.marka,
        imageUrl: tire.imageUrl.split(";")
        .filter((item: any) => item !== "undefined")[0],
        id: tire.id,
        type:'tire'
      })),
    ];

    return formattedResults; 

  } catch (error) {
    console.error('Error during search:', error);
    return [];
  }
};
