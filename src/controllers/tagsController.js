
// import tryCatchWrapper from "../middleware/tryCatchWrapper.js";
// import { tagsServices } from "../services/index.js";
// import successResponseData from "../helper/successResponseData.js";
// import { HttpStatus } from "../constant/constant.js";

// export let createTags = tryCatchWrapper(async (req, res) => {
//   let body = { ...req.body };
//   let data = await tagsServices.createTagsService({ body: body });

//   successResponseData({
//     res,
//     message: "Tags created successfully.",
//     statusCode: HttpStatus.CREATED,
//     data,
//   });
// });
// export let updateTags = tryCatchWrapper(async (req, res) => {
//   let body = { ...req.body };
//   let id = req.params.id;

//   let data = await tagsServices.updateSpecificTagsService({ id, body });

//   successResponseData({
//     res,
//     message: "Tags updated successfully.",
//     statusCode: HttpStatus.CREATED,
//     data,
//   });
// });

// export let readSpecificTags = tryCatchWrapper(async (req, res) => {
//   let id = req.params.id;

//   let data = await tagsServices.readSpecificTagsService({ id });

//   successResponseData({
//     res,
//     message: "Read  tags successfully.",
//     statusCode: HttpStatus.OK,
//     data,
//   });
// });

// export let readAllTags = tryCatchWrapper(async (req, res, next) => {
//   let find = {};
//   req.find = find;
//   req.service = tagsServices.readAllTagsService;

//   next();
// });

// export let deleteSpecificTags = tryCatchWrapper(async (req, res) => {
//   let id = req.params.id;
//   let data = await tagsServices.deleteSpecificTagsService({ id });

//   successResponseData({
//     res,
//     message: "Tags delete successfully.",
//     statusCode: HttpStatus.OK,
//     data,
//   });
// });
