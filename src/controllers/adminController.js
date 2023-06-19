import {
  baseUrl,
  expiryIn,
  fromEmail,
  reset_expiry_in,
  secretKey,
  tokenTypes,
} from "../config/config.js";
import { HttpStatus } from "../constant/constant.js";
import successResponseData from "../helper/successResponseData.js";
import tryCatchWrapper from "../middleware/tryCatchWrapper.js";

import { adminService, tokenService } from "../services/index.js";
import getTokenExpiryTime from "../utils/getTokenExpiryTime.js";
import { comparePassword, hashPassword } from "../utils/hashFunction.js";
import { sendMail } from "../utils/sendMail.js";
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

export let createAdminUser = tryCatchWrapper(async (req, res) => {
  let body = { ...req.body };
  data.isVerify = false;
  let email = data.email;
  let user = await adminService.readSpecificAdminUserByAny({ email: email });

  if (user) {
    let error = new Error("Duplicate email.");
    error.statusCode = 409;
    throw error;
  }

  let passHashedPassword = await hashPassword(body.password);
  body.password = passHashedPassword;
  let data = await adminService.createAdminUserService({ body });
  delete data._doc.password;
  let infoObj = { userId: data._id, role: data.role };

  let token = await generateToken(infoObj, secretKey, expiryIn);

  await tokenService.createTokenService({
    token: token,
    type: tokenTypes.ACCESS,
    expiration: getTokenExpiryTime(token).toLocaleString(),
  });

  let verificationEmailUrl = `${baseUrl}/admin/confirm-email?token=${token}`;
  const html = `
  <div style="background: lightgray; padding: 20px; margin: 30px;">
    <div style="background: #fff; padding: 20px">
      <br><br> 
      Dear ${body.firstName} ${body.lastName}, <br>
      To verify your email, please click on below button: <br>
      <div style="text-align:center; margin-top: 15px;">
        <a style="background-color: #FFC43E; padding: 10px; border-radius: 10px; color: black; font-weight: bold; text-decoration: none;" href=${verificationEmailUrl}>Verify Email</a>
      </div>
      <br> <br>
      if above button does not works, click on below link: <br> ${verificationEmailUrl}
      <br> <br> If you did not request any email verification, then please ignore this email.
      <br>
    </div>

  </div>
`;

  await sendMail({
    from: `"Nitan Thapa" <${fromEmail}>`,
    to: [body.email],
    subject: "Email verification",
    html: html,
  });

  successResponseData({
    res,
    message: "Admin Created Successfully.",
    statusCode: HttpStatus.CREATED,
    data,
  });
});

export let loginAdminUser = tryCatchWrapper(async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  // let data = await loginAdminUserService(req.body.email, req.body.password);
  //if email exist
  //if password match
  //token send
  let user = await adminService.readSpecificAdminUserByAny({ email });
  if (user === null) {
    throwError({
      message: "Please enter valid email or password.",
      statusCode: 401,
    });
  } else {
    let isValidPassword = await comparePassword(password, user.password);
    if (isValidPassword) {
      let infoObj = { userId: user._id, role: user.role };
      let token = await generateToken(infoObj, secretKey, expiryIn);

      console.log("check", getTokenExpiryTime(token).toLocaleString());
      let data = {
        token: token,
        type: tokenTypes.ACCESS,
        expiration: getTokenExpiryTime(token).toLocaleString(),
      };

      let t = await tokenService.createTokenService({ data });
      // delete user?._doc?.password;
      // console.log(t.expiration.toLocaleString());

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

// export let loginAdminUser = tryCatchWrapper(async (req, res) => {
//   let email = req.body.email;
//   let password = req.body.password;

//   // let data = await loginAdminUserService(req.body.email, req.body.password);
//   //if email exist
//   //if password match
//   //token send
//   let user = await adminService.readSpecificAdminUserByAny({ email });
//   if (user === null) {
//     let error = new Error("Please enter valid email or password.");
//     error.statusCode = HttpStatus.UNAUTHORIZED;
//     throw error;
//   } else {
//     let isValidPassword = await comparePassword(password, user.password);
//     if (isValidPassword) {
//       let infoObj = { userId: user._id, role: user.role };

//       let token = await generateToken(infoObj, secretKey, expiryIn);

//       let data = {
//         token: token,
//       };
//       // await TokenData.create(data);
//       await adminService.createTokenService({ data });

//       successResponseData({
//         res,
//         message: "Login Successfully.",
//         statusCode: HttpStatus.OK,
//         data: token,
//       });
//     } else {
//       let error = new Error("Please enter valid email or password.");
//       error.statusCode = HttpStatus.UNAUTHORIZED;
//       throw error;
//     }
//   }
// });

export let logoutAdminUser = tryCatchWrapper(async (req, res) => {
  let id = req.token.tokenId;
  await tokenService.deleteSpecificTokenService({ id });

  successResponseData({
    res,
    message: "Logout Successfully.",
    statusCode: HttpStatus.OK,
  });
  // instead of 204 , 200 is better because we pass some data
});

//* we have two update one for profile and another update is by admin
export let updateAdminUser = (profile) =>
  tryCatchWrapper(async (req, res) => {
    let body = { ...req.body };
    delete body.password;
    delete body.email;

    if (req.info.role === "admin" && body.role === "superAdmin") {
      throwError({
        message: "Admin is not authorized to change role to super admin",
        statusCode: 401,
      });
    }

    let id = profile === "myProfile" ? req.info.userId : req.params.id;
    let data = await adminService.updateSpecificAdminUserService({ id, body });

    successResponseData({
      res,
      message: "User updated successfully.",
      statusCode: HttpStatus.CREATED,
      data,
    });
  });

export let updateAdminPassword = tryCatchWrapper(async (req, res) => {
  //don't allow to updated if previous and present password are same(it is said to be good practice)
  let id = req.info.userId;
  let oldPassword = req.body.oldPassword;
  let password = req.body.password;
  // let data = await updateAdminPasswordService(req.info.userId);

  let user = await adminService.readSpecificAdminUserService({ id });

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
  // let result = await Admin.findByIdAndUpdate(userId, data, { new: true });
  let data = await adminService.updateSpecificAdminUserService({ id, body });
  delete data._doc.password;
  //removing token after update
  await adminService.deleteSpecificTokenService({ id: req.token.tokenId });
  // return result;

  successResponseData({
    res,
    message: "User password updated successfully.",
    statusCode: HttpStatus.CREATED,
    data,
  });
});

export let adminMyProfile = tryCatchWrapper(async (req, res) => {
  let id = req.info.userId;
  let data = await adminService.readSpecificAdminUserService({ id });
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
export let forgotAdminPassword = tryCatchWrapper(async (req, res) => {
  let email = req.body.email;
  let user = await adminService.readSpecificAdminUserByAny({ email });

  if (!user) {
    throwError({
      message: "User does'not exist.",
      statusCode: HttpStatus.UNAUTHORIZED,
    });
  }
  let infoObj = { userId: user._id, role: user.role };

  let token = await generateToken(infoObj, secretKey, reset_expiry_in);
  let data = {
    token: token,
    type: tokenTypes.RESET_PASSWORD,
  };
  await adminService.createTokenService({ data });

  let href = `${baseUrl}/admin/reset-password?token=${token}`;
  await sendMail({
    from: '"Nitan Thapa" <nitanthapa425@gmail.com>',
    to: [email],
    subject: "Reset Password",
    html: `<div>
      <h1>To reset password click on the given link  <h1>
      <a href="${href}">Click To Reset</a>
      </div>`,
  });

  successResponseData({
    res,
    message: "Email sent successfully.",
    statusCode: HttpStatus.OK,
    data: href,
  });
});

export let resetAdminPassword = tryCatchWrapper(async (req, res) => {
  let id = req.info.userId;
  let password = req.body.password;
  let user = await adminService.readSpecificAdminUserService({ id });

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
  await adminService.updateSpecificAdminUserService({ id, body });
  await adminService.deleteSpecificTokenService({ id: req.token.tokenId });

  successResponseData({
    res,
    message: "Password reset successfully.",
    statusCode: HttpStatus.OK,
  });
});

// export let deleteAdminUser = tryCatchWrapper(async (req, res) => {
//   let id = req.params.id;
//   // let userId = req.info.userId;
//   let data = await adminService.deleteSpecificAdminUserService({ id });
//   delete data?._doc?.password;
//   successResponseData({
//     res,
//     message: "Delete profile successfully.",
//     statusCode: HttpStatus.OK,
//     data,
//   });
// });

export let readAllAdminUser = tryCatchWrapper(async (req, res, next) => {
  let find = {};

  if (req.query.email) {
    find.email = { $regex: req.query.email, $options: "i" };
  }

  if (req.query.firstName) {
    find.firstName = req.query.firstName;
  }

  req.find = find;
  req.service = adminService.readAllAdminService;
  req.myOwnSelect = "-password";
  next();
});

export let readSpecificAdminUser = tryCatchWrapper(async (req, res) => {
  let id = req.params.id;
  let data = await adminService.readSpecificAdminUserService({ id });
  delete data._doc.password;
  successResponseData({
    res,
    message: "Read user successfully.",
    statusCode: HttpStatus.OK,
    data,
  });
});

// only superAdmin can delete other admin and superAdmin
export let deleteSpecificAdminUser = tryCatchWrapper(async (req, res) => {
  let id = req.params.id;

  if (id === req.info.userId) {
    throwError({
      message: "Previous and Current password are same.",
      statusCode: HttpStatus.UNAUTHORIZED,
    });
  }

  let data = await adminService.deleteSpecificAdminUserService({ id });
  delete data?._doc?.password;
  successResponseData({
    res,
    message: "Admin deleted successfully.",
    statusCode: HttpStatus.OK,
    data,
  });
});
