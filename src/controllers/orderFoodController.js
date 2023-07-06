import { HttpStatus } from "../constant/constant.js";
import successResponseData from "../helper/successResponseData.js";
import tryCatchWrapper from "../middleware/tryCatchWrapper.js";
import { orderFoodServices } from "../services/index.js";
import { throwError } from "../utils/throwError.js";


export let createOrderFood = tryCatchWrapper(async (req, res) => {
    let body = { ...req.body }; 


    let data = await orderFoodServices.createOrderFoodService({ body: body });

    successResponseData({
        res,
        message: "Your order has been placed",
        statusCode: HttpStatus.CREATED,
        data,
    });
});
export let updateOrderFood = tryCatchWrapper(async (req, res) => {
    let body = { ...req.body };
    let id = req.params.id;

    let data = await orderFoodServices.updateSpecificOrderFoodService({ id, body });

    successResponseData({
        res,
        message: "order updated successfully.",
        statusCode: HttpStatus.CREATED,
        data,
    });
});

export let readSpecificOrderFood = tryCatchWrapper(async (req, res) => {
    let id = req.params.id;

    let data = await orderFoodServices.readSpecificOrderFoodService({ id });

    successResponseData({
        res,
        message: "Read order successfully.",
        statusCode: HttpStatus.OK,
        data,
    });
});

export let readAllOrderFood = tryCatchWrapper(async (req, res, next) => {
    let find = {};
    req.find = find;
    req.service = orderFoodServices.readAllOrderFoodService;

    next();
});

export let deleteSpecificOrderFood = tryCatchWrapper(async (req, res) => {
    let id = req.params.id;
    let data = await orderFoodServices.deleteSpecificOrderFoodService({ id });

    successResponseData({
        res,
        message: "Your order has been canceled",
        statusCode: HttpStatus.OK,
        data,
    });
});
