import { Router } from "express";
import { categoryController } from "../controllers/index.js";
import { isAuthorized } from "../middleware/isAuthorized.js";
import { isValidToken } from "../middleware/isValidToken.js";
import { sortFilterPagination } from "../middleware/sortSelectPage.js";
import { roleEnum } from "../constant/constant.js";
import categorySchema from "../validation/categoryValidation.js";
import validation from "../middleware/validation.js";

 const categoryRouter = Router();

categoryRouter
  .route("/")
  .post(isValidToken,isAuthorized([roleEnum.CANTEEN]),validation(categorySchema),categoryController.createCategory)
  .get(isValidToken,isAuthorized([roleEnum.CANTEEN]),categoryController.readAllCategory, sortFilterPagination);
categoryRouter
  .route("/:id")
  .patch(isValidToken,isAuthorized([roleEnum.CANTEEN]),categoryController.updateCategory)
  .get(isValidToken,isAuthorized([roleEnum.CANTEEN]),categoryController.readSpecificCategory)
  .delete(isValidToken,isAuthorized([roleEnum.CANTEEN]),categoryController.deleteSpecificCategory);

export default categoryRouter;
