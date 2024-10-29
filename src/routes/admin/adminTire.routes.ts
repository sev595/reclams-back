import express from "express";
import {
  createTireHandler,
  deleteTireHandler,
  getAllTiresHandler,
  getTireByIdHandler,
  integreateExelHandler,
  updateTireHandler,
} from "../../controllers/admin/tires/adminTires.controller";
import { upload } from "../../controllers/admin/excel/storage";
import { VerifyJWTToken } from "../../services/jwt/verifyJWTToken";

const router = express.Router();
router.use(VerifyJWTToken);

// Route to get all tires
router.get("/all", getAllTiresHandler);

// Route to create a new tire
router.post("/create", createTireHandler);

// Route to get a tire by ID
router.get("/:id", getTireByIdHandler);

// Route to update a tire by ID
router.put("/:id", updateTireHandler);

// Route to delete a tire by ID
router.delete("/:id", deleteTireHandler);

router.post("/integreate-exel", upload.single("file"), integreateExelHandler);

export default router;
