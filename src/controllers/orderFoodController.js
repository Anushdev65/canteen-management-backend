import { HttpStatus, roleEnum, statusEnum } from "../constant/constant.js";
import successResponseData from "../helper/successResponseData.js";
import tryCatchWrapper from "../middleware/tryCatchWrapper.js";
import { UserOrder, Food } from "../schemasModle/model.js";
import {
  orderFoodServices,
  authService,
  foodServices,
} from "../services/index.js";
import { currentDayEndOf, currentDayStartOf } from "../utils/datemethod.js";
import { throwError } from "../utils/throwError.js";

export const createOrderFood = tryCatchWrapper(async (req, res) => {
  let body = [...req.body];
  let user = req.info.userId;
  let userData = await authService.readSpecificAuthUserService({
    id: user,
  });

  let totalFoodBalanceArr = await Promise.all(
    body.map(async (item, i) => {
      let foodDetails = await foodServices.readSpecificFoodService({
        id: item.food,
      });

      let totalFoodPrice = foodDetails.rate * item.quantity;

      return totalFoodPrice;
    })
  );
  // Calculate the total food balance for all items
  let totalFoodBalance = totalFoodBalanceArr.reduce((pre, cur) => {
    return pre + cur;
  }, 0);

  // Check if the user has sufficient balance
  if (totalFoodBalance > userData.totalBalance) {
    throwError({
      message: "Insufficient Balance",
      statusCode: HttpStatus.BAD_REQUEST,
    });
  }
  // Update the user's total balance based on the total food balance
  let updateTotalBalance = {
    totalBalance: userData.totalBalance - totalFoodBalance,
  };
  await authService.updateSpecificAuthUserService({
    id: user,
    body: updateTotalBalance,
  });

  // Update the available quantity of each food item and create order food records
  await Promise.all(
    body.map(async (item, i) => {
      item.user = user;
      let foodDetails = await foodServices.readSpecificFoodService({
        id: item.food,
      });

      // console.log("foodetails", foodDetails);

      // console.log("item.quantity", item.quantity);
      // console.log(
      //   "foodDetails.availableQuantity",
      //   foodDetails.availableQuantity
      // );

      // console.log("item.quantity", item.quantity);
      // console.log(
      //   "foodDetails.availableQuantity",
      //   foodDetails.availableQuantity
      // );

      if (item.quantity > foodDetails.availableQuantity) {
        throwError({
          message: "Oder quantity is not available",
          statusCode: HttpStatus.NOT_FOUND,
        });
      } else {
        // let totalFoodPrice = foodDetails.rate * item.quantity
        if (foodDetails.availableQuantity) {
          // Update the availableQuantity of the food item
          await foodServices.updateSpecificFoodService({
            id: item.food,
            body: {
              availableQuantity: foodDetails.availableQuantity - item.quantity,
            },
          });
          // let updateTotalBalance = {
          //   totalBalance: userData.totalBalance - totalFoodPrice,
          // };
          // await authService.updateSpecificAuthUserService({
          //   id: user,
          //   body: updateTotalBalance,
          // });

          // await foodServices.updateSpecificFoodService({
          //   id: item.food,
          //   body: {
          //     availableQuantity: foodDetails.availableQuantity - item.quantity,
          //   },
          // });
        } else {
          throwError({
            statusCode: HttpStatus.NOT_FOUND,
            message: "Order not found",
          });
        }
      }
    })
  );

  let data = await orderFoodServices.createManyFoodService({ body: body });

  successResponseData({
    res,
    message: "Your order has been placed",
    statusCode: HttpStatus.CREATED,
    data,
  });

  //   // Check if the availableQuantity of the food item is 0
  //   // const foodItem = await Food.findByIdAndUpdate(food);
  //   // if (foodItem && foodItem.availableQuantity <= 0) {
  //   //   foodItem.isInMenu = false;
  //   //   await foodItem.save();
  //   // }
  //   // const foodItem = await Food.findByIdAndUpdate(food);
  //   // if (foodItem) {
  //   //   foodItem.availableQuantity -= quantity;
  //   //   await foodItem.save();
  //   // }
  // } else {
  //   throwError(HttpStatus.NOT_FOUND, "Order not found");
  // }
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

  if (req.query.today === "true") {
    find.createdAt = {
      $gte: currentDayStartOf(),
      $lte: currentDayEndOf(),
    };
  }
  if (req.query.user) {
    find.user = req.query.user;
  }
  if (req.query.orderStatus) {
    find.orderStatus = req.query.orderStatus;
  }
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
    throwError({
      statusCode: HttpStatus.NOT_FOUND,
      message: "Order not found",
    });
  }

  // Cannot serve if the order has been canceled
  if (order.orderStatus === statusEnum.CANCEl) {
    throwError({
      statusCode: HttpStatus.BAD_REQUEST,
      message: "Cannot serve canceled order",
    });
  }

  const updatedOrders = await UserOrder.updateOne(
    { orderStatus: statusEnum.ONPROCESS, _id: orderId },
    { orderStatus: statusEnum.SERVE }
  );

  if (!updatedOrders) {
    throwError({
      statusCode: HttpStatus.NOT_FOUND,
      message: "Order not found",
    });
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
    throwError({
      statusCode: HttpStatus.NOT_FOUND,
      message: "Order not found",
    });
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
      throwError({
        statusCode: HttpStatus.BAD_REQUEST,
        message: "Unauthoried access",
      });
    }
  } else {
    throwError({
      statusCode: HttpStatus.BAD_REQUEST,
      message: "Order cannot be delivered",
    });
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
  const id = req.params.orderId; //order id
  const roles = req.info.roles; //login roles

  const order = await orderFoodServices.readSpecificOrderFoodService({ id }); //order details

  let userData = await authService.readSpecificAuthUserService({
    id: order.user,
  }); //ordered userid

  // user

  if (roles.includes(roleEnum.CANTEEN)) {
    console.log("**************", order);

    // Check if the current status is "SERVE"
    if (
      order.orderStatus !== statusEnum.DELIVER ||
      order.orderStatus !== statusEnum.EXPIRE
    ) {
      // Update the order status to "CANCEL"

      await orderFoodServices.updateSpecificOrderFoodService({
        id,
        body: {
          orderStatus: statusEnum.CANCEl,
        },
      });

      let updateTotalBalance = {
        totalBalance: userData.totalBalance + order.quantity * order.food.rate,
      };
      await authService.updateSpecificAuthUserService({
        id: order.user,
        body: updateTotalBalance,
      });

      await foodServices.updateSpecificFoodService({
        id: order.food._id,
        body: {
          availableQuantity: order.quantity + order.food.availableQuantity,
        },
      });
    } else {
      throwError({
        statusCode: HttpStatus.BAD_REQUEST,
        message: "Order cannot be canceled",
      });
    }
  } else if (
    roles.includes(roleEnum.STAFF) ||
    roles.includes(roleEnum.STUDENT)
  ) {
    // Check if the current status is "ONPROCESS"
    if (order.orderStatus === statusEnum.ONPROCESS) {
      // Update the order status to "CANCEL"
      await orderFoodServices.updateSpecificOrderFoodService({
        id,
        body: { orderStatus: statusEnum.CANCEl },
      });

      let restoredAmount = order.quantity * order.food.rate;

      // Update the user's total balance by adding the restored amount
      let updateTotalBalance = {
        totalBalance: userData.totalBalance + restoredAmount,
      };
      await authService.updateSpecificAuthUserService({
        id: order.user,
        body: updateTotalBalance,
      });

      // Update the availableQuantity of the food item by adding the order quantity
      await foodServices.updateSpecificFoodService({
        id: order.food._id,
        body: {
          availableQuantity: order.food.availableQuantity + order.quantity,
        },
      });
    } else {
      throwError({
        statusCode: HttpStatus.BAD_REQUEST,
        message: "Order cannot be canceled",
      });
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
//   const roles = req.info.roles;

//   let userData = await authService.readSpecificAuthUserService({
//     id: req.info.userId,
//   });

//   if (roles.includes(roleEnum.CANTEEN)) {
//     const order = await orderFoodServices.readSpecificOrderFoodService({ id });
//     console.log(order);

//     // Check if the current status is "SERVE"
//     if (order.orderStatus === statusEnum.SERVE) {
//       // Update the order status to "CANCEL"

//       await orderFoodServices.updateSpecificOrderFoodService({
//         id,
//         body: {
//           orderStatus: statusEnum.CANCEl,
//         },
//       });

//       let updateTotalBalance = {
//         totalBalance: userData.totalBalance + order.quantity * order.food.rate,
//       };
//       await authService.updateSpecificAuthUserService({
//         id: user,
//         body: updateTotalBalance,
//       });

//       await foodServices.updateSpecificFoodService({
//         id: item.food,
//         body: {
//           availableQuantity: order.quantity + order.food.availableQuantity,
//         },
//       });
//     } else {
//       throwError({
//         statusCode: HttpStatus.BAD_REQUEST,
//         message: "Order cannot be canceled",
//       });
//     }
//   } else if (
//     roles.includes(roleEnum.STAFF) ||
//     roles.includes(roleEnum.STUDENT)
//   ) {
//     const order = await orderFoodServices.readSpecificOrderFoodService({ id });

//     // Check if the current status is "ONPROCESS"
//     if (order.orderStatus === statusEnum.ONPROCESS) {
//       // Update the order status to "CANCEL"
//       await orderFoodServices.updateSpecificOrderFoodService({
//         id,
//         body: { orderStatus: statusEnum.CANCEl },
//       });
//       let restoredAmount = order.quantity * order.food.rate;

//       // Update the user's total balance by adding the restored amount
//       let updateTotalBalance = {
//         totalBalance: userData.totalBalance + restoredAmount,
//       };
//       await authService.updateSpecificAuthUserService({
//         id: req.info.userId,
//         body: updateTotalBalance,
//       });

//       // Update the availableQuantity of the food item by adding the order quantity
//       await foodServices.updateSpecificFoodService({
//         id: order.food._id,
//         body: {
//           availableQuantity: order.food.availableQuantity + order.quantity,
//         },
//       });
//     } else {
//       throwError({
//         statusCode: HttpStatus.BAD_REQUEST,
//         message: "Order cannot be canceled",
//       });
//     }
//   }
//   successResponseData({
//     res,
//     message: "Order has been canceled",
//     statusCode: HttpStatus.OK,
//   });
// });

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

  req.find = find;
  req.service = orderFoodServices.readAllOrderFoodService;

  next();
});
