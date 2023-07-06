import Joi from "joi";
import { description, tagsEnum } from "../constant/constant.js";


const foodSchema = Joi.object()
  .keys({
    name: Joi.string()
      .custom((value, msg) => {
        if (value.match(/^[a-z]{3,30}$/)) {
          return true;
        }

        return msg.message(
          "Food name must be in lowercase and at least 3 characters long"
        );
      })
      .required(),

    rate: Joi.number().required().messages({
      "any.required": "rate is required.",
      "number.base": "rate must be a number.",
    }),
    foodImage: Joi.string().required().messages({
      "any.required": "foodImage is required.",
      "string.base": "foodImage must be a string.",
    }),
    discountedRate: Joi.number()
      .less(Joi.ref("rate"))
      .optional()
      .allow("")
      .messages({
        "number.base": "discountedRate must be a number.",
        "number.less": "discountedRate must be less than the rate.",
        "any.required": "discountedRate is required.",
      }),
    description: Joi.string().min(3).max(description.LONG).optional().allow(""),
    category: Joi.string().required(),
    tags: Joi.string()
      .valid("breakfast", "lunch", "dinner", "snacks", "all time")
      .required(),
    isInMenu: Joi.boolean(),
    availableTime: Joi.object().keys({
      from: Joi.string().optional().allow(""),
      to: Joi.string().optional().allow(""),
    }),
    initialQuantity: Joi.number(),
    availableQuantity: Joi.number(),
  })
  .unknown(false);

export default foodSchema;
