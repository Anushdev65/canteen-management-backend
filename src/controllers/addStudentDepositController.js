import { HttpStatus } from "../constant/constant.js";
import successResponseData from "../helper/successResponseData.js";
import tryCatchWrapper from "../middleware/tryCatchWrapper.js";
import { AddStudentDeposit } from "../schemasModle/model.js";
import { addStudentDepositServices } from "../services/index.js";

export let createAddStudentDeposit = tryCatchWrapper(async (req, res) => {
  let body = { ...req.body };
  // let id = req.params.id
  let getAllDepositLength = await AddStudentDeposit.find({}).count();
  body.voucherNo = (getAllDepositLength || 0) + 1;
  console.log("**", getAllDepositLength);

  let data = await addStudentDepositServices.createAddStudentDepositService({
    body: body,
  });

  successResponseData({
    res,
    message: "AddStudentDeposit created successfully.",
    statusCode: HttpStatus.CREATED,
    data,
  });
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
