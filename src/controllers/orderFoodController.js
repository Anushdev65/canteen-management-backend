import { HttpStatus, roleEnum, statusEnum } from "../constant/constant.js";
import successResponseData from "../helper/successResponseData.js";
import tryCatchWrapper from "../middleware/tryCatchWrapper.js";
import { Food, UserOrder } from "../schemasModle/model.js";
import { orderFoodServices } from "../services/index.js";
import { throwError } from "../utils/throwError.js";

export const createOrderFood = tryCatchWrapper(async (req, res) => {
  let body = { ...req.body };
  let user = req.info.userId;
  body.user = user;
  let foodId = req.body.food
  let food = await Food.findById(foodId);
  const currentDate = new Date()
  if (currentDate >= food.availableTime.from && currentDate <= food.availableTime.to) {

    let data = await orderFoodServices.createOrderFoodService({ body: body });

    successResponseData({
      res,
      message: "Your order has been placed",
      statusCode: HttpStatus.CREATED,
      data,
    });
  }
  else {
    throwError({
      message: "Food is not available at the current time .",
      statusCode: HttpStatus.BAD_REQUEST,
    })
  }
  })


 


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
  const orderId = req.params.id;

  const order = await UserOrder.findById(orderId);

  if (!order) {
    throwError(HttpStatus.NOT_FOUND, "Order not found");
  }

  // Cannot serve if the order has been canceled
  if (order.orderStatus === statusEnum.CANCEl) {
    throwError(HttpStatus.BAD_REQUEST, "Cannot serve a canceled order");
  }

  const updatedOrders = await UserOrder.updateOne(
    { orderStatus: statusEnum.ONPROCESS, _id: orderId },
    { orderStatus: statusEnum.SERVE }
  );

  if (!updatedOrders) {
    throwError(HttpStatus.NOT_FOUND, "Orders not found");
  }

  successResponseData({
    res,
    message: "Order confirmed successfully",
    statusCode: HttpStatus.OK,
  });
});

// export const serveOrder = tryCatchWrapper(async (req, res) => {
//   //find those order whose user isto userID
//   const orderId = req.params.id;

//   let updatedOrders = await UserOrder.updateOne(
//     { orderStatus: statusEnum.ONPROCESS, _id: orderId },
//     { orderStatus: statusEnum.SERVE }
//   );

//   if (!updatedOrders) {
//     throwError(HttpStatus.NOT_FOUND, "Orders not found");
//   }

//   successResponseData({
//     res,
//     message: "Order confirmed successfully",
//     statusCode: HttpStatus.OK,
//   });

//   // // Logic to update the order status to "serve"
//   // const updatedOrder = await orderFoodServices.findByIdAndUpdate(
//   //   order,
//   //   { orderStatus: statusEnum.SERVE, userId },
//   //   { new: true }
//   // );

//   // if (!updatedOrder) {
//   //   throwError(HttpStatus.NOT_FOUND, "Order not found");
//   // }
// });

export const getServedOrderByUser = tryCatchWrapper(async (req, res) => {
  // Find orders of the user with the specified status
  const userId = req.params.userId;
  const orders = await UserOrder.find({
    user: userId,
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
  const orderId = req.params.id;
  const roles = req.info.roles;

  const order = await UserOrder.findById(orderId);

  // Check if the order status is "SERVE"
  if (order.orderStatus === statusEnum.SERVE) {
    // Check if the user has the "CANTEEN" role
    if (roles.includes(roleEnum.CANTEEN)) {
      // Update the order status to "DELIVER"
      order.orderStatus = statusEnum.DELIVER;
      await order.save();

      successResponseData({
        res,
        message: "Order delivered successfully",
        statusCode: HttpStatus.OK,
        data: order,
      });
    } else {
      throwError(HttpStatus.UNAUTHORIZED, "Unauthorized access");
    }
  } else {
    throwError(HttpStatus.BAD_REQUEST, "Order cannot be delivered");
  }
});

// export const makeOrderDelivered = tryCatchWrapper(async (req, res) => {
//   //find those order whose user isto userID
//   // const userId = req.params.id;

//   // let orders = await UserOrder.updateMany(
//   //   { user: userId, orderStatus: statusEnum.SERVE },
//   //   { orderStatus: statusEnum.DELIVER }
//   // );

//   const orderId = req.params.id;

//   const roles = req.info.roles;
//   if (roles.includes(roleEnum.CANTEEN)) {
//     const updatedOrder = await UserOrder.findByIdAndUpdate(
//       orderId,
//       { orderStatus: statusEnum.SERVE, _id: orderId },
//       { orderStatus: statusEnum.DELIVER }
//     );
//     successResponseData({
//       res,
//       message: "Order delivered successfully",
//       statusCode: HttpStatus.OK,
//       data: updatedOrder,
//     });
//   }

//   if (!updatedOrder) {
//     throwError(HttpStatus.NOT_FOUND, "Orders not found");
//   } else {
//   }
// });

export const cancelFoodOrder = tryCatchWrapper(async (req, res) => {
  const id = req.params.orderId;
  const roles = req.info.roles;

  if (roles.includes(roleEnum.CANTEEN)) {
    const order = await orderFoodServices.readSpecificOrderFoodService({ id });

    // Check if the current status is "SERVE"
    if (order.orderStatus === statusEnum.SERVE) {
      // Update the order status to "CANCEL"
      await orderFoodServices.updateSpecificOrderFoodService({
        id,
        body: { orderStatus: statusEnum.CANCEl },
      });
    } else {
      throwError(HttpStatus.BAD_REQUEST, "Order cannot be canceled");
    }
  } else if (
    roles.includes(roleEnum.STAFF) ||
    roles.includes(roleEnum.STUDENT)
  ) {
    const order = await orderFoodServices.readSpecificOrderFoodService({ id });

    // Check if the current status is "ONPROCESS"
    if (order.orderStatus === statusEnum.ONPROCESS) {
      // Update the order status to "CANCEL"
      await orderFoodServices.updateSpecificOrderFoodService({
        id,
        body: { orderStatus: statusEnum.CANCEl },
      });
    } else {
      throwError(HttpStatus.BAD_REQUEST, "Order cannot be canceled");
    }
  }
  successResponseData({
    res,
    message: "Order has been canceled",
    statusCode: HttpStatus.OK,
  });
});

// export const cancelFoodOrder = tryCatchWrapper(async (req, res) => {
//   const id = req.params.orderId;

//   // Retrieve the current order status
//   const roles = req.info.roles;

//   if (roles.includes(roleEnum.CANTEEN)) {
//     await orderFoodServices.updateSpecificOrderFoodService({
//       id,
//       body: { orderStatus: statusEnum.CANCEl },
//     });
//   } else if (
//     roles.includes(roleEnum.STAFF) ||
//     roles.includes(roleEnum.STUDENT)
//   ) {
//     const order = await orderFoodServices.readSpecificOrderFoodService({ id });

//     // Check if the current status is "in process"
//     if (order.orderStatus === statusEnum.ONPROCESS) {
//       // Update the order status to "cancel"
//       await orderFoodServices.updateSpecificOrderFoodService({
//         id,
//         body: { orderStatus: statusEnum.CANCEl },
//       });
//     } else {
//       throwError(HttpStatus.BAD_REQUEST, "Order cannot be canceled");
//     }
//   }
//   successResponseData({
//     res,
//     message: "Order has been canceled",
//     statusCode: HttpStatus.OK,
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
