import bcrypt from "bcrypt";
//1 hash password

//generating hasd password
export let hashPassword = async (password = "", salt = 10) => {
  // 10 means hash 2pow 10  times
  // no need of try catch

  try {
    let innerHashPassword = await bcrypt.hash(password, salt);
    return innerHashPassword;
  } catch (error) {
    let err = new Error(error.message);
    err.statusCode = 400;
    throw err;
  }
};

//2 compare hash password

export let comparePassword = async (password = "", hashPassword = "") => {
  // no need of try catch
  try {
    let isValidPassword = await bcrypt.compare(password, hashPassword);
    //compare check weather a hashPassword is made form password
    //if yes return true else false

    return isValidPassword;
  } catch (error) {
    let err = new Error("Please Enter Valid Email or Password.");
    err.statusCode = 401;
    throw err;
  }
};
