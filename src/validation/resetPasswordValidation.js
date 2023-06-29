import Joi from "joi";

const resetPasswordSchema = Joi.object({
    password: Joi.string()
        .required()
        .min(8)
        .max(20)
        .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,20}$"))
        .messages({
            "string.base": "Password must be a string",
            "string.empty": "Password is required",
            "string.min": "Password must have at least {#limit} characters",
            "string.max": "Password can have at most {#limit} characters",
            "string.pattern.base": "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character",
            "any.required": "Password is required",
        }),
}).messages({
    "object.unknown": "Invalid field provided",
});

export default resetPasswordSchema;