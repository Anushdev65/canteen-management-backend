import Joi from "joi";

const categorySchema = Joi.object()

  .keys({
    name: Joi.string()
      .custom((value, msg) => {
        if (value.match(/^[a-z]{3,30}( [a-z]{3,30}){0,2}$/)) {
          return true;
        }
        return msg.message(
          "Category name must be in lowercase and at least 3 characters long"
        );
      })
      .required(),
  })

  .unknown(false);

export default categorySchema;
