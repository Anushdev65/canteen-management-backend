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
    category: {
      type: Schema.ObjectId,
      ref: "Category",
      required: [true, "categoryId is required"],
    },
    description: {
      type: String,
      trim: true,
    },
    tags: {
      type: String,
      trim: true,
    },
    foodImage: {
      type: String,
      trim: true,
    },
    menu: {
      type: Schema.ObjectId,
      ref: "GenerateMenu",
    },
    isInMenu: {
      type: Boolean,
      default: false,
    },
  },

  { timestamps: true }
);

export default foodSchema;
