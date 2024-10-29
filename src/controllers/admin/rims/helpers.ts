export const ClearCreateRimDataHelper = (body: any) => {
  const {
    sizeR,
    studHoles,
    pcd,
    centerBore,
    rimModel,
    widthAr,
    widthAv,
    ofsetAr,
    ofsetAv,
    color,
    gram,
    description,
    imageUrl,
    price,
    score,
    stock,
  } = body;

  return {
    sizeR: Number(sizeR),
    studHoles: Number(studHoles),
    pcd: Number(pcd),
    centerBore: Number(centerBore),
    rimModel,
    widthAr: Number(widthAr),
    widthAv: Number(widthAv),
    ofsetAr: Number(ofsetAr),
    ofsetAv: Number(ofsetAv),
    color,
    gram: Number(gram),
    description,
    imageUrl,
    price: Number(price),
    stock: Number(stock),
    score: 1,
  };
};

export const ClearUpdateRimDataHelper = (body: any) => {
  const {
    sizeR,
    studHoles,
    pcd,
    centerBore,
    rimModel,
    width,
    color,
    gram,
    description,
    imageUrl,
    price,
    stock,
    score,
  } = body;

  return {
    sizeR: Number(sizeR),
    studHoles: Number(studHoles),
    pcd: Number(pcd),
    centerBore: Number(centerBore),
    rimModel,
    width: Number(width),
    color,
    gram: Number(gram),
    description,
    imageUrl,
    price: Number(price),
    score: Number(score),
    stock: Number(stock),
  };
};
