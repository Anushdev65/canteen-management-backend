import { HttpStatus } from "../constant/constant.js";
import successResponseData from "../helper/successResponseData.js";
import tryCatchWrapper from "../middleware/tryCatchWrapper.js";
import { Food, Category } from "../schemasModle/model.js";
import { foodServices } from "../services/index.js";
import { throwError } from "../utils/throwError.js";

export let createFood = tryCatchWrapper(async (req, res) => {
  let body = { ...req.body };

  const isValidCategory = await Category.findById(body.category);
  if (!isValidCategory) {
    throwError({
      statusCode: HttpStatus.BAD_REQUEST,
      message: "Category Id not found",
    });
  }

  if (body.discountedRate === null || body.discountedRate === undefined) {
    body.discountedRate = body.rate;
  }

  let data = await foodServices.createFoodService({ body: body });

  successResponseData({
    res,
    message: "Food created successfully.",
    statusCode: HttpStatus.CREATED,
    data,
  });
});
export let updateFood = tryCatchWrapper(async (req, res) => {
  let body = { ...req.body };
  let id = req.params.id;
  console.log(body);
  let data = await foodServices.updateSpecificFoodService({ id, body });

  successResponseData({
    res,
    message: "Food updated successfully.",
    statusCode: HttpStatus.CREATED,
    data,
  });
});

export let updateFoodMenu = tryCatchWrapper(async (req, res) => {
  let ids = req.body.map((value, i) => {
    return value.id;
  });

  await Food.updateMany({ _id: { $nin: ids } }, { isInMenu: false });
  let _data = await Promise.all(
    req.body.map(async (value, i) => {
      let id = value.id;
      let body = {
        availableTime: value.availableTime,
        initialQuantity: value.initialQuantity,
        availableQuantity: value.initialQuantity,
        isInMenu: true,
      };

      return await foodServices.updateSpecificFoodService({ id, body });
    })
  );

  successResponseData({
    res,
    message: "Menu updated successfully",
    statusCode: HttpStatus.OK,
    data: _data,
  });
});

export let readSpecificFood = tryCatchWrapper(async (req, res) => {
  let id = req.params.id;

  let data = await foodServices.readSpecificFoodService({ id });

  successResponseData({
    res,
    message: "Read  food successfully.",
    statusCode: HttpStatus.OK,
    data,
  });
});

export let readAllFood = tryCatchWrapper(async (req, res, next) => {
  let find = {};
  req.find = find;
  req.service = foodServices.readAllFoodService;

  next();
});

export let deleteSpecificFood = tryCatchWrapper(async (req, res) => {
  let id = req.params.id;
  let data = await foodServices.deleteSpecificFoodService({ id });

  successResponseData({
    res,
    message: "Food delete successfully.",
    statusCode: HttpStatus.OK,
    data,
  });
});

export let addQuantity = tryCatchWrapper(async (req, res) => {
  const foodId = req.params.id;
  const { quantity } = req.body;

  const foodItem = await foodServices.readSpecificFoodService({ id: foodId });

  if (foodItem.initialQuantity === 0 && quantity < 0) {
    // throwError(HttpStatus.NOT_FOUND, "food quantity can not be negative");
    throwError({
      message: "food quantity can not be negative",
      statusCode: HttpStatus.NOT_FOUND,
    });
  }

  if (!foodItem) {
    throwError({
      statusCode: HttpStatus.NOT_FOUND,
      message: "Food item not found",
    });
  }
  let updateData = {
    initialQuantity: foodItem.initialQuantity + quantity,
    availableQuantity: foodItem.availableQuantity + quantity,
  };

  let data = await foodServices.updateSpecificFoodService({
    id: foodId,
    body: updateData,
  });

  successResponseData({
    res,
    message: "Quantity updated sucessfully",
    statusCode: HttpStatus.CREATED,
    data,
  });
});
