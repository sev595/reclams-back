import express from "express";
import {
  createRimHandler,
  deleteRimHandler,
  getAllRimsHandler,
  getRimByIdHandler,
  integreateExelHandler,
  updateRimHandler,
} from "../../controllers/admin/rims/adminRims.controller";
import { upload } from "../../controllers/admin/excel/storage";
import { VerifyJWTToken } from "../../services/jwt/verifyJWTToken";

const router = express.Router();
router.use(VerifyJWTToken);

// Route to get all rims
router.get("/all", getAllRimsHandler);

// Route to get a rim by ID
router.get("/:id", getRimByIdHandler);

// Route to update a rim by ID
router.put("/:id", updateRimHandler);

// Route to delete a rim by ID
router.delete("/:id", deleteRimHandler);

// Route to create a new rim
router.post("/create", createRimHandler);

// Route to create a new rim
// router.post("/integreate-exel", upload.single("file"), integreateExelHandler);
router.post("/integreate-exel", upload.single("file"), integreateExelHandler);

export default router;
