import Joi from "joi";

const orderFoodSchema = Joi.object().keys({
  foodName: Joi.string()
    .custom((value, msg) => {
      if (value.match(/^[a-z]{3,30}$/)) {
        return true;
      }

      return msg.message(
        "Food name must be in lowercase and at least 3 characters long"
      );
    })
    .required(),

  img: Joi.string().trim().uri(),

  availableTime: Joi.object().keys({
    from: Joi.date().required(),
    to: Joi.date().required(),
  }),

  rate: Joi.number()
    // .required()
    .max(500),

  availableQuantity: Joi.number().required().max(100),

  addQuantity: Joi.number().required().max(70),
});

export default orderFoodSchema;
