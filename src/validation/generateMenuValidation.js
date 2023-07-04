import Joi from "joi";


const timeValidation = Joi.string().custom((value, helpers) => {
    // Regular expression pattern for time format HH:MM AM/PM
    const timePattern = /^(0?[1-9]|1[0-2]):[0-5]\d\s[AP]M$/;

    if (!value.match(timePattern)) {
        return helpers.error("any.invalid");
    }

    // Extract the hour and period (AM/PM) from the time string
    const [hour, period] = value.split(/:|\s/);

    // Convert the hour to a number
    const numericHour = parseInt(hour, 10);

    // Check if the time is between 7 AM and 5 PM
    if (period === "AM" && (numericHour < 7 || numericHour >= 12)) {
        return helpers.error("any.invalid", { message: "Time must be between 7 AM and 5 PM" });
    }

    if (period === "PM" && (numericHour < 1 || numericHour > 5)) {
        return helpers.error("any.invalid", { message: "Time must be between 7 AM and 5 PM" });
    }

    return value;
}, 'Custom time validation').messages({
    'any.invalid': 'Invalid time format. Use HH:MM AM/PM format and make sure you remove the spaces',
});



const generateMenuSchema = Joi.object().keys({
    foodItem: Joi.string()
        .required(),

    profile: Joi.string()
        .trim()
        .uri(),

    availableTime: Joi.object().keys({
        from: timeValidation.required(),


        to: timeValidation.required(),


    }),

    rate: Joi.number()
        // .required()
        .max(500),

    initialQuantity: Joi.number()
        .required()
        .max(100),

    availableQuantity: Joi.number()
        .required()
        .max(100),

    addQuantity: Joi.number()
        .required()
        .max(70),

    substractQuantity: Joi.number()
        .optional()
        .min(0)

});





export default generateMenuSchema;