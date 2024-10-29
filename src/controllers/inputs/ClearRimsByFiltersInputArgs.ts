import { GetRimsFiltersServiceType } from "../../services/filters.service";
import { RimFilterQuery } from "../queries/RimFilterQuery";

export const ClearRimsByFiltersInputArgs = (
  filter: GetRimsFiltersServiceType
): any => {
  const filterQuery = RimFilterQuery(filter);

  const skip = filter?.pagination ? (filter?.pagination - 1) * 12 : 0;

  const groupedFilters: Record<string, any> = {
    ...(Object.keys(filterQuery).length > 0 && { where: filterQuery }),
    select: {
      id: true,
      rimModel: true,
      sizeR: true,
      centerBore: true,
      price: true,
      pcd: true,
      studHoles: true,
      imageUrl: true,
      widthAv: true,
      widthAr: true,
      ofsetAv: true,
      ofsetAr: true,
      color: true,
    },
    take: 12, // qani hat eta
    skip, // vord uc sksi
  };

  return groupedFilters;
};
