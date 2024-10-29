import {  Request, Response } from "express";
import {
  getFiltersAndRimsService,
  getFiltersAndTiresService,
  getRimCountByFilterService,
  getTireCountByFilterService,
} from "../services/filters.service";
import { generalSearchService } from "../services/search.service";

export const getAllRimsFilters = async (req: Request, res: Response) => {
  try {
    const filterData = await getFiltersAndRimsService(req.body);
    
    return res.status(200).json({
      status: "success",
      filterData,
    });
  } catch (err: any) {
    return res.status(500).json({
      status: "error",
      message: "issues  with  getAllRimsFilters",
    });
  }
};

export const getAllTiresFilters = async (
  req: Request,
  res: Response,
) => {
  try {
    const filterData = await getFiltersAndTiresService(req.body);

    return res.status(200).json({
      status: "success",
      filterData,
    });
  } catch (err: any) {
    return res.status(502).json({
      status: "failed",
      message: "An error occurred",
    });
  }
};

export const generalSearch = async (
  req: Request,
  res: Response,
) => {
  try {
    const filterData = await generalSearchService(req.query.query);

    return res.status(200).json({
      status: "success",
      filterData,
    });
  } catch (err: any) {
    return res.status(502).json({
      status: "failed",
      message: "An error occurred",
    });
  }
};

export const getRimCountByFilter = async (
  req: Request,
  res: Response,
) => {
  try {
    const count = await getRimCountByFilterService(req.body);

    return res.status(200).json({
      status: "success",
      count,
    });
  } catch (err: any) {
    return res.status(502).json({
      status: "failed",
      message: "An error occurred",
    });
  }
};
export const getTireCountByFilter = async (
  req: Request,
  res: Response,
) => {
  try {
    const count = await getTireCountByFilterService(req.body);

    return res.status(200).json({
      status: "success",
      count,
    });
  } catch (err: any) {
    return res.status(502).json({
      status: "failed",
      message: "An error occurred",
    });
  }
};