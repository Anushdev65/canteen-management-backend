import { secretKey } from "../config/config.js";
import { TokenData } from "../schemasModle/model.js";
import { verifyToken } from "../utils/token.js";
import tryCatchWrapper from "./tryCatchWrapper.js";

export let isValidToken = tryCatchWrapper(async (req, res, next) => {
  let { authorization = "" } = req.headers;

  let arr = authorization.split(" ");
  let token = arr[1] || "";

  // check if token starts with Bearear and check if token exist
  if (arr[0] === "Bearer" && token) {
    //verify weather the token is valid or not using jwt
    //it check weather the token is made from secretkey and check weather the expiry time reach
    let info = await verifyToken(token, secretKey);

    let tok = await TokenData.findOne({ token: token });
    // check if the given token is in our database
    if (tok === null) {
      let error = new Error("Please enter valid token");
      error.statusCode = "401";
      throw error;
    } else {
      req.token = {
        token: token,
        tokenId: tok._id,
      };
      req.info = info;
      next();
    }
  } else {
    let error = new Error("Token is not valid");
    error.statusCode = 401;
    throw error;
  }
});

// it check weather the token is valid or not if valid it gives req.info and req.token
// req.info = { userId: "...", role: "..." };
// req.token = { token: "...", tokenId: "..." };