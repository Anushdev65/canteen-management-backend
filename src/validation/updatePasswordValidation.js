import Joi from "joi";

const passwordValidation = Joi.string().custom((value, helpers) => {
    if (value.length < 8) {
        return helpers.error("any.invalid");
    }
    if (!value.match(/[a-zA-Z]/)) {
        return helpers.error("any.invalid");
    }
    if (!value.match(/[0-9]/)) {
        return helpers.error("any.invalid");
    }

    return value;
}, 'Custom password validation').messages({
    'any.invalid': 'password must be at least 8 characters long and contain at least one letter and one digit'
});

const updatePasswordSchema = Joi.object()
    .keys({
        oldPassword: passwordValidation.required(),
        newPassword: passwordValidation.required(),
    })
    .unknown(false);

export default updatePasswordSchema;
