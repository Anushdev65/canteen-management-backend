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
}, 'Custom password validation');

const loginSchema = Joi.object()
    .keys({
        email: Joi.string().regex(
            /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
        ).required(),
        password: passwordValidation.required(),
    })
    .unknown(false);

export default loginSchema;

