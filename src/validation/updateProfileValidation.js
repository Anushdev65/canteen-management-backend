import Joi from "joi";
import { roleEnum, genderEnum } from "../constant/constant.js"

const updateProfileSchema = Joi.object({
    firstName: Joi.string().trim(),

    lastName: Joi.string().trim(),

    gender: Joi.string().valid(...Object.values(genderEnum)),

    phoneNumber: Joi.string().trim().pattern(/^\d+$/),

    roles: Joi.array().items(Joi.string().valid(...Object.values(roleEnum))),

    profile: Joi.string().trim().uri(),
});

export default updateProfileSchema;
