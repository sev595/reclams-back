import { Post } from '@prisma/client';
import { Request, Response } from 'express';

export interface PostData {
  title:string;
  description:string;
  imageUrl: string;
}

export interface PostResponse {
  status: string;
  data: { Post: Post };
}

export interface PostsResponse {
  status: string;
  data: { posts: Post[] };
}

export interface ErrorResponse {
  status: string;
  message: string;
}

export type CreatePostHandler = (req: Request, res: Response) => Promise<void>;
export type GetAllPostsHandler = (req: Request, res: Response) => Promise<void>;
export type GetPostByIdHandler = (req: Request, res: any) => Promise<void>;
export type UpdatePostHandler = (req: Request, res: Response) => Promise<void>;
export type DeletePostHandler = (req: Request, res: Response) => Promise<void>;
