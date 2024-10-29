import axios from "axios";
import { CarsDataFormater } from "../../controllers/helpers/CarsDataFormater";
import { generateUrl } from "./generateApiUrl";

export const getCarsDetailsByCarDetails = async (
  key: string,
  make?: string,
  model?: string,
  generation?: string,
  modification?: string
) => {
  const url = generateUrl({ key, make, model, generation, modification });

  try {
    
    const response = await axios.get(url);
    const testData = response.data;
    return CarsDataFormater(testData);
  } catch (error: any) {
    // console.log(222,error);
    
    throw error;
  }
};
