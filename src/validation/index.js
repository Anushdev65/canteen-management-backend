import Joi from "joi";

import authSchema from "./authValidation.js";
import verifySchema from "./verifyValidation.js";
import loginSchema from "./loginValidation.js";
import logoutSchema from "./logoutValidation.js";
import updateProfileSchema from "./updateProfileValidation.js";
import updateUserByAdminSchema from "./updateUserByAdminValidation.js";
import updatePasswordSchema from "./updatePasswordValidation.js";
import forgetPasswordSchema from "./forgotPasswordValidation.js";
import resetPasswordSchema from "./resetPasswordValidation.js";

export {
    Joi,
    authSchema,
    verifySchema,
    loginSchema,
    logoutSchema,
    updateProfileSchema,
    updateUserByAdminSchema,
    updatePasswordSchema,
    forgetPasswordSchema,
    resetPasswordSchema

};