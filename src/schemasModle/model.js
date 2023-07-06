import { model } from "mongoose";
import { tokenSchema } from "./schemas/tokenSchema.js";
import roleSchema from "./schemas/roleSchema.js";
import authSchema from "./schemas/authSchema.js";
import generateMenuSchema from "./schemas/generateMenuSchema.js";
import categorySchema from "./schemas/categorySchema.js";
import tagsSchema from "./schemas/tagsSchema.js";
import foodSchema from "./schemas/foodSchema.js";
import orderFoodSchema from "./schemas/orderFoodSchema.js";

export const Auth = model("Auth", authSchema);
export const TokenData = model("TokenData", tokenSchema);
export const Role = model("Role", roleSchema);
export const GenerateMenu = model("GenerateMenu", generateMenuSchema);
export const Category = model("Category", categorySchema);
export const Tags = model("Tags", tagsSchema);
export const Food = model("Food", foodSchema);
export const UserOrder = model("UserOrder", orderFoodSchema);

