import { NextFunction, Request, Response } from "express";
import {
  findAllRimsService,
  findPopularRimsService,
  findRecommendedRimsService,
  findRimByInputArgsService,
  findRimsByInputArgsService,
} from "../services/rims.service";
import {
  findTiresByInputArgsService,
  findTiresTestService,
} from "../services/tires.service";
import { GetRImeDetailsByCarDetails } from "../services/carAPI/getRImeDetailsByCarDetails";
import { getCarsDetailsByCarDetails } from "../services/carAPI/getCarsDetailsByCarDetails";
import { GetTireDetailsByCarDetails } from "../services/carAPI/getTireDetailsByCarDetails";

export const getAllRimsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const rims = await findAllRimsService({
      id: true,
      sizeR: true,
      studHoles: true,
      pcd: true,
      centerBore: true,
    });

    return res.status(200).json({
      status: "success",
      data: {
        rims,
      },
    });
  } catch (err: any) {
    return res
      .status(500)
      .json({ status: "error", message: "Internal server error" }); // Send appropriate error response
  }
};

export const getRimsByCarInputArgsHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { pagination } = req.body.where;
    const { rimDetails, tireDetails } = await GetRImeDetailsByCarDetails(
      req.body.where
    );
      
    const { rims, rimsCount } = await findRimsByInputArgsService({
      where: rimDetails,
      select: {
        id: true,
        sizeR: true,
        centerBore: true,
        imageUrl: true,
        rimModel: true,
        price: true,
        pcd: true,
        studHoles: true,
        widthAr:true,
        widthAv:true

      },
      pagination,
    });

    const tires = await findTiresByInputArgsService({
      where: tireDetails,
      select: {
        id: true,
        tireWidth: true,
        price: true,
        rimDiameter: true,
        marka: true,
        stock: true,
        tireAspectRatio: true,
        imageUrl: true,
      },
    });

    return res.status(200).json({
      status: "success",
      data: { rims, tires, rimsCount, rimDetails },
    });
  } catch (err: any) {
    console.log(err);
    
    return res
      .status(500)
      .json({ status: "error", message: "Internal server error" }); // Send appropriate error response
  }
};

export const getCarDatailsHandler = async (req: Request, res: Response) => {
  try {
    const { where } = req.body;

    let modelDada,
      generationDada,
      modificationDada: any = [];
    if (where?.make) {
      modelDada = await getCarsDetailsByCarDetails(
        "models",
        where?.make as string
      );
    }

    if (where?.make && where?.model) {
      generationDada = await getCarsDetailsByCarDetails(
        "generations",
        where?.make as string,
        where?.model as string
      );
    }
    /// stuc nerqev

    if (where?.make && where?.model && where?.generation) {
      modificationDada = await getCarsDetailsByCarDetails(
        "modifications",
        where?.make as string,
        where?.model as string,
        where?.generation as string
      );
    }

    return res.status(200).json({
      status: "success",
      data: {
        modelDada,
        generationDada,
        modificationDada,
      },
    });
  } catch (err: any) {
    return res
      .status(500)
      .json({ status: "error", message: "Internal server error" }); // Send appropriate error response
  }
};

export const getCarsMakeHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const dataFromApi = await getCarsDetailsByCarDetails("makes");

    return res.status(200).json({
      status: "success",
      data: dataFromApi,
    });
  } catch (err: any) {
    return res
      .status(500)
      .json({ status: "error", message: "Internal server error" }); // Send appropriate error response
  }
};

export const getSingleRimDataHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { body } = req;

    const rimId = +id;

    const singleRim = await findRimByInputArgsService({
      where: {
        id: rimId,
      },
      select: {
        id: true,
        sizeR: true,
        studHoles: true,
        pcd: true,
        centerBore: true,
        imageUrl: true,
        color: true,
        price: true,
        rimModel: true,
        widthAr: true,
        widthAv:true,
        ofsetAr:true,
        ofsetAv:true,
        gram: true,
        score: true,
        stock: true,
      },
    });

    const recommendedRims: any = await findRecommendedRimsService({
      where: {
        studHoles: singleRim.studHoles || undefined,
        pcd: singleRim.pcd || undefined,
        centerBore: singleRim.centerBore || undefined,
        NOT: {
          id: rimId, // Exclude records where the id is equal to 4
        },
      },
      select: {
        id: true,
        sizeR: true,
        studHoles: true,
        pcd: true,
        centerBore: true,
        imageUrl: true,
        color: true,
        price: true,
        rimModel: true,
        widthAr: true,
        widthAv:true,
        ofsetAr:true,
        ofsetAv:true,
        gram: true,
      },
    });

    let tires: any = [];
    if (body.make && body.model & body.year && body.modification) {
      const tireData = await GetTireDetailsByCarDetails(body);
      tires = await findTiresByInputArgsService({
        where: {
          OR: tireData,
        },
        select: {
          id: true,
          tireWidth: true,
          price: true,
          tireAspectRatio: true,
          rimDiameter: true,
          imageUrl: true,
          stock:true
        },
      });
    } else {
      tires = await findTiresTestService({
        select: {
          id: true,
          tireWidth: true,
          price: true,
          tireAspectRatio: true,
          rimDiameter: true,
          imageUrl: true,
          stock:true
        },
      });
    }

    return res.status(200).json({
      status: "success",
      singleRim,
      recommendedTires: tires,
      recommendedRims: recommendedRims,
    });
  } catch (err: any) {
    console.error(err); // Log errors
    return res
      .status(500)
      .json({ status: "error", message: "Internal server error" }); // Send appropriate error response
  }
};

export const getPopularRimsDataHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const popularRims = await findPopularRimsService();

    return res.status(200).json({
      status: "success",
      popularRims,
    });
  } catch (err: any) {
    return res
      .status(500)
      .json({ status: "error", message: "Internal server error" }); // Send appropriate error response
  }
};
