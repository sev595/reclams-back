import { GetRimsFiltersServiceType } from "../../services/filters.service";

const parseRangerParams = (array: any[], name: string) => {
  const parsArray = array.map((item) => {
    return {
      [name]: {
        gte: item + 1,
        lte: item + 1
      }
    }
  })

  return parsArray
}
// prosty filtrov
export const RimFilterQuery = (filter: GetRimsFiltersServiceType) => {
  const { sizeR, pcd, studHoles, centerBore, widthAv, widthAr, ofsetAv, ofsetAr, color, price } = filter;
  
  const filterQuery: Record<string, any> = {};

  if (sizeR && sizeR.length > 0) {
    filterQuery.sizeR = { in: sizeR };
  }

  if (pcd && pcd.length > 0) {
    filterQuery.pcd = { in: pcd };
  }

  if (studHoles && studHoles.length > 0) { 
    filterQuery.studHoles = { in: studHoles };
  }

  if (centerBore && centerBore.length > 0) {
    filterQuery.centerBore = { in: centerBore };
  }  
  if (widthAv && widthAv.length > 0) {
    filterQuery.widthAv = { in: widthAv };
  }  
  if (widthAr && widthAr.length > 0) {
    filterQuery.widthAr = { in: widthAr };
  }  
  if ( ofsetAv && ofsetAv.length > 0) {
    filterQuery.ofsetAv = { in: ofsetAv };
  }  
  if (ofsetAr && ofsetAr.length > 0) {
    filterQuery.ofsetAr = { in: ofsetAr };
  }  
  
  // ///  naxnakanna
  // if (widthAv || widthAr || ofsetAr || ofsetAv)
  //   filterQuery.OR = []
  
  // if (widthAv && widthAv.length > 0) {
  //   filterQuery.OR = [...filterQuery.OR, ...parseRangerParams(widthAv, "widthAv")];
  // }

  // if (widthAr && widthAr.length > 0) {
  //   filterQuery.OR = [...filterQuery.OR, ...parseRangerParams(widthAr, "widthAv")];

  // }

  // if (ofsetAv && ofsetAv.length > 0) {
  //   filterQuery.OR = [...filterQuery.OR, ...parseRangerParams(ofsetAv, "ofsetAv")];

  // }

  // if (ofsetAr && ofsetAr.length > 0) {
  //   filterQuery.OR = [...filterQuery.OR, ...parseRangerParams(ofsetAr, "ofsetAv")];

  // }

  if (color && color.length > 0) {
    filterQuery.color = { in: color };
  }

  if (price && price.length > 0) {
    filterQuery.price = { in: price };
  }

  return filterQuery;
};

// {
//   studHoles: [ 5 ],
//   pcd: [ 120 ],
//   centerBore: [ 72.6 ],
//   sizeR: [ '16', '17', '18' ],
//   widthAr: [ '7.5-9.5' ],
//   widthAv: [ '6-8', '7-9' ],
//   ofsetAr: [ '36-38' ],
//   ofsetAv: [ '33-35' ],
//   pagination: 0
// }


export interface GetRimsFiltersRangeServiceType {
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
