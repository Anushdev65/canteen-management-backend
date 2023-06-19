// to send email form server first you have to =>allow less secure app on
//to enable less secure app
//use 2-step verification and generate app password
//insted of using your password use app password of google
//for this go to the => manage your account => security setting and=>enable 2-step verifiction =>crete app pssword (select other option)
import nodemailer from "nodemailer";
import { emailHost, fromEmail, fromPassword } from "../config/config.js";
// the main thing in this file is trasporterInfo and mailInfo
//neglet other part
// export const fromEmail = process.env.FROM_EMAIL;
// export const fromPassword = process.env.FROM_PASSWORD;
// export const emailHost = process.env.EMAIL_HOST;
// export const emailPort = process.env.EMAIL_PORT;
// export const emailSecure = process.env.EMAIL_SECURE;
//transporterInof gives form info while mailInof gives to info
let transporterInfo = {
  // host: emailHost,
  host: emailHost,
  // if from is gmail use gmail smtp
  port: 587,
  secure: false,
  //   auth user and pass play the role from
  auth: {
    // note user and pass most be genuine
    //it is the email through which email is send
    user: fromEmail,
    pass: fromPassword,
    //insted of using your password use app password of google
    //for this go to the => manage your account => security setting and=>enable 2-step verifiction =>crete app pssword (select other option)
  },
};

export let sendMail = async (mailInfo) => {
  console.log(transporterInfo);
  // let mailInfo =
  // {
  //   from:'"Fred Foo" <nitanthapa425@gmail.com>'
  //   to: ["nitanthapa123@gmail.com", "sandeshbca5@arunima.edu.np"],
  //   subject: "this is subject",
  //   html: "<h1>Hello World<h1>",
  // };
  // note from : is only  use to show the from information (ie not used to point the sender email sender email is point to the auth part)
  //it is good to put nitanthapa425@gmail.com
  try {
    let transporter = nodemailer.createTransport(transporterInfo); //transporter gives from information
    let info = await transporter.sendMail(mailInfo); //it gives to aaa
    // console.log(info.messageId);
  } catch (error) {
    console.log("error has occurred", error.message);
  }
};
//to sendMail just call
// try {
//   await sendMail({
//     from: '"Fred Foo" <nitanthapa425@gmail.com>',
//     to: ["nitanthapa123@gmail.com", "sandeshbca5@arunima.edu.np"],
//     subject: "this is subject",
//     html: `<h1>Hello World<h1>`,
//   });
//   console.log("email is sent successfully");
// } catch (error) {}

// error has occurred Invalid login: 535-5.7.8 Username and Password not accepted. Learn more at
// 535 5.7.8  https://support.google.com/mail/?p=BadCredentials p19-20020a170902b09300b001992e74d058sm1049599plr.7 - gsmtp
//this error means username or password is not valid
