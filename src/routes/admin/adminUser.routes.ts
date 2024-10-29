import express from "express";
import { getUserOrdersListHandler } from "../../controllers/admin/orders/adminOrders.controller";
import {
  createUserHandler,
  deleteUserHandler,
  getAllUsersHandler,
  getUserByIdHandler,
  updateUserHandler,
} from "../../controllers/admin/users/adminUsers.controller";
import { VerifyJWTToken } from "../../services/jwt/verifyJWTToken";

const router = express.Router();

router.use(VerifyJWTToken);
// Route to create a new order
router.post("/create", createUserHandler);

// Route to get user's orders list
router.get("/user/:id", getUserOrdersListHandler);

// Route to get all orders
router.get("/all", getAllUsersHandler);

// Route to get an order by ID
router.get("/:id", getUserByIdHandler);

// Route to update an order by ID
router.put("/:id", updateUserHandler);

// Route to delete an order by ID
router.delete("/:id", deleteUserHandler);

export default router;
