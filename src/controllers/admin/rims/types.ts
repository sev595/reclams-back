import { Rims } from "@prisma/client";
import { Response } from "express";

interface RequestWithParams<P> {
  params: P;
}

interface RequestWithBody<B> {
  body: B;
}

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

export type CreateRimHandler = (
  req: RequestWithBody<RimData>,
  res: any
) => Promise<void>;
export type GetAllRimsHandler = (
  req: RequestWithParams<any>,
  res: any
) => Promise<void>;
export type GetRimByIdHandler = (
  req: RequestWithParams<{ id: string }>,
  res: any
) => Promise<void>;
export type UpdateRimHandler = (
  req: RequestWithParams<{ id: string }> & RequestWithBody<RimData>,
  res: any
) => Promise<void>;
export type DeleteRimHandler = (
  req: RequestWithParams<{ id: string }>,
  res: any
) => Promise<void>;
