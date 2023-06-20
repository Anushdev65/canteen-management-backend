import { model } from "mongoose";
import adminRegisterSchema from "./schemas/adminRegister.js";
import { tokenSchema } from "./schemas/tokenSchema.js";
import roleSchema from "./schemas/roleSchema.js";

export const Admin = model("Admin", adminRegisterSchema);
export const TokenData = model("TokenData", tokenSchema);
export const Role = model("Role", roleSchema);
