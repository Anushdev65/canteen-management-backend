import { baseUrl, emailName, fromEmail } from "../config/config.js";
import { sendMail } from "../utils/sendMail.js";

export const sendEmailToVerify = async ({
  email,
  token,
  firstName,
  lastName,
}) => {
  let link = `${baseUrl}/confirm-email?token=${token}`;
  const html = `
    <div style="background: lightgray; padding: 20px; margin: 30px;">
      <div style="background: #fff; padding: 20px">
        <br><br> 
        Dear ${firstName} ${lastName}, <br>
        To verify your email, please click on below button: <br>
        <div style="text-align:center; margin-top: 15px;">
          <a style="background-color: #FFC43E; padding: 10px; border-radius: 10px; color: black; font-weight: bold; text-decoration: none;" href=${link}>Verify Email</a>
        </div>
        <br> <br>
        if above button does not works, click on below link: <br> <a href=${link}>${link}</a>
      </div>
  
    </div>
  `;

  await sendMail({
    from: `"${emailName}" <${fromEmail}>`,
    to: [email],
    subject: "Email verification",
    html,
  });
};

export const sendEmailToForgotPassword = async ({
  email,
  token,
  firstName,
  lastName,
}) => {
  let link = `${baseUrl}/auth/reset-password?token=${token}`;
  const html = `
  <div style="background: lightgray; padding: 20px; margin: 30px;">
    <div style="background: #fff; padding: 20px">
      <br><br> 
      Dear ${firstName} ${lastName}, <br>
      To reset your password, please click on below button: <br>
      <div style="text-align:center; margin-top: 15px;">
        <a style="background-color: #FFC43E; padding: 10px; border-radius: 10px; color: black; font-weight: bold; text-decoration: none;" href=${link}>Reset Password</a>
      </div>
      <br> <br>
      if above button does not works, click on below link: <br> <a href=${link}>${link}</a>
    </div>

  </div>
`;

  await sendMail({
    from: `"${emailName}" <${fromEmail}>`,
    to: [email],
    subject: "Forgot Password",
    html,
  });
};
