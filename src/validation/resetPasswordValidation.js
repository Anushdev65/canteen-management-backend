import Joi from "joi";

const resetPasswordSchema = Joi.object({
    password: Joi.string()
        .required()
        .min(8)
        .max(20)
        .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,20}$"))
        .messages({
            "string.pattern.base": "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character",

        }),
})

export default resetPasswordSchema;