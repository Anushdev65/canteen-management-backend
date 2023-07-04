import Joi from "joi";

<<<<<<< HEAD


=======
>>>>>>> 05001c6fa8f80c21a3dd0b9f08878cf056aeef1d
const categorySchema = Joi.object()


  .keys({
    name: Joi.string()
      .custom((value, msg) => {
        if (value.match(/^[a-z]{3,30}$/
        )) {
          return true;
        }
        return msg.message("Category name must be in lowercase and at least 3 characters long");
      })
<<<<<<< HEAD
     
      

      .required()    
=======
      .required()
>>>>>>> 05001c6fa8f80c21a3dd0b9f08878cf056aeef1d
  })

  .unknown(false)
<<<<<<< HEAD
  export default categorySchema






=======
>>>>>>> 05001c6fa8f80c21a3dd0b9f08878cf056aeef1d


export default categorySchema;