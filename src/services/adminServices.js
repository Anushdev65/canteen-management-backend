import { Admin, TokenData } from "../schemasModle/model.js";

export const createAdminUserService = async ({ body }) => Admin.create(body);

export const readAllAdminService = async ({
  find = {},
  sort = "",
  limit = "",
  skip = "",
  select = "",
}) => Admin.find(find).sort(sort).limit(limit).skip(skip).select(select);

export const deleteSpecificAdminUserService = async ({ id }) =>
  Admin.findByIdAndDelete(id);

export const readSpecificAdminUserService = async ({ id }) =>
  Admin.findById(id);
export const readSpecificAdminUserByAny = async ({ email }) =>
  Admin.findOne({ email });

export const updateSpecificAdminUserService = async ({ id, body }) =>
  Admin.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true,
  });


