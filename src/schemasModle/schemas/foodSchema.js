import mongoose, { Schema } from "mongoose";

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
    tags:[
      {
        type:String,
      }
    ],
    foodImage: {
      type: String,
      trim: true,
    },
    
    isInMenu: {
      type: Boolean,
      default: false,
    },

    availableTime: {
      from: {
        type: String,
      },
      to: {
        type: String,
      },
    },

    initialQuantity: {
      type: Number,
      trim: true,
    },

    availableQuantity: {
      type: Number,
      trim: true,
    },
  },

  { timestamps: true }
);

export default foodSchema;
