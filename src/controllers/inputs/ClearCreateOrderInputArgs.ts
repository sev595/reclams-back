import { OrderType } from "../orders.controller";

export const ClearCreateOrderInputArgs = (
  data: OrderType,
  sessionId?: string
) => {
  let clearData: any = {
    orderType: data.type,
    status: data.status,
    itemCount: data.count,
    sessionId: sessionId ? sessionId : "",
    price: data.price,
  };
  if (data.type === "RIM") {
    clearData = {
      ...clearData,
      rimId: data.itemId,
    };

    return clearData;
  }
  clearData = {
    ...clearData,
    tireId: data.itemId,
  };
  return clearData;
};
