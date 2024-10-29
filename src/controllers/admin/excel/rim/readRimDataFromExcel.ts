import fs from "fs";
import * as XLSX from "xlsx";

function extractInfo(row: any) {
  if (!row[0]) return;

  let images: string = [row[17], row[18], row[19], row[20]]
    .filter((value) => value)
    .join(";");
  return {
    rimModel: row[0] ?? "",
    stock: row[1] ?? 0,
    sizeR: row[5] ?? 0,
    studHoles: +row[6]?.split("x")[0] ?? 0,
    pcd: +row[6]?.split("x")[1] ?? 0,
    centerBore: isNaN(+row[7]) ? 0 : +row[7],
    widthAv: isNaN(+row[8]) ? 0 : +row[8],
    widthAr: isNaN(+row[9]) ? 0 : +row[9],
    ofsetAv: isNaN(+row[10]) ? 0 : +row[10],
    ofsetAr: isNaN(+row[11]) ? 0 : +row[11],

    color: row[12] ?? "",
    description: "description",
    imageUrl: images,
    price: +row[15] ?? 0,
    gram: +row[13] ?? 0,
    score: 1,
  };
}

export const readRimDataFromExcel = async (filePath: string) => {
  const workbook = XLSX.readFile(filePath);

  const sheetName = process.env.RIM_SHEET_NAME as string;
  const worksheet = workbook.Sheets[sheetName];

  if (!worksheet) {
    throw new Error("SHeet name must be WHEELS");
  }

  const ref = worksheet["!ref"] as string;
  const range = XLSX.utils.decode_range(ref);

  const startRow = range.s.r + 2; // Start from the first row
  const endRow = range.e.r; // End at the last row

  const data = [];

  for (let rowNum = startRow; rowNum < endRow; rowNum++) {
    const row = XLSX.utils.sheet_to_json(worksheet, { header: 1 })[rowNum];
    const item = extractInfo(row);
    if (item) {
      data.push(item);
    }
  }

  fs.unlinkSync(filePath);

  return data;
};
