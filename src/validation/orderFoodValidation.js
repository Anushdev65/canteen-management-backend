import Joi from "joi";
import { statusEnum } from "../constant/constant.js";

const orderFoodSchema = Joi.object().keys({
  food: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
      "any.required": "foodName is required.",
      "string.pattern.base": "foodName must be a valid ObjectId.",
    }),

  // userId: Joi.string()
  //   .pattern(/^[0-9a-fA-F]{24}$/)
  //   .required()
  //   .messages({
  //     "any.required": "userId is required.",
  //     "string.pattern.base": "userId must be a valid ObjectId.",
  //   }),

  // orderStatus: Joi.string()
  //   .valid(...Object.values(statusEnum))
  //   .min(1)
  //   .max(1)
  //   .required(),

  quantity: Joi.number().required(),
});

export default orderFoodSchema;
