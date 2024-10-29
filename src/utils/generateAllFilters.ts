import { PrismaClient } from "@prisma/client";
import { ClearRimsFiltersInputArgs } from "../controllers/inputs/ClearRimsFiltersInputArgs";
import { TransformeRimsFilters } from "../helpers/transformeRimsFilters";
const prisma = new PrismaClient();

export const generateAllFilters = async () => {
  const clearFilterData = ClearRimsFiltersInputArgs();
  const result: any = await prisma.rims.groupBy(clearFilterData);
  const transformedByNamesFilterData = TransformeRimsFilters(result)
  return transformedByNamesFilterData
}