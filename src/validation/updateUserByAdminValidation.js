import { roleEnum, genderEnum } from "../constant/constant.js";
import Joi from "joi";

const updateUserByAdminSchema = Joi.object({
  firstName: Joi.string()
    .regex(/^[a-zA-Z]*$/)
    .min(3)
    .max(30)
    .trim(),

  lastName: Joi.string()
    .regex(/^[a-zA-Z]*$/)
    .min(2)
    .max(30)
    .trim(),

  gender: Joi.string().valid(...Object.values(genderEnum)),

  phoneNumber: Joi.string()
    .length(10)
    .regex(/^(?:\(?\+977\)?)?[9][6-9]\d{8}|01[-]?[0-9]{7,}$/)
    .message("Enter a valid phonenumber"),

  roles: Joi.array().items(Joi.string().valid(...Object.values(roleEnum))),

  profile: Joi.string().trim().uri(),
});

export default updateUserByAdminSchema;
