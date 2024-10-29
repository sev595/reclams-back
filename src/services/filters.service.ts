import { PrismaClient } from "@prisma/client";
import { ClearRimsByFiltersInputArgs } from "../controllers/inputs/ClearRimsByFiltersInputArgs";
import { RimFilterQuery } from "../controllers/queries/RimFilterQuery";
import { ClearTiresFiltersInputArgs } from "../controllers/inputs/ClearTiresFiltersInputArgs";
import { TransformeTiresFilters } from "../helpers/transformeTiresFilters";
import { ClearTiresByFiltersInputArgs } from "../controllers/inputs/ClearTiresByFiltersInputArgs";
import { TireFilterQuery } from "../controllers/queries/TireFilterQuery";
import { generateAllFilters } from "../utils/generateAllFilters";

export interface GetRimsFiltersServiceType {
  sizeR?: number[];
  pcd?: number[];
  studHoles?: number[];
  centerBore?: string[];
  widthAv?: number[];
  widthAr?: number[];
  ofsetAv?: number[];
  ofsetAr?: number[];
  color?: string[];
  price?: string[];
  pagination?: number;
}

export interface GetTiresFiltersServiceType {
  tireWidth?: number[];
  tireAspectRatio?: number[];
  rimDiameter?: number[];
  marka?: string[];
  stock?: number[];
  pagination?: number;
}
const prisma = new PrismaClient();

export const getFiltersAndRimsService = async (
  userSelectedFilters: GetRimsFiltersServiceType
) => {
  
  // esel filltero

  const rimFilterQuery = RimFilterQuery(userSelectedFilters);
  const clearRimData = ClearRimsByFiltersInputArgs(userSelectedFilters);

  const wheelsAndCount = await prisma.$transaction([
    prisma.rims.findMany(clearRimData),
    prisma.rims.count({
      where: rimFilterQuery,
    }),
  ]);

  const [wheels, rimsCount] = wheelsAndCount;

  return {
    filters:await generateAllFilters() ,
    wheelsData: wheels,
    rimsCount: rimsCount,
  };
};

export const getFiltersAndTiresService = async (
  userSelectedFilters: GetTiresFiltersServiceType
) => {
  
  const clearTireFilterData = ClearTiresFiltersInputArgs(userSelectedFilters);
  const tireData: any = await prisma.tire.groupBy(clearTireFilterData);
  const clearTireData = ClearTiresByFiltersInputArgs(userSelectedFilters);
  const rimFilterQuery = TireFilterQuery(userSelectedFilters);

  const wheelsAndCount = await prisma.$transaction([
    prisma.tire.findMany(clearTireData),
    prisma.tire.count({
      where: rimFilterQuery,
    }),
  ]);

  const [tires, tiresCount] = wheelsAndCount;

  return {
    filters: TransformeTiresFilters(tireData),
    tiresData: tires,
    tiresCount: tiresCount,
  };
};

export const getRimCountByFilterService = async (
  userSelectedFilters: GetRimsFiltersServiceType
) => {
 const rimFilterQuery = RimFilterQuery(userSelectedFilters);
 const wheelsAndCount = await prisma.$transaction([
   prisma.rims.count({
     where: rimFilterQuery,
   }),
 ]);

 const [rimsCount] = wheelsAndCount;

 return {
   rimsCount: rimsCount,
 };
};


export const getTireCountByFilterService = async (
  userSelectedFilters: GetTiresFiltersServiceType
) => {
 const tireFilterQuery = TireFilterQuery(userSelectedFilters);
 const tiresAndCount = await prisma.$transaction([
   prisma.tire.count({
     where: tireFilterQuery,
   }),
 ]);

 const [tireCount] = tiresAndCount;

 return {
   tireCount: tireCount,
 };
};
