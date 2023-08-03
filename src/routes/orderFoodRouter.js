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
    isAuthorized([roleEnum.STAFF, roleEnum.STUDENT]),
    // validation(orderFoodSchema),
    orderFoodController.createOrderFood
  )
  .get(
    isValidToken,
    isAuthorized([roleEnum.CANTEEN]),
    orderFoodController.readAllOrderFood,
    sortFilterPagination
  )
  .patch(
    isValidToken,
    isAuthorized([roleEnum.STAFF, roleEnum.STUDENT]),
    validation(orderFoodSchema),
    orderFoodController.updateOrderFood
  );

orderFoodRouter
  .route("/my-order")
  .get(
    isValidToken,
    isAuthorized([roleEnum.STAFF, roleEnum.STUDENT]),
    orderFoodController.readMyOrder,
    sortFilterPagination
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

orderFoodRouter
  .route("/serve/:userId")
  .get(
    isValidToken,
    isAuthorized([roleEnum.CANTEEN, roleEnum.STAFF, roleEnum.STUDENT]),
    orderFoodController.getServedOrderByUser,
    sortFilterPagination
  );

orderFoodRouter
  .route("/serve/:id")
  .patch(
    isValidToken,
    isAuthorized([roleEnum.STAFF, roleEnum.STUDENT, roleEnum.CANTEEN]),
    orderFoodController.serveOrder
  );

orderFoodRouter
  .route("/deliver/:id")
  .get()
  .patch(
    isValidToken,
    isAuthorized([roleEnum.CANTEEN]),
    orderFoodController.makeOrderDelivered
  );

orderFoodRouter
  .route("/cancel/:orderId")
  .patch(
    isValidToken,
    isAuthorized([roleEnum.STAFF, roleEnum.CANTEEN, roleEnum.STUDENT]),
    orderFoodController.cancelFoodOrder
  );

// orderFoodRouter
//   .route("/transaction-reports/:userId")
//   .get(
//     isValidToken,
//     isAuthorized([roleEnum.STAFF, roleEnum.STUDENT]),
//     orderFoodController.getTransactionReports,
//     sortFilterPagination
//   );

export default orderFoodRouter;
