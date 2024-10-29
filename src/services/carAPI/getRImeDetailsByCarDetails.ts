import axios from "axios";
import { CarDetailsType } from "./carType";
import { generateUrl } from "./generateApiUrl";



export const generateRimAndTireDetails = (data: any) => {
  const findUnic = data[0].technical;

  function transformObject(inputObj:any) {
    const result:any = {};
  
    if (!isNaN(inputObj.stud_holes) && inputObj.stud_holes !== null && inputObj.stud_holes !== '') {
      result.studHoles = Number(inputObj.stud_holes);
    }
  
    if (!isNaN(inputObj.pcd) && inputObj.pcd !== null && inputObj.pcd !== '') {
      result.pcd = Number(inputObj.pcd);
    }
    if (!isNaN(parseFloat(inputObj.centre_bore)) && inputObj.centre_bore !== null && inputObj.centre_bore !== '') {
      result.centerBore = parseFloat(inputObj.centre_bore);
    }
  
    return result;
  }
  
  const transformedArray = []
    .concat(
      ...data[0].wheels.map((item: any) => {
        return [
          {
            sizeR: item.front.rim_diameter,
            widthAv: { gte: item.front.rim_width - 1, lte: item.front.rim_width + 1 },  // Range for front width
            ofsetAv: { gte: item.front.rim_offset - 1, lte: item.front.rim_offset + 1 },  // Range for front width
          },
          {
            sizeR: item.rear?.rim_diameter,
            widthAr: { gte: item.rear?.rim_width - 1, lte: item.rear?.rim_width + 1 },  // Range for rear width
            ofsetAr: { gte: item.rear?.rim_offset - 1, lte: item.rear?.rim_offset + 1 },  // Range for rear width
          },
          // {
          //   sizeR: item.front.rim_diameter,
          //   widthAv: item.front.rim_width,  
          //   ofsetAv: item.front.rim_offset
          // },
          // {
          //   sizeR: item.rear?.rim_diameter,
          //   widthAr: item.rear?.rim_width,
          //   ofsetAr: item.rear.rim_offset
          // },
        ]
      })
    )
    .filter((obj: any) => obj.sizeR !== null && obj.width !== null);

  const test = {
    stud_holes: 5,
    pcd: 120,
    centre_bore: '72.6',
  }



  const rimDetails = {
    ...transformObject(findUnic),
    OR: transformedArray,
  };
  console.log(444, findUnic);

  const rimeFront = data[0].wheels[0].front;

  const tireDetails = {
    tireWidth: rimeFront.tire_width ?? undefined,
    tireAspectRatio: rimeFront.tire_aspect_ratio ?? undefined,
    rimDiameter: rimeFront.rim_diameter ?? undefined,
  };

  return {
    rimDetails,
    tireDetails,
  };
};

export const GetRImeDetailsByCarDetails = async (
  props: CarDetailsType
): Promise<any> => {
  try {
    let url = generateUrl({ ...props, key: "search/by_model" });
    const response = await axios.get(url);
    const testJson = response.data;
    return generateRimAndTireDetails(testJson.data);
  } catch (error) {
    console.error("Error fetching rim and tire details:", error);
  }
};
