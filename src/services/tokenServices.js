import { TokenData } from "../schemasModle/model.js";

export const deleteSpecificTokenService = async ({ id }) =>
  TokenData.findByIdAndDelete(id);
export const createTokenService = async ({ data }) => TokenData.create(data);
export const deleteAllTokenOfAUser = async ({ userId }) =>
  TokenData.deleteMany({ userId });
