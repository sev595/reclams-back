import { PrismaClient, Tire } from "@prisma/client";
import { Request, Response } from "express";
import {
  TireData,
  TireResponse,
  TiresResponse,
  ErrorResponse,
  CreateTireHandler,
  GetAllTiresHandler,
  GetTireByIdHandler,
  UpdateTireHandler,
  DeleteTireHandler,
} from "./types";
import {
  ClearCreateTireDataHelper,
  ClearUpdateTireDataHelper,
} from "./helpers";
import { readTireDataFromExcel } from "../excel/tire/readTireDataFromExcel";
import { updateTireDB } from "../excel/tire/updateTireDB";

const prisma = new PrismaClient();

export const createTireHandler: CreateTireHandler = async (
  req,
  res
): Promise<any> => {
  try {
    const clearCreateTireData = ClearCreateTireDataHelper(req.body);

    const createdTire = await prisma.tire.create({
      data: { ...clearCreateTireData },
    });

    return res.status(201).json({
      status: "success",
      data: { tire: createdTire },
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Failed to create tire",
    });
  }
};

export const getAllTiresHandler: GetAllTiresHandler = async (
  req,
  res
): Promise<any> => {
  try {
    const allTires = await prisma.tire.findMany();

    return res.status(200).json({
      status: "success",
      data: { tires: allTires },
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Failed to fetch tires",
    });
  }
};

export const getTireByIdHandler: GetTireByIdHandler = async (
  req,
  res
): Promise<any> => {
  try {
    const { id } = req.params;
    const tireId = parseInt(id, 10);

    const tire = await prisma.tire.findUnique({
      where: {
        id: tireId,
      },
    });

    if (!tire) {
      return res.status(404).json({
        status: "error",
        message: "Tire not found",
      });
    }

    return res.status(200).json({
      status: "success",
      data: { tire },
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Failed to fetch tire",
    });
  }
};

export const updateTireHandler: UpdateTireHandler = async (
  req,
  res
): Promise<any> => {
  try {
    const { id } = req.params;
    const tireId = parseInt(id, 10);

    const updatedTireData = ClearUpdateTireDataHelper(req.body);

    const updatedTire = await prisma.tire.update({
      where: {
        id: tireId,
      },
      data: updatedTireData,
    });

    return res.status(200).json({
      status: "success",
      data: { tire: updatedTire },
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Failed to update tire",
    });
  }
};

export const deleteTireHandler: DeleteTireHandler = async (
  req,
  res
): Promise<any> => {
  try {
    const { id } = req.params;
    const tireId = parseInt(id, 10);

    await prisma.tire.delete({
      where: {
        id: tireId,
      },
    });

    return res.status(204).end();
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Failed to delete tire",
    });
  }
};

export const integreateExelHandler = async (req: any, res: any) => {
  try {
    const filePath = req.file.path;
    const tiresToUpdate = await readTireDataFromExcel(filePath);

    await updateTireDB(tiresToUpdate);

    return res
      .status(200)
      .json({ success: true, message: "Excel file integrated successfully" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
