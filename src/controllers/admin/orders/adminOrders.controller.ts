import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

// export const createOrderHandler = async (req: Request, res: Response) => {
//   try {
//     const { orderType, itemId, itemCount, price } = req.body;

//     const createdOrder = await prisma.order.create({
//       data: {
//         orderType,
//         rimId: 1,
//         itemCount,
//         price,
//       },
//     });

//     return res.status(201).json({
//       status: "success",
//       data: { order: createdOrder },
//     });
//   } catch (error) {
//     return res.status(500).json({
//       status: "error",
//       message: "Failed to create order",
//     });
//   }
// };

export const getUserOrdersListHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = parseInt(id, 10);

    const orderList = await prisma.order.findMany({
      where: {
        users: {
          some: {
            userId,
          },
        },
      },
      include: {
        tire: true,
        rims: true,
      },
    });

    return res.status(200).json({
      status: "success",
      data: { orderList },
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Failed to fetch user orders",
    });
  }
};

export const getAllOrdersHandler = async (req: Request, res: Response) => {
  try {
    const allOrdersWithUserIds = await prisma.order.findMany({
      include: {
        users: {
          select: {
            userId: true,
            user: true,
          },
        },
        tire: {
          select: {
            id: true,
            marka: true,
          },
        },
        rims: {
          select: {
            id: true,
            rimModel: true,
          },
        },
      },
    });

    const orderList = allOrdersWithUserIds.map((order) => {
      return {
        id: order.id,
        orderType: order.orderType,
        status: order.status,
        price: order.price,
        name:
          order?.orderType === "TIRE"
            ? order?.tire?.marka
            : order?.rims?.rimModel,
        itemId: order?.orderType === "TIRE" ? order?.tire?.id : order?.rims?.id,
        itemCount: order?.itemCount,
        userId: order?.users[0]?.userId,
        userName: order?.users[0]?.user?.firstName,
        sessionId: order?.sessionId,
        createdDate: order?.createdDate,
      };
    });

    return res.status(200).json({
      status: "success",
      data: { orders: orderList },
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Failed to fetch orders",
    });
  }
};

export const getOrderByIdHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const orderId = parseInt(id, 10);

    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
    });

    if (!order) {
      return res.status(404).json({
        status: "error",
        message: "Order not found",
      });
    }

    return res.status(200).json({
      status: "success",
      data: { order },
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Failed to fetch order",
    });
  }
};

export const updateOrderHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const orderId = parseInt(id, 10);
    const { orderType, rimId, tireId, itemCount, status } = req.body;

    const updatedOrder = await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        orderType,
        rimId: rimId,
        tireId: tireId,
        itemCount,
        status,
      },
    });

    return res.status(200).json({
      status: "success",
      data: { order: updatedOrder },
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Failed to update order",
    });
  }
};

export const deleteOrderHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const orderId = parseInt(id, 10);

    await prisma.orderUser.delete({
      where: {
        id: orderId,
        userId,
      },
    });

    await prisma.order.delete({
      where: {
        id: orderId,
      },
    });

    return res.status(204).end();
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Failed to delete order",
    });
  }
};
