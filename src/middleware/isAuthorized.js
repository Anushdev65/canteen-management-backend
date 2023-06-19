import tryCatchWrapper from "./tryCatchWrapper.js";
// don't add roleArray to roleArray
export let isAuthorized = (roleArray) =>
  tryCatchWrapper(async (req, res, next) => {
    let { role } = req.info;

    let isAuthorizedUser = roleArray.includes(role);

    if (isAuthorizedUser) next();
    else {
      let error = new Error("User is not Authorized.");
      error.statusCode = 403;
      throw error;
    }
  });
