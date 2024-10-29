export const ClearCreateTireDataHelper = (body: any) => {
  const {
    tireWidth,
    tireAspectRatio,
    rimDiameter,
    marka,
    stock,
    imageUrl,
    price,
  } = body;

  return {
    tireWidth: Number(tireWidth),
    tireAspectRatio: Number(tireAspectRatio),
    rimDiameter: Number(rimDiameter),
    marka,
    stock: Number(stock),
    imageUrl,
    price: Number(price),
  };
};

export const ClearUpdateTireDataHelper = (body: any) => {
  const {
    tireWidth,
    tireAspectRatio,
    rimDiameter,
    marka,
    stock,
    imageUrl,
    price,
  } = body;

  return {
    tireWidth: Number(tireWidth),
    tireAspectRatio: Number(tireAspectRatio),
    rimDiameter: Number(rimDiameter),
    marka,
    stock: Number(stock),
    imageUrl,
    price: Number(price),
  };
};
