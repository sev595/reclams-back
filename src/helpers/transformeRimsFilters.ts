interface InputItem {
  _count: {
    sizeR: number;
    pcd: number;
    studHoles: number;
    centerBore: number;
    widthAv: number;
    widthAr: number;
    ofsetAv: number;
    ofsetAr: number;
    color: number;
    price: number;
  };
  sizeR: number;
  pcd: number;
  studHoles: number;
  centerBore: number | string; // Allow centerBore to be a string
  widthAv: number;
  widthAr: number;
  ofsetAv: number;
  ofsetAr: number;
    color: number | string;
  price: number;
}

interface OutputItem {
  count: number;
  sizeR?: number;
  pcd?: number;
  studHoles?: number;
  centerBore?: number;
  widthAv?: number;
  widthAr?: number;
  ofsetAv?: number;
  ofsetAr?: number;
  color?: any;
  price?: number;
}

interface TransformResult {
  sizeR: OutputItem[];
  pcd: OutputItem[];
  studHoles: OutputItem[];
  centerBore: OutputItem[];
  widthAv: OutputItem[];
  widthAr: OutputItem[];
  ofsetAr: OutputItem[];
  ofsetAv: OutputItem[];
  color: OutputItem[];
  price: OutputItem[];
}

type UpdateResultKey =
  | "sizeR"
  | "pcd"
  | "studHoles"
  | "centerBore"
  | "widthAv"
  | "widthAr"
  | "ofsetAv"
  | "ofsetAr"
  | "color"
  | "price";

export const TransformeRimsFilters = (
  inputArray: InputItem[]
): TransformResult => {
  const result: TransformResult = {
    sizeR: [],
    pcd: [],
    studHoles: [],
    centerBore: [],
    widthAr: [],
    widthAv: [],
    ofsetAr: [],
    ofsetAv: [],
    color: [],
    price: [],
  };

  const updateResult = (
    key: UpdateResultKey,
    count: number,
    value?: number | string
  ) => {
    const entry = result[key].find(
      (entry) => (value === undefined ? entry.count : entry[key]) === value
    );
    if (entry) {
      entry.count += count;
    } else {
      const newItem: OutputItem = { count };
      if (value !== undefined) {
        newItem[key] = value;
      }
      result[key].push(newItem);
    }
  };

  inputArray.forEach(
    ({ _count, sizeR, pcd, studHoles, centerBore, widthAv,widthAr, ofsetAv,ofsetAr, color, price }) => {
      updateResult("sizeR", _count.sizeR, sizeR);
      updateResult("pcd", _count.pcd, pcd);
      updateResult("studHoles", _count.studHoles, studHoles);
      updateResult("widthAv", _count.widthAv, widthAv);
      updateResult("widthAr", _count.widthAr, widthAr);
      updateResult("ofsetAv", _count.ofsetAv, ofsetAv);
      updateResult("ofsetAr", _count.ofsetAr, ofsetAr);

      updateResult("color", _count.color, color);
      updateResult("price", _count.price, price);
      updateResult("centerBore", _count.centerBore, Number(centerBore)); // Convert centerBore to number
    }
  );

  return result;
};
