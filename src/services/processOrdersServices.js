import { ProcessOrders } from "../schemasModle/model.js";

export const createProcessOrdersService = async ({ body }) =>
  ProcessOrders.create(body);

export const readAllProcessOrdersService = async ({
  find = {},
  sort = "",
  limit = "",
  skip = "",
  select = "",
}) =>
  ProcessOrders.find(find).sort(sort).limit(limit).skip(skip).select(select);

export const readSpecificProcessOrdersService = async ({ id }) =>
  ProcessOrders.findById(id);

export const deleteSpecificProcessOrdersService = async ({ id }) =>
  ProcessOrders.findByIdAndDelete(id);

export const updateSpecificProcessOrdersService = async ({ id, body }) =>
  ProcessOrders.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true,
  });
