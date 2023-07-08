import { Router } from "express";

import { sortFilterPagination } from "../middleware/sortSelectPage.js";
import { orderFoodController } from "../controllers/index.js";
import orderFoodSchema from "../validation/orderFoodValidation.js";
import validation from "../middleware/validation.js";
import { isValidToken } from "../middleware/isValidToken.js";
import { isAuthorized } from "../middleware/isAuthorized.js";
import { roleEnum } from "../constant/constant.js";

export const orderFoodRouter = Router();

orderFoodRouter
  .route("/")
  .post(
    isValidToken,
    isAuthorized([roleEnum.STAFF]),
    orderFoodController.createOrderFood
  )
  .get(
    isValidToken,
    isAuthorized([roleEnum.STAFF]),
    orderFoodController.readAllOrderFood,
    sortFilterPagination
  )

  .patch(
    isValidToken,
    isAuthorized([roleEnum.STAFF]),
    orderFoodController.updateOrderFood
  );
orderFoodRouter
  .route("/:id")

  .patch(orderFoodController.updateOrderFood)
  .get(orderFoodController.readSpecificOrderFood)
  .delete(
    isValidToken,
    isAuthorized([roleEnum.STAFF]),
    orderFoodController.deleteSpecificOrderFood
  );

export default orderFoodRouter;
