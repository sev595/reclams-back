import {  Request, Response } from "express";

import { searchService } from "../../../services/search.service";

export const search = async (
    req: Request,
    res: Response,
  ) => {
    try {
      const filterData = await searchService(req.query.query);
  
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