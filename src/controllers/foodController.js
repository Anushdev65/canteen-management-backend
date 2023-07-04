

import { HttpStatus } from "../constant/constant.js";
import successResponseData from "../helper/successResponseData.js";
import tryCatchWrapper from "../middleware/tryCatchWrapper.js";
import { foodServices } from "../services/index.js";


export let createFood = tryCatchWrapper(async (req, res) => {
  let body = { ...req.body };

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
console.log(body)
  let data = await foodServices.updateSpecificFoodService({ id, body });

  successResponseData({
    res,
    message: "Food updated successfully.",
    statusCode: HttpStatus.CREATED,
    data,
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

