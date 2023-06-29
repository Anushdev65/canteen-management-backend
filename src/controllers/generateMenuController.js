import { HttpStatus } from "../constant/constant.js";
import successResponseData from "../helper/successResponseData.js";
import tryCatchWrapper from "../middleware/tryCatchWrapper.js";
import { generateMenuServices } from "../services/index.js";

export let createGenerateMenu = tryCatchWrapper(async (req, res) => {
    let body = { ...req.body };

    let data = await generateMenuServices.createGenerateMenuService({ body: body });

    successResponseData({
        res,
        message: "Menu Generated Sucessfully",
        statusCode: HttpStatus.CREATED,
        data,
    });
});
export let updateGenerateMenu = tryCatchWrapper(async (req, res) => {
    let body = { ...req.body };
    let id = req.params.id;

    let data = await generateMenuServices.updateSpecificGenerateMenuService({ id, body });

    successResponseData({
        res,
        message: "Menu updated successfully.",
        statusCode: HttpStatus.CREATED,
        data,
    });
});

export let readSpecificGenerateMenu = tryCatchWrapper(async (req, res) => {
    let id = req.params.id;

    let data = await generateMenuServices.readSpecificGenerateMenuService({ id });

    successResponseData({
        res,
        message: "Read Menu successfully.",
        statusCode: HttpStatus.OK,
        data,
    });
});

export let readAllGenerateMenu = tryCatchWrapper(async (req, res, next) => {
    let find = {};
    req.find = find;
    req.service = generateMenuServices.readAllGenerateMenuService;

    next();
});

export let deleteSpecificGenerateMenu = tryCatchWrapper(async (req, res) => {
    let id = req.params.id;
    let data = await generateMenuServices.deleteSpecificGenerateMenuService({ id });

    successResponseData({
        res,
        message: "Menu deleted successfully.",
        statusCode: HttpStatus.OK,
        data,
    });
});

