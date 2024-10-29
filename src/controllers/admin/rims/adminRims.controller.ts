import { PrismaClient, Rims } from "@prisma/client";
import { Request, Response } from "express";
import { ClearCreateRimDataHelper, ClearUpdateRimDataHelper } from "./helpers";
import { readRimDataFromExcel } from "../excel/rim/readRimDataFromExcel";
import { updateRimDB } from "../excel/rim/updateRimDB";

interface RequestWithBody<B> extends Request {
  body: B;
}
interface ResponseWithData<T> extends Response {
  json: (body: T) => this;
}

const prisma = new PrismaClient();

export interface RimData {
  sizeR: number;
  studHoles: number;
  pcd: number;
  centerBore: string;
  rimModel: string;
  width: number;
  color: string;
  gram: number;
  description: string;
  imageUrl: string;
  price: number;
  score: number;
}

export interface RimResponse {
  status: string;
  data: { rim: Rims };
}

export interface RimsResponse {
  status: string;
  data: { rims: Rims[] };
}

export interface ErrorResponse {
  status: string;
  message: string;
}

export const createRimHandler: (
  req: RequestWithBody<RimData>,
  res: ResponseWithData<RimResponse | ErrorResponse>
) => Promise<any> = async (req, res) => {
  try {
    const clearCreateRimData = ClearCreateRimDataHelper(req.body);

    const createdRim = await prisma.rims.create({
      data: clearCreateRimData,
    });

    return res.status(201).json({
      status: "success",
      data: { rim: createdRim },
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Failed to create rim",
    });
  }
};

export const getAllRimsHandler: (
  req: Request,
  res: ResponseWithData<RimsResponse | ErrorResponse>
) => Promise<any> = async (req, res) => {
  try {
    const allRims = await prisma.rims.findMany();

    return res.status(200).json({
      status: "success",
      data: { rims: allRims },
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Failed to fetch rims",
    });
  }
};

export const getRimByIdHandler: (
  req: any,
  res: ResponseWithData<RimResponse | ErrorResponse>
) => Promise<any> = async (req, res) => {
  try {
    const { id } = req.params;
    const rimId = parseInt(id, 10);

    const rim = await prisma.rims.findUnique({
      where: {
        id: rimId,
      },
    });

    if (!rim) {
      return res.status(404).json({
        status: "error",
        message: "Rim not found",
      });
      return; // Ensure function exits after sending response
    }

    return res.status(200).json({
      status: "success",
      data: { rim },
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Failed to fetch rim",
    });
  }
};

export const updateRimHandler: (
  req: any & RequestWithBody<RimData>,
  res: ResponseWithData<RimResponse | ErrorResponse>
) => Promise<any> = async (req, res) => {
  try {
    const { id } = req.params;
    const rimId = parseInt(id, 10);

    const clearUpdateRimData = ClearUpdateRimDataHelper(req.body);

    const updatedRim = await prisma.rims.update({
      where: {
        id: rimId,
      },
      data: clearUpdateRimData,
    });

    return res.status(200).json({
      status: "success",
      data: { rim: updatedRim },
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Failed to update rim",
    });
  }
};

export const deleteRimHandler: (
  req: any,
  res: ResponseWithData<any | ErrorResponse>
) => Promise<any> = async (req, res) => {
  try {
    const { id } = req.params;
    const rimId = parseInt(id, 10);

    await prisma.rims.delete({
      where: {
        id: rimId,
      },
    });

    return res.status(204).end();
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Failed to delete rim",
    });
  }
};

export const integreateExelHandler = async (req: any, res: any) => {
  try {
    const filePath = req.file.path;
    const rimsToUpdate = await readRimDataFromExcel(filePath);

    await updateRimDB(rimsToUpdate);

    return res
      .status(200)
      .json({ success: true, message: "Excel file integrated successfully" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
