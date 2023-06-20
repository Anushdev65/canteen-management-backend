import { HttpStatus } from "../constant/constant.js";
import successResponseData from "../helper/successResponseData.js";
import tryCatchWrapper from "../middleware/tryCatchWrapper.js";
import { roleServices } from "../services/index.js";

export let createRole = tryCatchWrapper(async (req, res) => {
  let body = { ...req.body };

  let data = await roleServices.createRoleService({ body: body });

  successResponseData({
    res,
    message: "Role created successfully.",
    statusCode: HttpStatus.CREATED,
    data,
  });
});
export let updateRole = tryCatchWrapper(async (req, res) => {
  let body = { ...req.body };
  let id = req.params.id;

  let data = await roleServices.updateSpecificRoleService({ id, body });

  successResponseData({
    res,
    message: "Role updated successfully.",
    statusCode: HttpStatus.CREATED,
    data,
  });
});

export let readSpecificRole = tryCatchWrapper(async (req, res) => {
  let id = req.params.id;

  let data = await roleServices.readSpecificRoleService({ id });

  successResponseData({
    res,
    message: "Read  role successfully.",
    statusCode: HttpStatus.OK,
    data,
  });
});

export let readAllRole = tryCatchWrapper(async (req, res, next) => {
  let find = {};
  req.find = find;
  req.service = roleServices.readAllRoleService;

  next();
});

export let deleteSpecificRole = tryCatchWrapper(async (req, res) => {
  let id = req.params.id;
  let data = await roleServices.deleteSpecificRoleService({ id });

  successResponseData({
    res,
    message: "Role delete successfully.",
    statusCode: HttpStatus.OK,
    data,
  });
});
