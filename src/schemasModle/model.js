import { model } from "mongoose";
import { tokenSchema } from "./schemas/tokenSchema.js";
import roleSchema from "./schemas/roleSchema.js";
import authSchema from "./schemas/authSchema.js";

export const Auth = model("Auth", authSchema);
export const TokenData = model("TokenData", tokenSchema);
export const Role = model("Role", roleSchema);
