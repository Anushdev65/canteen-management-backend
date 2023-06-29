import { GenerateMenu } from "../schemasModle/model.js";

export const createGenerateMenuService = async ({ body }) => GenerateMenu.create(body);

export const readAllGenerateMenuService = async ({
    find = {},
    sort = "",
    limit = "",
    skip = "",
    select = "",
}) => GenerateMenu.find(find).sort(sort).limit(limit).skip(skip).select(select);

export const readSpecificGenerateMenuService = async ({ id }) => GenerateMenu.findById(id);

export const deleteSpecificGenerateMenuService = async ({ id }) =>
    GenerateMenu.findByIdAndDelete(id);

export const updateSpecificGenerateMenuService = async ({ id, body }) =>
    GenerateMenu.findByIdAndUpdate(id, body, {
        new: true,
        runValidators: true,
    });
