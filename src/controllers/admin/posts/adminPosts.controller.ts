import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { CreatePostHandler, DeletePostHandler, GetAllPostsHandler, GetPostByIdHandler, UpdatePostHandler } from "./types";
import {
  ClearCreatePostDataHelper,
  ClearUpdatePostDataHelper,
} from "./helpers";

const prisma = new PrismaClient();

export const createPostHandler: CreatePostHandler = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const clearCreatePostData = ClearCreatePostDataHelper(req.body);

    const createdPost = await prisma.post.create({
      data: { ...clearCreatePostData },
    });

    return res.status(201).json({
      status: "success",
      data: { post: createdPost },
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Failed to create post",
    });
  }
};

export const getAllPostsHandler: GetAllPostsHandler = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const allPosts = await prisma.post.findMany();

    return res.status(200).json({
      status: "success",
      data: { posts: allPosts },
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Failed to fetch posts",
    });
  }
};

export const getPostByIdHandler: GetPostByIdHandler = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = req.params;
    const postId = parseInt(id, 10);

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      return res.status(404).json({
        status: "error",
        message: "Post not found",
      });
    }

    return res.status(200).json({
      status: "success",
      data: { post },
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Failed to fetch post",
    });
  }
};

export const updatePostHandler: UpdatePostHandler = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = req.params;
    const postId = parseInt(id, 10);

    const updatedPostData = ClearUpdatePostDataHelper(req.body);

    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: updatedPostData,
    });

    return res.status(200).json({
      status: "success",
      data: { post: updatedPost },
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Failed to update post",
    });
  }
};

export const deletePostHandler: DeletePostHandler = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = req.params;
    const postId = parseInt(id, 10);

    await prisma.post.delete({
      where: {
        id: postId,
      },
    });

    return res.status(204).end();
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Failed to delete post",
    });
  }
};
