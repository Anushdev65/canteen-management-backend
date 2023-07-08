import { UserOrder, Food } from "../schemasModle/model.js";

export const createOrderFoodService = async ({ body }) =>
  UserOrder.create(body);

export const readAllUserOrderService = async ({
  find = {},
  sort = "",
  limit = "",
  skip = "",
  select = "",
}) =>
  UserOrder.find(find)
    .sort(sort)
    .limit(limit)
    .skip(skip)
    .select(select)
    .populate(Food);

export const deleteSpecificUserOrderUserService = async ({ id }) =>
  UserOrder.findByIdAndDelete(id);

export const readSpecificUserOrderUserService = async ({ id }) =>
  UserOrder.findById(id).populate(Food);

export const readSpecificUserOrderUserByAny = async ({ email }) =>
  UserOrder.findOne({ email }).populate(Food);

export const updateSpecificUserOrderUserService = async ({ id, body }) =>
  UserOrder.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true,
  }).populate(Food);
