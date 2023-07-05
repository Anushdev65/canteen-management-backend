import Joi from "joi";



const categorySchema = Joi.object()


  .keys({
    name: Joi.string()
      .custom((value, msg) => {
        if (value.match(/^[a-z]{3,30}$/)) {
          return true;
        }
        return msg.message(
          "Category name must be in lowercase and at least 3 characters long"
        );
      })
<<<<<<< HEAD
      .required(),
  })

  .unknown(false);

export default categorySchema;
=======
     
      

      .required()    
  })

  .unknown(false)
  export default categorySchema








>>>>>>> 59725d1ec28ba851574ae3bf39151810df375980
