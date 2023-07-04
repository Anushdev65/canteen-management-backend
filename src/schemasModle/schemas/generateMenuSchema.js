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
    rate: {
      type: Number,
      trim: true,
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
