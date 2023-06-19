import { Schema } from "mongoose";
import { genderEnum, roleEnum } from "../../constant/constant.js";

let adminRegisterSchema = Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please enter your firstName"],
      trim: true,
    },
    middleName: {
      type: String,
      required: false,
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Please enter your last"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Please enter your last"],
      trim: true,
    },
    dob: {
      type: Date,
      required: false,
      trim: true,
    },
    gender: {
      type: String,
      required: false,
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
      required: false,
      trim: true,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      unique: true,
      required: [true, "Please enter your email"],
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
    isMarried: {
      type: Boolean,
      required: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default adminRegisterSchema;
