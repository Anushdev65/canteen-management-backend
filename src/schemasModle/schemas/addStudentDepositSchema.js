import mongoose, { Schema } from "mongoose";

let addStudentDepositSchema = Schema(
  {
    userId: {
      type: Schema.ObjectId,
      ref: "Auth",
    },
    amount: {
      type: Number,
      trim: true,
    },

    voucherNo: {
      type: Number,
      trim: true,
    },
  },

  { timestamps: true }
);

export default addStudentDepositSchema;
