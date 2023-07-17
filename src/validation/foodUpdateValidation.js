import Joi from "joi";

<<<<<<< HEAD
=======

>>>>>>> 1d1a8aa14f10ba26629871c9dff20481a3631659
const foodSchema = Joi.object()
  .keys({
    id: Joi.string().required(),
    isInMenu: Joi.boolean(),
    availableTime: Joi.object().keys({
      from: Joi.string().optional().allow(""),
      to: Joi.string().optional().allow(""),
    }),
    initialQuantity: Joi.number(),
    availableQuantity: Joi.number(),
  })
  .unknown(false);
const updateFoodSchema = Joi.array().items(foodSchema).min(1);

export default updateFoodSchema;
