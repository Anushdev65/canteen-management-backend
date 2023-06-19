import { Router } from "express";
import { adminController } from "../controllers/index.js";
import { isAuthorized } from "../middleware/isAuthorized.js";
import { isValidToken } from "../middleware/isValidToken.js";
import { sortFilterPagination } from "../middleware/sortSelectPage.js";
import validation from "../middleware/validation.js";
import adminSchema from "../validation/adminValidation.js";

export const adminRegisterRouter = Router();

adminRegisterRouter
  .route("/register")
  .post(validation(adminSchema), adminController.createAdminUser)
  .post(adminController.createAdminUser)
  .get()
  .delete();
adminRegisterRouter
  .route("/login")
  .post(adminController.loginAdminUser)
  .get()
  .delete();
adminRegisterRouter
  .route("/logout")
  .post(isValidToken, adminController.logoutAdminUser)
  .get()
  .delete();
adminRegisterRouter
  .route("/update-profile")
  .patch(isValidToken, adminController.updateAdminUser("myProfile"))
  .get()
  .delete();
adminRegisterRouter
  .route("/update-password")
  .patch(isValidToken, adminController.updateAdminPassword)
  .get()
  .delete();
adminRegisterRouter
  .route("/my-profile")
  .get(isValidToken, adminController.adminMyProfile);
adminRegisterRouter
  .route("/")
  .get(isValidToken, adminController.readAllAdminUser, sortFilterPagination);
adminRegisterRouter
  .route("/:id")
  .get(isValidToken, adminController.readSpecificAdminUser)
  .delete(
    isValidToken,
    isAuthorized(["superAdmin"]),
    adminController.deleteSpecificAdminUser
  )

  .patch(isValidToken, adminController.updateAdminUser());

adminRegisterRouter
  .route("/forgot-password")
  .post(adminController.forgotAdminPassword);

adminRegisterRouter
  .route("/reset-password")
  .post(isValidToken, adminController.resetAdminPassword);

// adminRegisterRouter.route("/:id").patch().delete();

export default adminRegisterRouter;
