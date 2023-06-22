import { Schema } from "mongoose";
import { genderEnum, roleEnum } from "../../constant/constant.js";

let authSchema = Schema(
  {
    firstName: {
      type: String,
      trim: true,
    },
    middleName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      trim: true,
    },

    gender: {
      type: String,
      trim: true,
      enum: {
        values: genderEnum,
        message: (enumValue) => {
          return `${enumValue.value} is not valid enum`;
        },
      },
    },

    phoneNumber: {
      type: Number,
      trim: true,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      unique: true,
    },
    role: {
      type: String,
      required: [true, "Please enter your role"],
      trim: true,
      enum: {
        values: roleEnum,
        message: (enumValue) => {
          return `${enumValue.value} is not valid enum`;
        },
      },
    },
    isVerified: {
      type: Boolean,
      default: false,
    },

    profile: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

export default authSchema;
