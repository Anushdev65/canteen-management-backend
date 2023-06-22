import { Router } from "express";
import { isAuthorized } from "../middleware/isAuthorized.js";
import { isValidToken } from "../middleware/isValidToken.js";
import { sortFilterPagination } from "../middleware/sortSelectPage.js";
// import validation from "../middleware/validation.js";
// import authSchema from "../schemasModle/schemas/authSchema.js";
import { authController } from "../controllers/index.js";

export const authRouter = Router();

authRouter
  .route("/register")
  // .post(validation(authSchema),authController.createAuthUser)
  .post(authController.createAuthUser)
  .post(authController.createAuthUser)
  .get()
  .delete();
authRouter.route("/login").post(authController.loginAuthUser).get().delete();
authRouter
  .route("/verify-email")
  .patch(isValidToken, authController.verifyEmail);
authRouter
  .route("/logout")
  .post(isValidToken, authController.logoutAuthUser)
  .get()
  .delete();
authRouter
  .route("/update-profile")
  .patch(isValidToken, authController.updateAuthUser("myProfile"))
  .get()
  .delete();
authRouter
  .route("/update-password")
  .patch(isValidToken, authController.updateAuthPassword)
  .get()
  .delete();
authRouter.route("/my-profile").get(isValidToken, authController.authMyProfile);
authRouter
  .route("/")
  .get(isValidToken, authController.readAllAuthUser, sortFilterPagination);
authRouter
  .route("/:id")
  .get(isValidToken, authController.readSpecificAuthUser)
  .delete(
    isValidToken,
    isAuthorized(["superAuth"]),
    authController.deleteSpecificAuthUser
  )

  .patch(isValidToken, authController.updateAuthUser());

authRouter.route("/forgot-password").post(authController.forgotAuthPassword);

authRouter
  .route("/reset-password")
  .post(isValidToken, authController.resetAuthPassword);

// authRouter.route("/:id").patch().delete();

export default authRouter;
