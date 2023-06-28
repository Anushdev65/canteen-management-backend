import Joi from "joi";


const categorySchema = Joi.object()
  .keys({
    name: Joi.string()
        .custom((value, msg) => {
        if (value.match(/^[a-zA-Z]*$/)) {
          return true;
        }
        return msg.message("only alphabet is allowed");
      })
      .min(3)
      .max(30)
      .required()  
      
      
  })
 

 
  .unknown(false)
  

export default categorySchema;


