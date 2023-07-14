import { Schema } from "mongoose";

const processOrderSchema = Schema(
  {
    item: {
      type: String,
      required: true,
    },
    rate: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    orderedTime: {
      type: Date,
      required: true,
    },
    maxServeTime: {
      type: Date,
      required: true,
    },
    cancel: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default processOrderSchema;
