import Joi from "joi";
import { description } from "../constant/constant.js";

const foodSchema = Joi.object()
  .keys({
    name: Joi.string()
      .min(3)
      .max(50)
      .required(),
      rate:Joi.number()
      .required(),
      discountedRate:Joi.number()
      .less(Joi.ref('rate'))
      
      .optional(),
      description:Joi.string()
      .min(3)
      .max(description.LONG)
      .optional()
      .allow(""),
      categoryId:Joi.string()
      .required(),

})
  .unknown(false)

export default foodSchema;
