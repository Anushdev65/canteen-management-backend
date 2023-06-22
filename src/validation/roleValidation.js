import Joi from "joi";

const roleSchema = Joi.object()
  .keys({
    name: Joi.string()
      .regex(/^[a-zA-Z]*$/)
      .min(3)
      .max(30),
  })
  .unknown(false);

export default roleSchema;
