import { CarDetailsType } from "./carType";

export const generateUrl = ({
  key,
  make,
  model,
  generation,
  modification,
}: CarDetailsType) => {
  let url = `${process.env.WHEEL_SIZE_API_URL}/${key}/?`;

  const makeParams = make ? `make=${make}&` : "";
  const modelParams = model ? `model=${model}&` : "";
  const modificationParams = modification
    ? `modification=${modification}&`
    : "";
  const generationParams = generation ? `generation=${generation}&` : "";
  const apyKey = "user_key=6a9581f8354332ae03dc54d566c97986";
  url =
    url +
    makeParams +
    modelParams +
    generationParams +
    modificationParams +
    apyKey;

  return url;
};
