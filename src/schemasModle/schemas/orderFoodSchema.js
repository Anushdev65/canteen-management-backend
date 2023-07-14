import { statusEnum } from "../../constant/constant.js";
import { Schema } from "mongoose";

const orderFoodSchema = Schema(
  {
    food: {
      type: Schema.Types.ObjectId,
      ref: "Food",
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: "Auth",
    },

    orderStatus: {
      type: String,
      trim: true,
      default: statusEnum.ONPROCESS,
    },

    quantity: {
      type: Number,
    },
  },
  { timestamps: true }
);

export default orderFoodSchema;
