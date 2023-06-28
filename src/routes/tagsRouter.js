import { Router } from "express";
import { sortFilterPagination } from "../middleware/sortSelectPage.js";
import { tagsController } from "../controllers/index.js";

 const tagsRouter = Router();

tagsRouter
  .route("/tags")
  .post(tagsController.createTags)
  .get(tagsController.readAllTags, sortFilterPagination);
tagsRouter
  .route("/:id")
  .patch(tagsController.updateTags)
  .get(tagsController.readSpecificTags)
  .delete(tagsController.deleteSpecificTags);

export default tagsRouter;
