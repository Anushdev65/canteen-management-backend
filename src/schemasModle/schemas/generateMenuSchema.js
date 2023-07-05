import { Schema } from "mongoose";

let generateMenuSchema = Schema(
  {
    foodItem: {
      type: Schema.Types.ObjectId,
      ref: "Food",
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

export default generateMenuSchema;
