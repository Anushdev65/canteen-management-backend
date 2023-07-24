import Joi from "joi";

const categorySchema = Joi.object()

  .keys({
    name: Joi.string()
      .custom((value, msg) => {
        if (value.match(/^[a-zA-Z]{3,30}( [a-zA-Z]{3,30}){0,2}$/)) {
          return true;
        }
        return msg.message(
          "Category name must begin with a letter and have a minimum of three characters"
        );
      })
      .required()
      .lowercase(),
  })

  .unknown(false);

export default categorySchema;
