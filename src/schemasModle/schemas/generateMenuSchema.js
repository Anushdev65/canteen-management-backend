import { Schema } from "mongoose";

let generateMenuSchema = Schema(
  {
    foodItem: {
      type: Schema.Types.ObjectId,
      ref: "Food",
    },

    availableTime: {
      from: {
        type: Date,
      },
      to: {
        type: Date,
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
    // givenTime:{type: Date}
  },
  { timestamps: true }
);

export default generateMenuSchema;
