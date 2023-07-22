import { Router } from "express";
import { roleEnum } from "../constant/constant.js";
import { foodController } from "../controllers/index.js";
import { isAuthorized } from "../middleware/isAuthorized.js";
import { isValidToken } from "../middleware/isValidToken.js";
import { sortFilterPagination } from "../middleware/sortSelectPage.js";
import validation from "../middleware/validation.js";
import foodSchema from "../validation/foodValidation.js";
import updateFoodSchema from "../validation/foodUpdateValidation.js";
import foodUpdate from "../validation/updateFoodValidation.js";

const foodRouter = Router();

// AddQuantity

foodRouter
  .route("/")
  .post(
    isValidToken,
    isAuthorized([roleEnum.CANTEEN]),
    validation(foodSchema),
    foodController.createFood
  )
  .get(
    isValidToken,
    isAuthorized([roleEnum.CANTEEN]),
    foodController.readAllFood,
    sortFilterPagination
  )
  .patch(
    isValidToken,
    isAuthorized([roleEnum.CANTEEN]),
    validation(updateFoodSchema),
    foodController.updateFoodMenu
  );

foodRouter
  .route("/add-quantity/:id")
  .patch(
    isValidToken,
    isAuthorized([roleEnum.CANTEEN]),
    foodController.addQuantity
  );

foodRouter
  .route("/:id")
  .patch(
    isValidToken,
    isAuthorized([roleEnum.CANTEEN]),
    validation(foodUpdate),
    foodController.updateFood
  )
  .get(
    isValidToken,
    isAuthorized([roleEnum.CANTEEN]),
    foodController.readSpecificFood
  )
  .delete(
    isValidToken,
    isAuthorized([roleEnum.CANTEEN]),
    foodController.deleteSpecificFood
  );

export default foodRouter;
