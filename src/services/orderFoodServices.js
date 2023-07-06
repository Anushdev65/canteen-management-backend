import { UserOrder } from "../schemasModle/model.js";

export const createUserOrderUserService = async ({ body }) => UserOrder.create(body);

export const readAllUserOrderService = async ({
  find = {},
  sort = "",
  limit = "",
  skip = "",
  select = "",
}) => UserOrder.find(find).sort(sort).limit(limit).skip(skip).select(select);

export const deleteSpecificUserOrderUserService = async ({ id }) =>
  UserOrder.findByIdAndDelete(id);

export const readSpecificUserOrderUserService = async ({ id }) => UserOrder.findById(id);
export const readSpecificUserOrderUserByAny = async ({ email }) =>
  UserOrder.findOne({ email });

export const updateSpecificUserOrderUserService = async ({ id, body }) =>
  UserOrder.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true,
  });
