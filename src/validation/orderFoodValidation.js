import Joi from "joi";



const orderFoodSchema = Joi.object().keys({
    foodItem: Joi.string()
        .required(),

    img: Joi.string()
        .trim()
        .uri(),

    availableTime: Joi.object().keys({
        from: Joi.date().required(),
        to: Joi.date().required(),
    }),

    rate: Joi.number()
        // .required()
        .max(500),

    

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





export default orderFoodSchema;