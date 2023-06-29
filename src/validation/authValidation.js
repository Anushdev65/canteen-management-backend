import Joi from "joi";
import { roleEnum } from "../constant/constant.js";
// required means you must pass field
//option means valid for both pass or not
//allow("") means field can be of value ""
const authSchema = Joi.object()
  .keys({
    firstName: Joi.string()
      .regex(/^[a-zA-Z]*$/)
      .min(3)
      .max(30)
      .required(),

    // middleName: Joi.string()
    //   .regex(/^[a-zA-Z]*$/)
    //   .min(3)
    //   .max(30)
    //   .optional()
    // .allow(""),
    middleName: Joi.string()
      .regex(/^[a-zA-Z]*$/)
      .min(3)
      .max(30)
      .optional()
      .allow(""),
    // lets assume if name field is added teh lastName must be required other wise it is not
    lastName: Joi.string()
      .regex(/^[a-zA-Z]*$/)
      .min(3)
      .max(30)
      .required(),

    // password: Joi.string()
    //   // .regex(
    //   //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/
    //   // )
    //   .required(),
    gender: Joi.string().valid("male", "female", "other").required(),
    email: Joi.string()
      .regex(
        /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
      )
      .required(),
    roles: Joi.array()
      .items(Joi.string().valid(...Object.values(roleEnum)))
      .min(1)
      .required(),
    phoneNumber: Joi.string().regex(
      /(?:\(?\+977\)?)?[9][6-9]\d{8}|01[-]?[0-9]{7}/
    ).required(),
    profile: Joi.string().required()

    // items: Joi.array().items(Joi.string().optional().allow("")).required(),
    // items: Joi.array().items(Joi.string().optional().allow("")).required(),
    // items: Joi.array().items(Joi.number()).required(),
    // items: Joi.array()
    //   .items(
    //     Joi.object().keys({
    //       item: Joi.string().optional(),
    //     })
    //   )
    //   .required(),
    // customMessage: Joi.string().custom((value, msg) => {
    //   if (value === "nitan") {
    //     return msg.message("cannot be nitan");
    //   }
    //   return true;
    // }),
    // anyName: Joi.string()
    //   .custom((value, msg) => {
    //     if (value.match(/^[a-zA-Z]*$/)) {
    //       return true;
    //     }
    //     return msg.message("only alphabet is allowed");
    //   })
    //   .required(),
  })
  .unknown(false);

// .unknown(true) //it allows unknown key to pass
//.unknown(false)// it does not allow unknown key to pass

export default authSchema;
