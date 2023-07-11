import { HttpStatus, roleEnum } from "../constant/constant.js";
import successResponseData from "../helper/successResponseData.js";
import tryCatchWrapper from "../middleware/tryCatchWrapper.js";
import { AddStudentDeposit, Auth } from "../schemasModle/model.js";
import { addStudentDepositServices, authService } from "../services/index.js";
import { throwError } from "../utils/throwError.js";

export let createAddStudentDeposit = tryCatchWrapper(async (req, res) => {
  let id = req.params.id;

  let user = await authService.readSpecificAuthUserService({ id });
  if (Object.keys(user).length && user.roles.includes(roleEnum.STUDENT)) {
    let body = { ...req.body, user: id };

    let getAllDepositLength = await AddStudentDeposit.find({}).count();
    body.voucherNo = (getAllDepositLength || 0) + 1;

    let data = await addStudentDepositServices.createAddStudentDepositService({
      body: body,
    });
    let updatedTotalBalance = {
      totalBalance: user.totalBalance + body.amount,
    };
    await authService.updateSpecificAuthUserService({
      id,
      body: updatedTotalBalance,
    });
    successResponseData({
      res,
      message: "AddStudentDeposit created successfully.",
      statusCode: HttpStatus.CREATED,
      data,
    });
  } else {
    throwError({
      message: "Only student deposits are allowed .",
      statusCode: HttpStatus.BAD_REQUEST,
    });
  }
});

export let updateAddStudentDeposit = tryCatchWrapper(async (req, res) => {
  let body = { ...req.body };
  let id = req.params.id;

  let data =
    await addStudentDepositServices.updateSpecificAddStudentDepositService({
      id,
      body,
    });

  successResponseData({
    res,
    message: "AddStudentDeposit updated successfully.",
    statusCode: HttpStatus.CREATED,
    data,
  });
});

export let readSpecificAddStudentDeposit = tryCatchWrapper(async (req, res) => {
  let id = req.params.id;

  let data =
    await addStudentDepositServices.readSpecificAddStudentDepositService({
      id,
    });

  successResponseData({
    res,
    message: "Read  addStudentDeposit successfully.",
    statusCode: HttpStatus.OK,
    data,
  });
});

export let readAllAddStudentDeposit = tryCatchWrapper(
  async (req, res, next) => {
    let find = {};
    req.find = find;
    req.service = addStudentDepositServices.readAllAddStudentDepositService;

    next();
  }
);

export let deleteSpecificAddStudentDeposit = tryCatchWrapper(
  async (req, res) => {
    let id = req.params.id;
    let data =
      await addStudentDepositServices.deleteSpecificAddStudentDepositService({
        id,
      });
    successResponseData({
      res,
      message: "AddStudentDeposit delete successfully.",
      statusCode: HttpStatus.OK,
      data,
    });
  }
);
