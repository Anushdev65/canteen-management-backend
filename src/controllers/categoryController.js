
import { HttpStatus } from "../constant/constant.js";
import successResponseData from "../helper/successResponseData.js";
import tryCatchWrapper from "../middleware/tryCatchWrapper.js";
import { categoryServices } from "../services/index.js";
import categorySchema from "../validation/categoryValidation.js";


export let createCategory = tryCatchWrapper(async (req, res) => {
  let body = { ...req.body };

  let data = await categoryServices.createCategoryService({ body: body });
 


  successResponseData({
    res,
    message: "Category created successfully.",
    statusCode: HttpStatus.CREATED,
    data,
  });
});
export let updateCategory = tryCatchWrapper(async (req, res) => {
  let body = { ...req.body };
  let id = req.params.id;

  let data = await categoryServices.updateSpecificCategoryService({ id, body });

  successResponseData({
    res,
    message: "Category updated successfully.",
    statusCode: HttpStatus.CREATED,
    data,
  });
});

export let readSpecificCategory = tryCatchWrapper(async (req, res) => {
  let id = req.params.id;

  let data = await categoryServices.readSpecificCategoryService({ id });

  successResponseData({
    res,
    message: "Read  category successfully.",
    statusCode: HttpStatus.OK,
    data,
  });
});

export let readAllCategory = tryCatchWrapper(async (req, res, next) => {
  let find = {};
  req.find = find;
  req.service = categoryServices.readAllCategoryService;

  next();
});

export let deleteSpecificCategory = tryCatchWrapper(async (req, res) => {
  let id = req.params.id;
  let data = await categoryServices.deleteSpecificCategoryService({ id });

  successResponseData({
    res,
    message: "Category delete successfully.",
    statusCode: HttpStatus.OK,
    data,
  });
});
