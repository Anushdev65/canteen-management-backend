import { HttpStatus } from "../constant/constant.js";
import successResponseData from "../helper/successResponseData.js";
import tryCatchWrapper from "../middleware/tryCatchWrapper.js";
import { processOrdersServices } from "../services/index.js";
import { UserOrder } from "../schemasModle/model.js";

export let createProcessOrders = tryCatchWrapper(async (req, res) => {
  const { orderFoodId, status, orderedTime, maxServeTime } = req.body;

  const orderFood = await UserOrder.findById(orderFoodId).populate("foodName", [
    "foodName",
    "rate",
    "quantity",
    "price",
  ]);

  if (!orderFood) {
    throwError({
      message: "Order food not found",
      statusCode: HttpStatus.NOT_FOUND,
    });
  }

  const processOrder = await processOrdersServices.createProcessOrdersService({
    body: {
      item: orderFood.foodName.foodName,
      rate: orderFood.foodName.rate,
      quantity: orderFood.quantity,
      amount: orderFood.quantity * orderFood.price,
      status,
      orderedTime,
      maxServeTime,
    },
  });

  successResponseData({
    res,
    message: "ProcessOrders created successfully.",
    statusCode: HttpStatus.CREATED,
    data: processOrder,
  });
});
export let updateProcessOrders = tryCatchWrapper(async (req, res) => {
  let body = { ...req.body };
  let id = req.params.id;

  let data = await processOrdersServices.updateSpecificProcessOrdersService({
    id,
    body,
  });

  successResponseData({
    res,
    message: "ProcessOrders updated successfully.",
    statusCode: HttpStatus.CREATED,
    data,
  });
});

export let readSpecificProcessOrders = tryCatchWrapper(async (req, res) => {
  let id = req.params.id;

  let data = await processOrdersServices.readSpecificProcessOrdersService({
    id,
  });

  successResponseData({
    res,
    message: "Read  processOrders successfully.",
    statusCode: HttpStatus.OK,
    data,
  });
});

export let readAllProcessOrders = tryCatchWrapper(async (req, res, next) => {
  let find = {};
  req.find = find;
  req.service = processOrdersServices.readAllProcessOrdersService;

  next();
});

export let deleteSpecificProcessOrders = tryCatchWrapper(async (req, res) => {
  let id = req.params.id;
  let data = await processOrdersServices.deleteSpecificProcessOrdersService({
    id,
  });

  successResponseData({
    res,
    message: "ProcessOrders delete successfully.",
    statusCode: HttpStatus.OK,
    data,
  });
});
