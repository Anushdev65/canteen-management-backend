import { Router } from "express";
import { sortFilterPagination } from "../middleware/sortSelectPage.js";
import { foodController } from "../controllers/index.js";
import { isValidToken } from "../middleware/isValidToken.js";
import { isAuthorized } from "../middleware/isAuthorized.js";
import { roleEnum } from "../constant/constant.js";
import foodSchema from "../validation/foodValidation.js";
import validation from "../middleware/validation.js";

 const foodRouter = Router();

foodRouter
  .route("/")
  .post(isValidToken,isAuthorized([roleEnum.CANTEEN]),validation(foodSchema),foodController.createFood)
  .get(isValidToken,isAuthorized([roleEnum.CANTEEN]),foodController.readAllFood, sortFilterPagination);
foodRouter
  .route("/:id")
  .patch(isValidToken,isAuthorized([roleEnum.CANTEEN]),foodController.updateFood)
  .get(isValidToken,isAuthorized([roleEnum.CANTEEN]),foodController.readSpecificFood)
  .delete(isValidToken,isAuthorized([roleEnum.CANTEEN]),foodController.deleteSpecificFood);

export default foodRouter;