import { HttpStatus } from "../constant/constant.js";
import successResponseData from "../helper/successResponseData.js";
import tryCatchWrapper from "../middleware/tryCatchWrapper.js";
import { GenerateMenu } from "../schemasModle/model.js";
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

// export let fetchFoodItems = tryCatchWrapper(async (req, res) => {
//     try {
//         const generateMenus = await generateMenuServices.readAllGenerateMenuService();
//         // Populate the foodItem field with name and rate
//         const populateMenus = await GenerateMenu.populate(generateMenus, { path: "foodItem", select: "name rate" });

//         successResponseData({
//             res,
//             message: "Food items fetched successfully.",
//             statusCode: HttpStatus.OK,
//             data: populateMenus,
//         });
//     } catch (error) {
//         console.log(error);
//         errorResponseData({
//             res,
//             message: "failed to fetch food items.",
//             statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
//             error: error.message,
//         });
//     }
// })