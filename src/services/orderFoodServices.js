import { UserOrder, Food } from "../schemasModle/model.js";

export const createOrderFoodService = async ({ body }) =>
  UserOrder.create(body);
export const createManyFoodService = async ({ body }) =>
  UserOrder.insertMany(body);

export const readAllOrderFoodService = async ({
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
    .populate("food");

export const deleteSpecificOrderFoodService = async ({ id }) =>
  UserOrder.findByIdAndDelete(id);

export const readSpecificOrderFoodService = async ({ id }) =>
  UserOrder.findById(id).populate("food");

export const updateSpecificOrderFoodService = async ({ id, body }) =>
  UserOrder.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true,
  });

export const findByIdAndUpdate = async (id, update) =>
  UserOrder.findByIdAndUpdate(id, update, { new: true, runValidators: true });

export const findByIdAndDelete = async (id) => UserOrder.findByIdAndDelete(id);
