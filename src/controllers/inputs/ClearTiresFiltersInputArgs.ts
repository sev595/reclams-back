import { GetTiresFiltersServiceType } from "../../services/filters.service";

export const ClearTiresFiltersInputArgs = (
  filter: GetTiresFiltersServiceType
): any => {
  const filterQuery: Record<string, { in: (number | string)[] }> = {};

  const groupedFilters: Record<string, any> = {
    by: ["marka", "rimDiameter", "stock", "tireAspectRatio", "tireWidth"],
    _count: {
      marka: true,
      rimDiameter: true,
      stock: true,
      tireAspectRatio: true,
      tireWidth: true,
      price: true,
      imageUrl: true,
    },
    ...(Object.keys(filterQuery).length > 0 && { having: filterQuery }),
  };

  return groupedFilters;
};
