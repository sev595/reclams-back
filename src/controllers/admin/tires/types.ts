import { Tire } from '@prisma/client';
import { Request, Response } from 'express';

export interface TireData {
  tireWidth: number;
  tireAspectRatio: number;
  rimDiameter: number;
  marka: string;
  stock: number;
  imageUrl: string;
}

export interface TireResponse {
  status: string;
  data: { tire: Tire };
}

export interface TiresResponse {
  status: string;
  data: { tires: Tire[] };
}

export interface ErrorResponse {
  status: string;
  message: string;
}

export type CreateTireHandler = (req: Request, res: Response) => Promise<void>;
export type GetAllTiresHandler = (req: Request, res: Response) => Promise<void>;
export type GetTireByIdHandler = (req: Request, res: any) => Promise<void>;
export type UpdateTireHandler = (req: Request, res: Response) => Promise<void>;
export type DeleteTireHandler = (req: Request, res: Response) => Promise<void>;
