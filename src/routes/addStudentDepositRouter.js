import { Router } from "express";
import { roleEnum } from "../constant/constant.js";
import { addStudentDepositController } from "../controllers/index.js";
import { isAuthorized } from "../middleware/isAuthorized.js";
import { isValidToken } from "../middleware/isValidToken.js";
import { sortFilterPagination } from "../middleware/sortSelectPage.js";

const addStudentDepositRouter = Router();

addStudentDepositRouter
  .route("/")

  .get(
    isValidToken,
    isAuthorized([roleEnum.ADMIN]),
    addStudentDepositController.readAllAddStudentDeposit,
    sortFilterPagination
  );

addStudentDepositRouter
  .route("/:id")
  .post(
    isValidToken,
    isAuthorized([roleEnum.ADMIN]),
    addStudentDepositController.createAddStudentDeposit
  )
  .patch(
    isValidToken,
    isAuthorized([roleEnum.ADMIN]),
    addStudentDepositController.updateAddStudentDeposit
  )
  .get(
    isValidToken,
    isAuthorized([roleEnum.ADMIN]),
    addStudentDepositController.readSpecificAddStudentDeposit
  )
  .delete(
    isValidToken,
    isAuthorized([roleEnum.ADMIN]),
    addStudentDepositController.deleteSpecificAddStudentDeposit
  );

export default addStudentDepositRouter;
