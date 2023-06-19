import { model } from "mongoose";
import adminRegisterSchema from "./schemas/adminRegister.js";
import { tokenSchema } from "./schemas/tokenSchema.js";

export const Admin = model("Admin", adminRegisterSchema);
export const TokenData = model("TokenData", tokenSchema);
