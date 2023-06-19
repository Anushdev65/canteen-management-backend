import jwt from "jsonwebtoken";
export let generateToken = async (
  infoObj = {},
  secretKey = "",
  expiresIn = "365d"
) => {
  // send expiresInfo like
  let expiresInfo = {
    expiresIn: expiresIn,
  };

  // generate token
  // at infoObje we mostly use _id property and role

  try {
    let token = await jwt.sign(infoObj, secretKey, expiresInfo);
    return token;
  } catch (error) {
    let er = new Error(error.message);
    error.statusCode = "400";
    throw er;
  }
};

export let verifyToken = async (token = "", secretKey = "") => {
  try {
    let infoObj = await jwt.verify(token, secretKey);
    return infoObj;
  } catch (error) {
    let er = new Error(error.message);
    error.statusCode = "401";
    throw er;
  }

  //   to  verify or to give infoObje
  //first it checks weather the token is made from secretkey
  //then it checks expiry date
};
