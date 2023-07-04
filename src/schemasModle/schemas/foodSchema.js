import mongoose, { Schema } from "mongoose";
import { tagsEnum } from "../../constant/constant.js";

let foodSchema = Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: true,
      lowercase: true,
    },
    rate: {
      type: Number,
      trim: true,
    },
    discountedRate: {
      type: Number,
      trim: true,
    },
    categoryId: {
        type: Schema.ObjectId,
        ref: "Category",
        required: [true, "categoryId is required"],
      },
description:{
  type: String,
  trim:true, 
},
tags:{
  type: String,
  trim: true,
   enum: {
    values: tagsEnum,
    message: (enumValue) => {
      return `${enumValue.value} is not valid enum`;
    },
  },
}},

  { timestamps: true }
);


export default foodSchema;
