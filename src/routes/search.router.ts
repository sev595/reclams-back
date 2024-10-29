import express from "express";
import {
  generalSearch
} from "../controllers/filters.controller";

const router = express.Router();

router.get("/general-search", generalSearch);

export default router;
