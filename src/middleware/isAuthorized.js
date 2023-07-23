import tryCatchWrapper from "./tryCatchWrapper.js";
// don't add roleArray to roleArray
export let isAuthorized = (roleArray) =>
  tryCatchWrapper(async (req, res, next) => {
    let { roles } = req.info;

    let isAuthorizedUser = roles.some((role, i) => {
      if (roleArray.includes(role)) return true;
      else return false;
    });

    if (isAuthorizedUser) next();
    else {
      let error = new Error("User is not Authorized.");
      error.statusCode = 403;
      throw error;
    }
  });

  
