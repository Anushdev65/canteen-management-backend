import { Router } from "express";
import { isAuthorized } from "../middleware/isAuthorized.js";
import { isValidToken } from "../middleware/isValidToken.js";
import { sortFilterPagination } from "../middleware/sortSelectPage.js";
import validation from "../middleware/validation.js";
import { authController } from "../controllers/index.js";
import {
  authSchema,
  verifySchema,
  loginSchema,
  logoutSchema,
  updateProfileSchema,
  updateUserByAdminSchema,
  updatePasswordSchema,
  forgetPasswordSchema,
  resetPasswordSchema
} from "../validation/index.js"

export const authRouter = Router();

authRouter
  .route("/register")
  // .post(validation(authSchema),authController.createAuthUser)
  .post(validation(authSchema), authController.createAuthUser);
authRouter
  .route("/login").post(validation(loginSchema), authController.loginAuthUser);
authRouter
  .route("/verify-email")
  .patch(validation(verifySchema), isValidToken, authController.verifyEmail);

authRouter.route("/my-profile").get(isValidToken, authController.authMyProfile);

authRouter
  .route("/logout")
  .patch(validation(logoutSchema), isValidToken, authController.logoutAuthUser);
authRouter
  .route("/update-profile")
  .patch(validation(updateProfileSchema), isValidToken, authController.updateAuthUser("myProfile"));
authRouter
  .route("/update-password")
  .patch(validation(updatePasswordSchema), isValidToken, authController.updateAuthPassword)
  .get()
  .delete();
authRouter
  .route("/")
  .get(isValidToken, authController.readAllAuthUser, sortFilterPagination);
authRouter
  .route("/:id")
  .get(
    isValidToken,
    isAuthorized(["admin"]),
    authController.readSpecificAuthUser
  )
  .delete(
    isValidToken,
    isAuthorized(["admin"]),
    authController.deleteSpecificAuthUser
  )
  .patch(
    validation(updateUserByAdminSchema),
    isValidToken,
    isAuthorized(["admin"]),
    authController.updateAuthUser()
  );

authRouter.route("/forgot-password")
  .post(validation(forgetPasswordSchema), authController.forgotAuthPassword);

authRouter
  .route("/reset-password")
  .post(validation(resetPasswordSchema), isValidToken, authController.resetAuthPassword);

// authRouter.route("/:id").patch().delete();

export default authRouter;
