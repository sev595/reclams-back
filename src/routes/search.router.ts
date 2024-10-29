import express from "express";
import {
  search
} from "../controllers/admin/search/search.controller";

const router = express.Router();

router.get("/search", search);

export default router;
