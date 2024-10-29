import { PrismaClient } from "@prisma/client";
import { OrderType } from "../../controllers/orders.controller";
import { log } from "console";
const prisma = new PrismaClient();

export const CanUserBuy = async (orderData: any[]) => {
  let canBuy = true;

  for (const order of orderData) {
    let itemToUpdate;

    if (order.type === "RIM") {
      itemToUpdate = await prisma.rims.findUnique({
        where: { id: order.id },
      });
    } else {
      itemToUpdate = await prisma.tire.findUnique({
        where: { id: order.id },
      });
    }

    if (
      !itemToUpdate ||
      (order.stock && itemToUpdate.stock - order.stock < 0)
    ) {
      // If item doesn't exist or item count will be less than 0 after decrementing
      // Set deleteOrders flag to false and break the loop
      canBuy = false;
      break;
    }
  }
  return canBuy;
};
