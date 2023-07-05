import { config } from "dotenv";
config();
export const dbUrl = process.env.DB_URL || "mongodb://0.0.0.0:27017/DB_URL";
export const port = process.env.PORT;

export const staticFolder = "./public";
export const apiVersion = process.env.API_VERSION || "/api/v1";
export const secretKey = process.env.SECRET_KEY || "project1";
export const expiryIn = process.env.EXPIRY_IN || "365d";
export const verifyEmailExpiryIn = process.env.VERIFY_EMAIL_EXPIRY_IN || "1d";
export const clientBaseUrl =
  process.env.CLIENT_BASE_URL || "http://localhost:3000";

export const fromEmail = process.env.FROM_EMAIL;
export const fromPassword = process.env.FROM_PASSWORD;
export const emailHost = process.env.EMAIL_HOST;
export const reset_expiry_in = process.env.RESET_EXPIRE_IN;
export const tokenTypes = {
  ACCESS: "access",
  RESET_PASSWORD: "resetPassword",
  VERIFY_EMAIL: "verifyEmail",
};

export const emailName = process.env.EMAIL_NAME;
