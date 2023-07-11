import { AddStudentDeposit } from "../schemasModle/model.js";

export const createAddStudentDepositService = async ({ body }) =>
  AddStudentDeposit.create(body);

export const readAllAddStudentDepositService = async ({
  find = {},
  sort = "",
  limit = "",
  skip = "",
  select = "",
  populate = "",
}) =>
  AddStudentDeposit.find(find)
    .sort(sort)
    .limit(limit)
    .skip(skip)
    .select(select)
    .populate("id");

export const readSpecificAddStudentDepositService = async ({ id }) =>
  AddStudentDeposit.findById(id).populate("id");

export const deleteSpecificAddStudentDepositService = async ({ id }) =>
  AddStudentDeposit.findByIdAndDelete(id);

export const updateSpecificAddStudentDepositService = async ({ id, body }) =>
  AddStudentDeposit.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true,
  });
