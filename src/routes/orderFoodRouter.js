import { Router } from "express";

import { sortFilterPagination } from "../middleware/sortSelectPage.js";
import { orderFoodController } from "../controllers/index.js";
import orderFoodSchema from "../validation/orderFoodValidation.js";
import validation from "../middleware/validation.js";
export const orderFoodRouter = Router();

orderFoodRouter
  .route("/")
  .post( orderFoodController.createOrderFood)
  .get(orderFoodController.readAllOrderFood, sortFilterPagination);
orderFoodRouter
  .route("/:id")
  .patch(orderFoodController.updateOrderFood)
  .get(orderFoodController.readSpecificOrderFood)
  .delete(orderFoodController.deleteSpecificOrderFood);

export default orderFoodRouter;
