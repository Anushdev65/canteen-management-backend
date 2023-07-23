import {
  expiryIn,
  reset_expiry_in,
  secretKey,
  tokenTypes,
} from "../config/config.js";
import { HttpStatus } from "../constant/constant.js";
import successResponseData from "../helper/successResponseData.js";
import tryCatchWrapper from "../middleware/tryCatchWrapper.js";
import { Auth } from "../schemasModle/model.js";
import {
  sendEmailToForgotPassword,
  sendEmailToVerify,
} from "../services/emailServices.js";

import { authService, tokenService } from "../services/index.js";
import getTokenExpiryTime from "../utils/getTokenExpiryTime.js";
import { comparePassword, hashPassword } from "../utils/hashFunction.js";
import { throwError } from "../utils/throwError.js";
import { generateToken } from "../utils/token.js";

// register
//login
//logout
//  my profile
//update register (profile)//we do not update email and password
//update password for login user (delete token after update password and don't change password if password are same)
//forgetpassword(reset password)
//delete

// expiration

export let createAuthUser = tryCatchWrapper(async (req, res) => {
  let body = { ...req.body };
  body.isVerify = false;
  let email = body.email;
  let user = await authService.readSpecificAuthUserByAny({ email });
  let getAllUser = await Auth.find({}).count();
  body.userId = (getAllUser || 0) + 1;

  if (user) {
    throwError({
      message: "Duplicate email.",
      statusCode: HttpStatus.UNAUTHORIZED,
    });
  } else {
    let data = await authService.createAuthUserService({ body });
    delete data._doc.password;
    let infoObj = { userId: data._id };

    let token = await generateToken(infoObj, secretKey, expiryIn);
    console.log(token);

    let tokenData = {
      token: token,
      userId: data._id,
      type: tokenTypes.VERIFY_EMAIL,
      expiration: getTokenExpiryTime(token).toLocaleString(),
    };

    await tokenService.createTokenService({ data: tokenData });
    await sendEmailToVerify({
      email,
      token,
      firstName: body.firstName,
      lastName: body.lastName,
    });

    successResponseData({
      res,
      message: "Verification mail has been sent.",
      statusCode: HttpStatus.CREATED,
      data,
    });
  }
});

//localhost:8000/user/email-verify?id=1234234
export let verifyEmail = tryCatchWrapper(async (req, res, next) => {
  let id = req.info.userId;
  let tokenId = req.token.tokenId;

  let passHashedPassword = await hashPassword(req.body.password);

  let data = await authService.updateSpecificAuthUserService({
    id,
    body: {
      isVerified: true,
      password: passHashedPassword,
    },
  });
  console.log(data);
  delete data._doc.password;
  await tokenService.deleteSpecificTokenService({ id: tokenId });
  successResponseData({
    res,
    message: "Email verified successfully.",
    statusCode: HttpStatus.CREATED,
    data,
  });
});

export let loginAuthUser = tryCatchWrapper(async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let user = await authService.readSpecificAuthUserByAny({ email });
  if (user === null) {
    throwError({
      message: "Please enter valid email or password.",
      statusCode: 401,
    });
  } else {
    let isValidPassword = await comparePassword(password, user.password);
    if (isValidPassword) {
      let infoObj = { userId: user._id };
      let token = await generateToken(infoObj, secretKey, expiryIn);

      console.log(token);

      let data = {
        token: token,
        userId: user._id,
        type: tokenTypes.ACCESS,
        expiration: getTokenExpiryTime(token).toLocaleString(),
      };

      await tokenService.createTokenService({ data });

      successResponseData({
        res,
        message: "Login Successfully.",
        statusCode: HttpStatus.OK,
        data: {
          token: token,
          user: user,
        },
      });
    } else {
      throwError({
        message: "Please enter valid email or password.",
        statusCode: 401,
      });
    }
  }
});

export let logoutAuthUser = tryCatchWrapper(async (req, res) => {
  await tokenService.deleteSpecificTokenService({ id: req.token.tokenId });

  successResponseData({
    res,
    message: "Logout Successfully.",
    statusCode: HttpStatus.OK,
  });
  // instead of 204 , 200 is better because we pass some data
});

//* we have two update one for profile and another update is by auth
export let updateAuthUser = (profile) =>
  tryCatchWrapper(async (req, res) => {
    let body = { ...req.body };
    delete body.password;
    delete body.email;

    //if user is other than admin lets not allow him to change the role
    if (!req.info.roles.includes("admin")) {
      delete body.roles;
    }

    let id = profile === "myProfile" ? req.info.userId : req.params.id;
    let user = await authService.readSpecificAuthUserService({ id });
    if (user) {
      let data = await authService.updateSpecificAuthUserService({ id, body });
      successResponseData({
        res,
        message: "User updated successfully.",
        statusCode: HttpStatus.CREATED,
        data,
      });
    } else {
      throwError({
        message: "Could not found user.",
        statusCode: HttpStatus.NOT_FOUND,
      });
    }
  });

export let updateAuthPassword = tryCatchWrapper(async (req, res) => {
  //don't allow to updated if previous and present password are same(it is said to be good practice)
  let id = req.info.userId;
  let oldPassword = req.body.oldPassword;
  let password = req.body.password;
  // let data = await updateAuthPasswordService(req.info.userId);

  let user = await authService.readSpecificAuthUserService({ id });

  let isOldPasswordMatches = await comparePassword(oldPassword, user.password);

  if (!isOldPasswordMatches) {
    throwError({ message: "Password does'not matches.", statusCode: 401 });
  }

  let isPreviousCurrentPasswordSame = await comparePassword(
    password,
    user.password
  );

  if (isPreviousCurrentPasswordSame) {
    throwError({
      message: "Previous and Current password are same.",
      statusCode: 401,
    });
  }
  let body = {
    password: await hashPassword(password),
  };
  // let result = await Auth.findByIdAndUpdate(userId, data, { new: true });
  let data = await authService.updateSpecificAuthUserService({ id, body });
  delete data._doc.password;
  //removing token after update
  // await tokenService.deleteSpecificTokenService({ id: req.token.tokenId });
  await tokenService.deleteAllTokenOfAUser({ userId: id });

  successResponseData({
    res,
    message: "User password updated successfully.",
    statusCode: HttpStatus.CREATED,
    data,
  });
});

export let authMyProfile = tryCatchWrapper(async (req, res) => {
  let id = req.info.userId;
  let data = await authService.readSpecificAuthUserService({ id });
  // instead of console result
  //doe let r1={...result}
  //then it will show exact result
  //instead of deleting like
  // delete result.password;
  // do like this
  // delete result._doc.password;
  successResponseData({
    res,
    message: "Profile read successfully.",
    statusCode: HttpStatus.OK,
    data,
  });
});

// forgotPassword and reset password

//forgotPassword
// email=> check user => if exist genderate token => send email
//forgotPassword token has less expiry time
export let forgotAuthPassword = tryCatchWrapper(async (req, res) => {
  let email = req.body.email;
  let user = await authService.readSpecificAuthUserByAny({ email });

  if (!user) {
    throwError({
      message: "Could'nt found user.",
      statusCode: HttpStatus.UNAUTHORIZED,
    });
  }
  let infoObj = {
    userId: user._id,
  };

  let token = await generateToken(infoObj, secretKey, reset_expiry_in);
  console.log(token);

  let tokenData = {
    token: token,
    userId: user._id,
    type: tokenTypes.RESET_PASSWORD,
    expiration: getTokenExpiryTime(token).toLocaleString(),
  };

  await tokenService.createTokenService({ data: tokenData });

  await sendEmailToForgotPassword({
    email,
    token,
    firstName: user.firstName,
    lastName: user.lastName,
  });

  successResponseData({
    res,
    message: "Email sent successfully.",
    statusCode: HttpStatus.OK,
  });
});

export let resetAuthPassword = tryCatchWrapper(async (req, res) => {
  let id = req.info.userId;
  let password = req.body.password;
  let user = await authService.readSpecificAuthUserService({ id });

  if (!user) {
    throwError({
      message: "User does'not exist.",
      statusCode: HttpStatus.UNAUTHORIZED,
    });
  }

  let isPreviousCurrentPasswordSame = await comparePassword(
    password,
    user.password
  );

  if (isPreviousCurrentPasswordSame) {
    throwError({
      message: "Previous and Current password are same.",
      statusCode: HttpStatus.UNAUTHORIZED,
    });
  }
  let body = {
    password: await hashPassword(password),
  };
  await authService.updateSpecificAuthUserService({ id, body });
  await tokenService.deleteAllTokenOfAUser({ userId: id });

  successResponseData({
    res,
    message: "Password reset successfully.",
    statusCode: HttpStatus.OK,
  });
});

export let readAllAuthUser = tryCatchWrapper(async (req, res, next) => {
  let find = {};

  if (req.query.email) {
    find.email = { $regex: req.query.email, $options: "i" };
  }

  if (req.query.roles) {
    find.roles = { $in: req.query.roles.split(",") };
  }

  req.find = find;
  req.service = authService.readAllAuthService;
  req.myOwnSelect = "-password";
  next();
});

export let readSpecificAuthUser = tryCatchWrapper(async (req, res) => {
  let id = req.params.id;
  let data = await authService.readSpecificAuthUserService({ id });
  if (data) {
    delete data._doc.password;
    successResponseData({
      res,
      message: "Read user successfully.",
      statusCode: HttpStatus.OK,
      data,
    });
  } else {
    throwError({
      message: "Could'nt found user.",
      statusCode: HttpStatus.NOT_FOUND,
    });
  }
});

export let deleteSpecificAuthUser = tryCatchWrapper(async (req, res) => {
  let id = req.params.id;
  if (id === req.info.userId) {
    throwError({
      message: "User can not delete himself/herself.",
      statusCode: HttpStatus.UNAUTHORIZED,
    });
  }
  let user = await authService.readSpecificAuthUserService({ id });

  if (user) {
    let data = await authService.deleteSpecificAuthUserService({ id });
    delete data?._doc?.password;

    successResponseData({
      res,
      message: "User deleted successfully.",
      statusCode: HttpStatus.OK,
      data,
    });
  } else {
    throwError({
      message: "Couldn't found user.",
      statusCode: HttpStatus.NOT_FOUND,
    });
  }
});
