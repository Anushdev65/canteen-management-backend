
import {   Food } from "../schemasModle/model.js";

export const createFoodService = async ({ body }) => Food.create(body);

export const readAllFoodService = async ({
  find = {},
  sort = "",
  limit = "",
  skip = "",
  select = "",
populate="",
}) => Food.find(find).sort(sort).limit(limit).skip(skip).select(select).populate("categoryId");

export const readSpecificFoodService = async ({ id }) => Food.findById(id).populate("categoryId");

export const deleteSpecificFoodService = async ({ id }) =>
  Food.findByIdAndDelete(id)



export const updateSpecificFoodService = async ({ id, body }) =>
  Food.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true,
  });


