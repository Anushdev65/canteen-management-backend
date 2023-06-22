import { Router } from "express";

import { sortFilterPagination } from "../middleware/sortSelectPage.js";
import { roleController } from "../controllers/index.js";
import roleSchema from "../validation/roleValidation.js";
import validation from "../middleware/validation.js";
export const roleRouter = Router();

roleRouter
  .route("/")
  .post(validation(roleSchema), roleController.createRole)
  .get(roleController.readAllRole, sortFilterPagination);
roleRouter
  .route("/:id")
  .patch(roleController.updateRole)
  .get(roleController.readSpecificRole)
  .delete(roleController.deleteSpecificRole);

export default roleRouter;
