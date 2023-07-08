import { Schema } from "mongoose";

const orderFoodSchema = Schema(
  {
    foodName: {
      type: Schema.Types.Object,
      ref: "Food",
    },
    foodImage: {
      type: String,
      ref: "Food",
    },
    availableTime: {
      from: {
        type: Date,
        ref: "Food",
      },
      to: {
        type: Date,
        ref: "Food",
      },
    },
    rate: {
      type: Number,
      ref: "Food",
    },
    discountedRate: {
      type: Number,
      ref: "Food",
    },
    initialQuantity: {
      type: Number,
      ref: "Food",
    },
    availableQuantity: {
      type: Number,
      ref: "Food",
    },
    quantity: {
      type: Number,
    },
    price: {
      type: Number,
    },
  },
  { timestamps: true }
);

export default orderFoodSchema;
