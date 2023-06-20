import { Router } from "express";

import { sortFilterPagination } from "../middleware/sortSelectPage.js";
import { roleController } from "../controllers/index.js";
export const roleRouter = Router();

roleRouter
  .route("/")
  .post(roleController.createRole)
  .get(roleController.readAllRole, sortFilterPagination);
roleRouter
  .route("/:id")
  .patch(roleController.updateRole)
  .get(roleController.readSpecificRole)
  .delete(roleController.deleteSpecificRole);

export default roleRouter;
