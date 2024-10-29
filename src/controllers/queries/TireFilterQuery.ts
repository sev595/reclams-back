import { GetTiresFiltersServiceType } from "../../services/filters.service";

export const TireFilterQuery = (filter: GetTiresFiltersServiceType) => {
  const { marka,rimDiameter,stock,tireAspectRatio,tireWidth } = filter;

  const filterQuery: Record<string, { in: (number | string)[] }> = {};

  if (marka && marka.length > 0) {
    filterQuery.marka = { in: marka };
  }

  if (rimDiameter && rimDiameter.length > 0) {
    filterQuery.rimDiameter = { in: rimDiameter };
  }

  if (stock && stock.length > 0) {
    filterQuery.stock = { in: stock };
  }

  if (tireAspectRatio && tireAspectRatio.length > 0) {
    filterQuery.tireAspectRatio = { in: tireAspectRatio };
  }
  if (tireWidth && tireWidth.length > 0) {
    filterQuery.tireWidth = { in: tireWidth };
  }




  return filterQuery
}