import { HttpStatus, statusEnum } from "../constant/constant.js";
import successResponseData from "../helper/successResponseData.js";
import tryCatchWrapper from "../middleware/tryCatchWrapper.js";
import { UserOrder } from "../schemasModle/model.js";
import { orderFoodServices } from "../services/index.js";
import { throwError } from "../utils/throwError.js";

export const createOrderFood = tryCatchWrapper(async (req, res) => {
  let body = { ...req.body };
  let user = req.info.userId;
  body.user = user;
  let data = await orderFoodServices.createOrderFoodService({ body: body });

  successResponseData({
    res,
    message: "Your order has been placed",
    statusCode: HttpStatus.CREATED,
    data,
  });
});

export const updateOrderFood = tryCatchWrapper(async (req, res) => {
  let body = { ...req.body };
  let id = req.params.id;

  let data = await orderFoodServices.updateSpecificOrderFoodService({
    id,
    body,
  });

  successResponseData({
    res,
    message: "order updated successfully.",
    statusCode: HttpStatus.CREATED,
    data,
  });
});

export const readSpecificOrderFood = tryCatchWrapper(async (req, res) => {
  let id = req.params.id;

  let data = await orderFoodServices.readSpecificOrderFoodService({ id });

  successResponseData({
    res,
    message: "Read order successfully.",
    statusCode: HttpStatus.OK,
    data,
  });
});

export const readAllOrderFood = tryCatchWrapper(async (req, res, next) => {
  let find = {};
  req.find = find;
  req.service = orderFoodServices.readAllOrderFoodService;

  next();
});

export const deleteSpecificOrderFood = tryCatchWrapper(async (req, res) => {
  let id = req.params.id;
  let data = await orderFoodServices.deleteSpecificOrderFoodService({ id });

  successResponseData({
    res,
    message: "Your order has been canceled",
    statusCode: HttpStatus.OK,
    data,
  });
});

export const serveOrder = tryCatchWrapper(async (req, res) => {
  //find those order whose user isto userID
  const userId = req.params.id;

  let orders = await UserOrder.updateMany(
    { user: userId },
    { orderStatus: statusEnum.SERVE }
  );

  if (!orders) {
    throwError(HttpStatus.NOT_FOUND, "Orders not found");
  } else {
    successResponseData({
      res,
      message: "Order confirmed successfully",
      statusCode: HttpStatus.OK,
      data: orders,
    });
  }

  // // Logic to update the order status to "serve"
  // const updatedOrder = await orderFoodServices.findByIdAndUpdate(
  //   order,
  //   { orderStatus: statusEnum.SERVE, userId },
  //   { new: true }
  // );

  // if (!updatedOrder) {
  //   throwError(HttpStatus.NOT_FOUND, "Order not found");
  // }
});

export const getServedOrderByUser = tryCatchWrapper(async (req, res) => {
  // Find orders of the user with the specified status
  const userId = req.info.userId;

  const orders = await UserOrder.find({
    userId,
    orderStatus: statusEnum.SERVE,
  });

  if (!orders) {
    throwError(HttpStatus.NOT_FOUND, "Orders Not Found");
  }

  successResponseData({
    res,
    message: "Orders retrieved successfully",
    statusCode: HttpStatus.OK,
    data: orders,
  });
});

export const makeOrderDelivered = tryCatchWrapper(async (req, res) => {
  //find those order whose user isto userID
  const userId = req.params.id;

  let orders = await UserOrder.updateMany(
    { user: userId, orderStatus: statusEnum.SERVE },
    { orderStatus: statusEnum.DELIVER }
  );

  if (!orders) {
    throwError(HttpStatus.NOT_FOUND, "Orders not found");
  } else {
    successResponseData({
      res,
      message: "Order delivered successfully",
      statusCode: HttpStatus.OK,
    });
  }
});

export const cancelOrder = tryCatchWrapper(async (req, res) => {
  const id = req.params.orderId;
  let order = await orderFoodServices.readSpecificOrderFoodService({ id });

  // Check if the order status is 'in process'
  if (order.orderStatus === statusEnum.ONPROCESS) {
    let data = await orderFoodServices.updateSpecificOrderFoodService({
      id,
      body: { orderStatus: statusEnum.CANCEL },
    });

    successResponseData({
      res,
      message: "Order has been canceled",
      statusCode: HttpStatus.OK,
      data,
    });
  } else {
    // If the order status is not 'in process', return an error message
    errorResponseData({
      res,
      message: "Cannot cancel order as it is not in process",
      statusCode: HttpStatus.BAD_REQUEST,
    });
  }
});

// export const cancelOrder = tryCatchWrapper(async (req, res) => {
//   const id = req.params.orderId;
//   let user = await orderFoodServices.readSpecificOrderFoodService({ id });
//   let data = await orderFoodServices.updateSpecificOrderFoodService({
//     id,
//     body: { orderStatus: statusEnum.CANCEl },
//   });

//   successResponseData({
//     res,
//     message: "Order has been canceled",
//     statusCode: HttpStatus.OK,
//     data,
//   });
// });

export const readMyOrder = tryCatchWrapper(async (req, res, next) => {
  let find = { user: req.info.userId };

  console.log("*******", find);
  req.find = find;
  console.log("*******", req.find);
  req.service = orderFoodServices.readAllOrderFoodService;

  next();
});
