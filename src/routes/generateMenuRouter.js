import { Router } from "express";

import { sortFilterPagination } from "../middleware/sortSelectPage.js";
import { isValidToken } from "../middleware/isValidToken.js";
import { isAuthorized } from "../middleware/isAuthorized.js";
import { roleEnum } from "../constant/constant.js"
import { generateMenuController } from "../controllers/index.js";
import validation from "../middleware/validation.js";
import generateMenuSchema from "../validation/generateMenuValidation.js";

export const generateMenuRouter = Router();
//checkif the token is valid, check if the user is authorized, ([enum])
generateMenuRouter
    .route("/")
    .post(validation(generateMenuSchema), isValidToken, isAuthorized([roleEnum.CANTEEN]), generateMenuController.createGenerateMenu)
    .get(isValidToken, isAuthorized([roleEnum.CANTEEN]), generateMenuController.readAllGenerateMenu, sortFilterPagination);
generateMenuRouter
    .route("/:id")
    .patch(validation(generateMenuSchema), isValidToken, isAuthorized([roleEnum.CANTEEN]), generateMenuController.updateGenerateMenu)
    .get(isValidToken, isAuthorized([roleEnum.CANTEEN]), generateMenuController.readSpecificGenerateMenu)
    .delete(isValidToken, isAuthorized([roleEnum.CANTEEN]), generateMenuController.deleteSpecificGenerateMenu);
// generateMenuRouter
//     .route("/food-items")
//     .get(generateMenuController.fetchFoodItems);

export default generateMenuRouter;
