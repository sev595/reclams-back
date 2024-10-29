import { GetTiresFiltersServiceType } from "../../services/filters.service";
import { TireFilterQuery } from "../queries/TireFilterQuery";

export const ClearTiresByFiltersInputArgs = (
  filter: GetTiresFiltersServiceType
): any => {
  const filterQuery = TireFilterQuery(filter);

  const skip = filter?.pagination ? (filter?.pagination - 1) * 12 : 0;

  const groupedFilters: Record<string, any> = {
    ...(Object.keys(filterQuery).length > 0 && { where: filterQuery }),
    select: {
      id: true,
      marka: true,
      rimDiameter: true,
      stock: true,
      tireAspectRatio: true,
      tireWidth: true,
      price: true,
      imageUrl: true,
    },
    take: 12, // qani hat eta
    skip, // vord uc sksi
  };

  return groupedFilters;
};
