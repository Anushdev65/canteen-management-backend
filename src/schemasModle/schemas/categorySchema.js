import { Schema } from "mongoose";

let categorySchema = Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: true,
      lowercase: true,
    },
  },
  { timestamps: true }
);

export default categorySchema;