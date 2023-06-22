import { Auth } from "../schemasModle/model.js";

export const createAuthUserService = async ({ body }) => Auth.create(body);

export const readAllAuthService = async ({
  find = {},
  sort = "",
  limit = "",
  skip = "",
  select = "",
}) => Auth.find(find).sort(sort).limit(limit).skip(skip).select(select);

export const deleteSpecificAuthUserService = async ({ id }) =>
  Auth.findByIdAndDelete(id);

export const readSpecificAuthUserService = async ({ id }) => Auth.findById(id);
export const readSpecificAuthUserByAny = async ({ email }) =>
  Auth.findOne({ email });

export const updateSpecificAuthUserService = async ({ id, body }) =>
  Auth.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true,
  });
