import { Request, Response } from "express";

import {
  findRecommendedTiresService,
  findTireByInputArgsService,
} from "../services/tires.service";
import { findRecommendedRimsService } from "../services/rims.service";

export const getSingleTireDataHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const tireId = +id;

    const singleTire = await findTireByInputArgsService({
      where: {
        id: tireId,
      },
      select: {
        id: true,
        imageUrl: true,
        marka: true,
        rimDiameter: true,
        stock: true,
        tireAspectRatio: true,
        tireWidth: true,
        price: true,
      },
    });

    const recommendedTires: any = await findRecommendedTiresService({
      where: {
        price: singleTire.price || undefined,
        tireWidth: singleTire.tireWidth || undefined,
        rimDiameter: singleTire.rimDiameter || undefined,
        NOT: {
          id: tireId, // Exclude records where the id is equal to 4
        },
      },
      select: {
        id: true,
        imageUrl: true,
        marka: true,
        rimDiameter: true,
        stock: true,
        tireAspectRatio: true,
        tireWidth: true,
        price: true,
      },
    });

    const recommendedRims: any = await findRecommendedRimsService({
      where: {
        sizeR: singleTire.rimDiameter || undefined,
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
        widthAv: true,
        ofsetAr: true,
        ofsetAv: true,
        gram: true,
      },
    });

    return res.status(200).json({
      status: "success",
      singleTire,
      recommendedTires,
      recommendedRims,
    });
  } catch (err: any) {
    return res
      .status(500)
      .json({ status: "error", message: "Internal server error" }); // Send appropriate error response
  }
};
