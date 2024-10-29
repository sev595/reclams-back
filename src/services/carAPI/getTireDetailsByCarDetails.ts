import axios from "axios";
import { CarDetailsType } from "./carType";
import { generateUrl } from "./generateApiUrl";

// Function to extract tire information from the input array
function extractTireInformation(inputArray: any) {
  const tireArray: any = [];

  inputArray.forEach((item: any) => {
    // Check if front tire details are available and push them to the tireArray
    if (
      item.front &&
      item.front.tire_width &&
      item.front.tire_aspect_ratio &&
      item.front.rim_diameter
    ) {
      tireArray.push({
        tireWidth: item.front.tire_width,
        tireAspectRatio: item.front.tire_aspect_ratio,
        rimDiameter: item.front.rim_diameter,
      });
    }
    // Check if rear tire details are available and push them to the tireArray
    if (
      item.rear &&
      item.rear.tire_width &&
      item.rear.tire_aspect_ratio &&
      item.rear.rim_diameter
    ) {
      tireArray.push({
        tireWidth: item.rear.tire_width,
        tireAspectRatio: item.rear.tire_aspect_ratio,
        rimDiameter: item.rear.rim_diameter,
      });
    }
  });

  return tireArray;
}

// Asynchronous function to get tire details by car details
export const GetTireDetailsByCarDetails = async (
  props: CarDetailsType
): Promise<any> => {
  try {
    // Generate URL for the API request
    let url = generateUrl({ ...props, key: "search/by_model" });

    // Fetch data using Axios
    const response = await axios.get(url);

    // Extract tire information from the response data
    const tireDetails = extractTireInformation(response.data[0].wheels);

    return tireDetails;
  } catch (error) {
    // Handle errors, if any
    console.error("Error fetching tire details:", error);
    throw error; // Rethrow the error for handling at a higher level
  }
};
