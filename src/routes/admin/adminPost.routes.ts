import express from "express";
import { VerifyJWTToken } from "../../services/jwt/verifyJWTToken";
import { createPostHandler, deletePostHandler, getAllPostsHandler, getPostByIdHandler, updatePostHandler } from "../../controllers/admin/posts/adminPosts.controller";

const router = express.Router();
router.use(VerifyJWTToken);

// Route to get all posts
router.get("/all", getAllPostsHandler);

// Route to create a new post
router.post("/create", createPostHandler);

// Route to get a post by ID
router.get("/:id", getPostByIdHandler);

// Route to update a post by ID
router.put("/:id", updatePostHandler);

// Route to delete a post by ID
router.delete("/:id", deletePostHandler);

export default router;
