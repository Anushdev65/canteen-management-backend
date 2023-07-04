import { Schema } from "mongoose";

let foodSchema = Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: true,
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
    description: {
      type: String,
      trim: true,
    },


  },
  { timestamps: true }
);

export default foodSchema;
